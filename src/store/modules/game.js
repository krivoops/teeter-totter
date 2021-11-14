import { setupItem } from './helpers/setupItem';

function install_game(store, name, configuration) {
  const context = {
    configuration: store.state[configuration],
    commit: (mutationName, payload) => store.commit(`${name}/${mutationName}`, payload)
  };

  // console.log(context.configuration)
  const emptyLeftMatrix = [];
  const emptyRightMatrix = [];
  for (let i = 0; i < context.configuration.hitboxes_count; i++) {
    emptyLeftMatrix.push([]);
    emptyRightMatrix.push([]);
  }

  store.registerModule(name, {
    namespaced: true,

    state: () => ({
      name,
      configuration,
      current_item: null,
      items: {},
      turn: false,
      left_items: emptyLeftMatrix,
      right_items: emptyRightMatrix,
      pause: false,
      plank_angle: 0,
    }),

    mutations: {
      play(state) {
        state.pause = false;
      },

      pause(state) {
        state.pause = true;
      },

      set_current_item(state, payload) {
        if (payload) {
          payload.id = Object.keys(state.items).length;
          state.current_item = payload.id;
          state.items[payload.id] = payload;
        } else {
          state.current_item = null;
        }
      },

      move_left(state) {
        // const current = state.items[state.current_item];
        if (state.items[state.current_item].x === 0|| state.pause || state.current_item === null) {
          return;
        }
        state.items[state.current_item].x -= 1;
      },

      move_right(state) {
        if (state.items[state.current_item].x === context.configuration.hitboxes_count - 1 || state.pause || state.current_item === null) {
          return;
        }
        state.items[state.current_item].x += 1;
      },

      move_down(state) {
        if (state.pause || state.current_item === null) {
          return
        }

        state.items[state.current_item].y -= 50;
      },

      time_tick(state, multiplier = 1) {
        state.items[state.current_item].y -= multiplier;
      },

      change_angle(state, value) {
        state.plank_angle += value;

        if (Math.abs(state.plank_angle) > context.configuration.max_bending) {
          context.gameOver();

          alert('Game over');
        }
      }
    },

    getters: {
      current_item_full(state) {
        return state.items[state.current_item];
      }
    }
  })

  context.state = store.state[name];

  const boundedTick = tick.bind(context)

  return {
    start(tickTime = 1000) {
      boundedTick();

      return play.call(context, tickTime / 24, () => {
        context.commit('time_tick', Object.keys(context.state.items).length / 5)
      })
    },

    hit(order) {
      const item = context.state.items[context.state.current_item];
      if (!item) {
        throw 'Unexpected. Hit is wrong'
      }

      // if side = false === to the right
      context.state[`${item.side ? 'left' : 'right'}_items`][order - 1].push(item.id);
      context.commit('set_current_item', false);

      setTimeout(() => {
        boundedTick();
      }, 200)
    },

    left() {
      context.commit('move_left')
    },

    right() {
      context.commit('move_right')
    },

    down() {
      context.commit('move_down')
    },

    change_angle(value) {
      context.commit('change_angle', value)
    },
  }
}

function tick() {
  if (this.state.current_item === null) {
    this.commit('set_current_item', setupItem.call(this, this.state.turn));
    this.state.turn = !this.state.turn;
  }
}

function play(tickTime, playLogic) {
  const evtGame = new Event("check_collide", {"bubbles":true, "cancelable":false});
  const evtBalancer = new Event("check_balancer", {"bubbles":true, "cancelable":false});
  this.commit('play');

  const gameInterval = setInterval(() => {
    if (this.state.current_item !== null) {
      playLogic();
      document.dispatchEvent(evtGame);
    }
  }, tickTime)

  const balancerInterval = setInterval(() => {
    document.dispatchEvent(evtBalancer);
  }, 100)

  this.gameOver = () => {
    this.commit('pause');
    clearInterval(gameInterval);
    clearInterval(balancerInterval);
    return false;
  }
  return this.gameOver
}

export {
  install_game
}
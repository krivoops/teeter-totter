<template>
  <div class="content flex flex-col items-center justify-evenly h-screen p-2 pt-10">
    <div class="flex flex-col items-center m-2 mt-10 mb-10 text-center">
      <span class="text-3xl">Teeter Totter</span>
      <span class="text-xs">© 2021. MIT Licence</span>
    </div>

    <div class="flex flex-1 flex-col items-center m-2 mt-6 mb-6 w-full relative">
      <start-screen @start="onStart" v-if="isStartScreen"/>
      <template v-else>
        <game-screen
          :game-ref="gameName"
          @hit="handleHit"
          @angle="handleAngle"
        />
      </template>
    </div>

    <div v-if="!isStartScreen" class="flex items-center m-2 mt-10 mb-10 text-center">
      <button @click="left" :disabled="isPause" class="button">Left</button>
      <button @click="down" :disabled="isPause" class="button">Down</button>
      <button @click="right" :disabled="isPause" class="button">Right</button>
      <button @click="toggle" class="button">{{ isPause ? 'Play' : 'Pause'}}</button>
    </div>

    <div v-if="isStartScreen" class="flex flex-col items-center m-2 mt-10 mb-10 text-center">
      <div>No real physics</div>
      <div>App is working in some imaginary math and physics rules that are configurable</div>
      <div>Canvas and RxJs feature is ignored. App is fully working on state managment with Vue+Vuex</div>
    </div>

    <div class="flex flex-col items-center m-2 mt-10 mb-10 text-center">
      <a href="https://github.com/krivoops/teeter-totter" target="_blank">GitHub</a>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import StartScreen from './views/StartScreen.vue';
import GameScreen from './views/GameScreen.vue';

import { install_configuration } from './store/modules/configuration';
import { install_game } from './store/modules/game';

const GAME_ID = 'game' // space for possible multitabs

export default {
  name: 'App',
  components: {
    StartScreen,
    GameScreen,
  },

  setup() {
    const gameName = 'btt';
    const store = useStore();

    let game = {};
    install_configuration(store, gameName);

    const isStartScreen = computed(() => store.state.view === 'start');
    const isPause = computed(() => store.state.game && store.state.game.pause);

    function onStart() {
      store.commit('change_view', GAME_ID);

      const controlls = install_game(store, GAME_ID, gameName);

      game = {
        ...controlls,
      }

      game.pause = controlls.start();
    }

    function handleHit(event) {
      game.hit(event);
    }

    function handleAngle(event) {
      if (event) {
        game.change_angle(event);
      }
    }

    function left() {
      game.left();
    }

    function right() {
      game.right();
    }

    function down() {
      game.down();
    }

    function toggle() {
      if (game.pause) {
        game.pause = game.pause();
      } else {
        game.pause = game.start();
      }
    }

    document.addEventListener('keydown', function(event) {
      const key = event.keyCode
      switch(+key) {
        case 40:
          down();
          break;
        case 37:
          left();
          break;
        case 39:
          right();
          break;
      }
    });

    return {
      onStart,
      handleHit,
      handleAngle,

      left,
      right,
      down,
      toggle,

      isStartScreen,
      isPause,
      gameName,
    }
  },
}
</script>

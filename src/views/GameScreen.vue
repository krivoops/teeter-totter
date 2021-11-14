<template>
    <Balancer
        :left="left_items"
        :right="right_items"
        :bending-limit="maxBending"
        :kgm-limit="maxBending"
        :dictionary="all_items"

        @angle="$emit('angle', $event)"
    >
        <template v-slot:objects>
            <item v-if="current_item" id="object" :hitboxes-count="hitboxesCount" :item-value="current_item"></item>
        </template>
        <Plank
            :style="{'transform': `rotate(${plankAngle}deg)`}"
            :width="plankWidth"
        >
            <template v-slot:player1>
                <hitbox
                        @hit="$emit('hit', $event)"
                        :key="hitbox"
                        :order="hitbox"
                        :items="left_items[hitbox - 1]"
                        :dictionary="all_items"
                        :hitboxesCount="hitboxesCount"
                        v-for="hitbox in hitboxesCount"
                />
            </template>
            <template v-slot:player2>
                <hitbox
                        @hit="$emit('hit', $event)"
                        :key="hitbox"
                        :order="hitbox"
                        :items="right_items[hitbox - 1]"
                        :dictionary="all_items"
                        :hitboxesCount="hitboxesCount"
                        v-for="hitbox in hitboxesCount"
                />
            </template>
        </Plank>
        <Stump
            :height="stumpHeight"
        />
    </Balancer>
</template>

<script>
  import { useStore } from 'vuex';
  import { ref, computed } from 'vue';

  import Stump from '../components/Stump';
  import Plank from '../components/Plank';
  import Hitbox from '../components/HitBox';
  import Balancer from '../components/Balancer';
  import Item from '../components/Item';

  export default {
    name: 'gameScreen',
    components: {
      Hitbox,
      Stump,
      Plank,
      Balancer,
      Item,
    },

    props: {
      gameRef: String,
    },

    emits: ['hit', 'angle'],

    setup(props) {
      const store = useStore();
      const configuration = store.state[props.gameRef];
      const game = store.state.game;
      // const game = store.state[props.gameRef];

      if (!configuration) {
        throw 'Missing config for game'
      }

      const plankWidth = ref(configuration.plank_width * 10);
      const stumpHeight = ref(configuration.stump_height);
      const maxBending = ref(configuration.max_bending);
      const kgmLimit = ref(configuration.kgm_side_limit);

      const hitboxesCount = ref(configuration.hitboxes_count);

      const current_item = computed(() => store.getters[`game/current_item_full`]);
      const left_items = computed(() => game.left_items);
      const right_items = computed(() => game.right_items);
      const all_items = computed(() => game.items);
      const plankAngle = computed(() => game.plank_angle);

      return {
        plankWidth,
        stumpHeight,
        maxBending,
        kgmLimit,

        hitboxesCount,

        plankAngle,

        current_item,
        left_items,
        right_items,
        all_items,
      }
    },



    methods: {
      changeAngle(value) {
        this.plankAngle += value
      }
    }
  };
</script>

<style scoped>

</style>
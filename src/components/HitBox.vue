<template>
    <div ref="hitbox" class="hitbox">
        <div class="items">
            <item
                ref="item"
                :key="item"
                v-for="item in items"
                :hitboxesCount="hitboxesCount"
                :stable="true"
                :item-value="dictionary[item]"
            />
        </div>
    </div>
</template>

<script>
  import Item from './Item.vue';

  import { isCollide } from '../utils/collide';

  export default {
    name: 'HitBox',
    props: {
      order: Number,
      items: Array,
      dictionary: Object,
      hitboxesCount: Number,
    },

    components: {
      Item,
    },

    emits: ['hit'],

    mounted() {
      document.addEventListener('check_collide', () => {
        const object = document.getElementById('object');
        const hitbox = this.$refs.hitbox;

        if (this.$refs.item ? isCollide(object, this.$refs.item.$el) : isCollide(object, hitbox)) {
          this.$emit('hit', this.order);
          return
        }

        if (isCollide(object, hitbox)) {
          this.$emit('hit', this.order);
        }
      });
    },

    computed: {
      itemReversed() {
        const newArray = this.items.slice();
        return newArray.reverse();
      }
    }
  };
</script>

<style scoped>

</style>
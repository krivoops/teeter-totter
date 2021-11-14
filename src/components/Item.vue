<template>
    <div ref="item" class="object"
         :style="{
      'width': `${widthAndHeight}px`,
      'height': `${widthAndHeight}px`,
      'left': `${step * itemValue.x + sideOffset}px`,
      'top': `${-itemValue.y}px`,
    }">
        <div class="inside" :class="{[itemValue.type]: true}" :style="{
          'background-color': itemValue.color,
        }"></div>
    </div>
</template>

<script>
  export default {
    name: 'Item',
    props: {
      itemValue: Object,
      hitboxesCount: Number,
      stable: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        step: 0,
      }
    },
    mounted() {
      this.step = this.$refs.item.parentNode.offsetWidth / (this.hitboxesCount * 2)

      // 'background-color': itemValue.color,
      //   'width': `${stable? this.step * itemValue.weight  : this.step * (itemValue.weight / 10) - 5}px`,
    },
    computed: {
      sideOffset() {
        return (this.itemValue.side ? 5 : this.step * this.hitboxesCount + 5) + (this.step / (this.hitboxesCount * 2) * (10 - this.itemValue.weight) / 2 - 4);
      },
      stableSwitcher() {
        return this.stable ? 1 : this.hitboxesCount * 2;
      },
      widthAndHeight() {
        return (this.step / this.stableSwitcher) * this.itemValue.weight
      }
    }
  };
</script>

<style scoped>

</style>
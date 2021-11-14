<template>
    <div ref="plank" class="plank" :style="{width: `${width}%`}">
        <div ref="playground1" class="playground">
            <slot name="player1"></slot>
        </div>
        <div ref="playground2" class="playground">
            <slot name="player2"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Plank',
    props: {
      width: Number,
    },

    data() {
      return {
        height: 0,
      }
    },

    mounted() {
      this.height = this.$refs.plank.parentElement.clientHeight - this.stumpHeight
    }
  };
</script>

<style scoped>

</style>
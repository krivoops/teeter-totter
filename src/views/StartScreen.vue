<template>
    <button class="button s-button" @click="start">
        Start
    </button>
</template>

<script>
  export default {
    name: 'startScreen',

    emits: ['start'],

    setup(props, ctx) {
      function start() {
        ctx.emit('start');
      }

      return {
        start,
      };
    },
  };
</script>
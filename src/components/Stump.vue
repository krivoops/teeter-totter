<template>
    <div class="stump" :style="{height: `${height}px`}">
        <slot name="plank"></slot>
    </div>
</template>

<script>
  export default {
    name: 'Stump',
    props: {
      height: Number
    },
  };
</script>

<style scoped>

</style>
<template>
    <div class="objects">
        <slot name="objects"></slot>
    </div>
    <div class="teeter-totter">
        <slot></slot>
    </div>
    <div class="ground">
        <slot name="ground"></slot>
    </div>
</template>

<script>
  function countScore(allItems, matrix, reverse) {
    let countableMatrix = matrix.slice();
    if (reverse) {
      countableMatrix.reverse();
    }

    let score = 0;
    countableMatrix.forEach((itemsQueue, scoreIndex) => {
      const scoreMultiply = scoreIndex + 1;
      itemsQueue.forEach((itemId) => {
          const weight = allItems[itemId].weight;
          score += weight * scoreMultiply;
      });
    });

    return score;
  }

  export default {
    name: 'Balancer',
    props: {
      left: Object,
      right: Object,
      bendingLimit: Number,
      kgmLimit: Number,
      dictionary: Object,
    },

    emits: ['angle'],

    mounted() {
      document.addEventListener('check_balancer', () => {
        const leftScore = countScore(this.dictionary, this.left, true);
        const rightScore = countScore(this.dictionary, this.right, false);

        const angleChange = (rightScore - leftScore) / 100;

        this.$emit('angle', angleChange);
      });
    },
  };
</script>

<style scoped>

</style>
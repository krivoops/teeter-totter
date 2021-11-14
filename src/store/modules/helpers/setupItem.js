function setupItem(side) {
  let randomWeight = Math.round(Math.random() * this.configuration.max_object_weight);
  if (randomWeight < this.configuration.min_object_weight) {
    randomWeight = this.configuration.min_object_weight
  }
  const type = this.configuration.object_types[Math.round(Math.random() * 2)];

  const weightCoef = (((100 / this.configuration.max_object_weight) * randomWeight) / 100)
  const redCoef = weightCoef > 0.75 ? 0 : 255 * weightCoef;
  const greenCoef = weightCoef < 0.35 ? 0 : 255 * weightCoef;

  const color = `rgb(${redCoef},${greenCoef},0)`;
  return {
    side,
    weight: randomWeight,
    type,
    color,
    x: Math.round(Math.random() * 5),
    y: 0,
  }
}

export {
  setupItem,
}
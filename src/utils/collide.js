function isCollide(el1, el2) {
  var rect1 = el1.getBoundingClientRect();
  var rect2 = el2.getBoundingClientRect();

  return !(
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right
  );
}

export {
  isCollide,
}
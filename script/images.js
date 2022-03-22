function createImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

const images = {
  platform: createImage("./assets/platform.png"),
  ground: createImage("./assets/ground.png"),
  littleHill: createImage("./assets/littleHill.png"),
  highHill: createImage("./assets/highHill.png"),
};

export default images;

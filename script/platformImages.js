import { images } from "./images.js";

function createImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

export const platformImages = {
  platform: createImage(images.platform),
  ground: createImage(images.ground),
  littleHill: createImage(images.smallHill),
  highHill: createImage(images.highHill),
  groundSection01: createImage(images.ground_section01),
  groundSection02: createImage(images.ground_section02),
};

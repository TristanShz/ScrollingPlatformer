export default class Background {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.imgSrc = [
      "./assets/l1_background.png",
      "./assets/l2_trees01.png",
      "./assets/l3_trees02.png",
      "./assets/l4_grass01.png",
      "./assets/l5_grass02.png",
      "./assets/l6_fog.png",
    ];
  }

  draw(ctx) {
    for (let i = 0; i < this.imgSrc.length; i++) {
      let img = new Image();
      img.src = this.imgSrc[i];
      ctx.drawImage(img, this.position.x, 0);
    }
  }
}

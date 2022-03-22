export default class Background {
  constructor(ctx) {
    this.bg_l1 = new Image();
    this.bg_l2 = new Image();
    this.bg_l3 = new Image();
    this.bg_l4 = new Image();
    this.bg_l5 = new Image();
    this.bg_l6 = new Image();

    this.imgSrc = [
      "./assets/l1_background.png",
      "./assets/l2_trees01.png",
      "./assets/l3_trees02.png",
      "./assets/l4_grass01.png",
      "./assets/l5_grass02.png",
      "./assets/l6_fog.png",
    ];
  }
}

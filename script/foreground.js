export default class Foreground {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.img = new Image();
    this.img.src = "./assets/foreground.png";
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.position.x, this.position.y);
  }
}

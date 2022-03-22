export default class Platform {
  constructor(x, y, width, height, img) {
    this.position = {
      x: x,
      y: y,
    };

    this.width = width;
    this.height = height;
    this.img = img;
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {}
}

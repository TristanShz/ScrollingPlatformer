export class Platform {
  constructor(x, y, width, height, img, colisionGap) {
    this.position = {
      x: x,
      y: y,
    };

    this.width = width;
    this.height = height;
    this.img = img;
    this.colisionGap = colisionGap;
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

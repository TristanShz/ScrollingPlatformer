export class Background {
  constructor(game) {
    this.game = game;
    this.position = {
      x: 0,
      y: 0,
    };
    this.img = new Image();
    this.img.src = "./assets/background.png";
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.img.width,
      this.game.gameHeight
    );
  }
}

export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.height = 50;

    this.position = {
      x: 0,
      y: this.game.gameHeight - this.height - 800,
    };
    this.speed = 10;
    this.gravity = 0.5;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.direction = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft() {
    this.velocity.x = -this.speed;
  }

  moveRight() {
    this.velocity.x = this.speed;
  }

  jump() {
    this.velocity.y += -10;
    console.log("Boump");
  }

  stop() {
    this.velocity.x = 0;
  }

  update() {
    this.position.y += this.velocity.y;
    this.velocity.y += this.gravity;

    this.position.x += this.velocity.x;
    if (this.position.y + this.height >= this.game.gameHeight) {
      this.position.y = this.game.gameHeight - this.height;
      this.velocity.y = 0;
    }
  }
}

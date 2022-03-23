import { detectCollision } from "/script/detectCollision.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 145;
    this.height = 196;

    this.position = {
      x: 110,
      y: this.game.gameHeight - this.height - 800,
    };
    this.speed = 5;
    this.gravity = 0.5;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.direction = 0;
    this.image = new Image();
    this.image.src = "./assets/spriteWalk.png";
    this.frame = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.drawImage(
      this.image,
      145 * this.frame,
      0,
      145,
      196,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  moveLeft() {
    this.velocity.x = -this.speed;
  }

  moveRight() {
    this.velocity.x = this.speed;
  }

  jump() {
    this.velocity.y += -18;
  }

  stop() {
    this.velocity.x = 0;
  }

  update() {
    if (this.frame >= 11) this.frame = 0;
    this.position.y += this.velocity.y;
    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;

    //If player is on the ground, stop decreasing velocity
    if (
      this.position.y + this.height + this.velocity.y >=
      this.game.gameHeight
    ) {
      this.position.y = this.game.gameHeight - this.height;
      this.velocity.y = 0;
    }

    this.game.platforms.forEach((element) => {
      if (detectCollision(this, element)) {
        this.velocity.y = 0;
      }
    });
    //Setting limit for the player movement and that's where the background start scrolling
    if (this.position.x + this.velocity.x > 400) {
      this.position.x = 400;
      this.game.platforms.forEach((element) => {
        element.position.x += -this.speed;
      });
      // this.game.background.position.x += -3;
    }
    if (this.position.x + this.velocity.x < 100) {
      this.position.x = 100;
      this.game.platforms.forEach((element) => {
        element.position.x += this.speed;
        // this.game.background.position.x += 3;
      });
    }
  }
}

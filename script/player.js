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
    this.direction = 1;
    this.spriteList = {
      walk: {
        src: "./assets/spriteWalk.png",
        cropSize: 145,
        spriteLength: 12,
        spriteWidth: 135,
        spriteHeight: 196,
      },
      reverseWalk: {
        src: "./assets/reverseWalk.png",
        cropSize: 145,
        spriteLength: 12,
        spriteWidth: 135,
        spriteHeight: 196,
      },
      idle: {
        src: "./assets/spriteIdle.png",
        cropSize: 145,
        spriteLength: 26,
        spriteWidth: 135,
        spriteHeight: 189,
      },
      reverseIdle: {
        src: "./assets/reverseIdle.png",
        cropSize: 145,
        spriteLength: 26,
        spriteWidth: 135,
        spriteHeight: 189,
      },
      jump: {
        src: "./assets/spriteJump.png",
        cropSize: 155,
        spriteLength: 7,
        spriteWidth: 145,
        spriteHeight: 195,
      },
      reverseJump: {
        src: "./assets/reverseJump.png",
        cropSize: 155,
        spriteLength: 7,
        spriteWidth: 145,
        spriteHeight: 195,
      },
    };
    this.sprite = new Image();
    this.frame = 0;
    this.currentSprite = this.spriteList.idle;
  }

  draw(ctx) {
    this.sprite.src = this.currentSprite.src;
    this.cropSize = this.currentSprite.cropSize;
    this.spriteLength = this.currentSprite.spriteLength;
    this.spriteWidth = this.currentSprite.spriteWidth;
    this.spriteHeight = this.currentSprite.spriteHeight;
    ctx.fillStyle = "red";
    ctx.drawImage(
      this.sprite,
      this.cropSize * this.frame,
      0,
      this.spriteWidth + 10,
      this.spriteHeight,
      this.position.x,
      this.position.y,
      this.spriteWidth,
      this.spriteHeight
    );
  }

  moveLeft() {
    this.velocity.x = -this.speed;
    this.direction = 2;
  }

  moveRight() {
    this.velocity.x = this.speed;
    this.direction = 1;
  }

  jump() {
    this.velocity.y += -18;
  }

  stop() {
    this.velocity.x = 0;
  }

  update() {
    //Reset frame for the sprite animation
    if (this.frame > this.spriteLength - 1) this.frame = 0;

    //update position
    this.position.y += this.velocity.y;
    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;

    //Changing Sprite depending on the player movement
    if (this.velocity.x > 0) this.currentSprite = this.spriteList.walk;
    if (this.velocity.x < 0) this.currentSprite = this.spriteList.reverseWalk;
    if (this.velocity.x === 0) this.currentSprite = this.spriteList.idle;
    if (this.velocity.x === 0 && this.direction === 2)
      this.currentSprite = this.spriteList.reverseIdle;
    if (this.velocity.y < 0) this.currentSprite = this.spriteList.jump;
    if (this.velocity.y < 0 && this.direction == 2)
      this.currentSprite = this.spriteList.reverseJump;

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
        element.position.x -= this.speed;
      });
      this.game.foreground.position.x -= this.speed - 2;
      this.game.background.position.x -= this.speed - 2;
    }
    if (this.position.x < 100 && this.game.background.position.x < 0) {
      this.position.x = 100;
      this.game.platforms.forEach((element) => {
        element.position.x += this.speed;
      });
      this.game.foreground.position.x += this.speed - 2;
      this.game.background.position.x += this.speed - 2;
    }

    if (this.position.x <= 0) {
      this.position.x = 0;
    }
  }
}

import { detectCollision } from "./detectCollision.js";
import { spriteList } from "./spriteList.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 135;
    this.height = 196;
    this.position = {
      x: 110,
      y: this.game.gameHeight - 800,
    };
    this.speed = 5;
    this.gravity = 0.5;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.direction = 1;
    this.spriteList = spriteList;
    this.sprite = new Image();
    this.frame = 0;
    this.currentSprite = this.spriteList.idle;

    this.isInJump = false;
    this.parachuteActivated = false;
  }

  draw(ctx) {
    this.sprite.src = this.currentSprite.src;
    this.cropSize = this.currentSprite.cropSize;
    this.spriteLength = this.currentSprite.spriteLength;
    this.spriteWidth = this.currentSprite.spriteWidth;
    this.spriteHeight = this.currentSprite.spriteHeight;

    ctx.drawImage(
      this.sprite,
      this.cropSize * this.frame,
      0,
      this.spriteWidth,
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
    this.velocity.y -= 18;
  }

  plane() {
    this.parachuteActivated = true;
    this.gravity = 0.1;
  }
  stop() {
    this.velocity.x = 0;
  }

  update() {
    //Reset frame for the sprite animation
    if (this.frame > this.spriteLength - 1) this.frame = 0;

    if (this.velocity.y !== 0) {
      this.isInJump = true;
    } else {
      this.isInJump = false;
    }
    //update position
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    this.velocity.y += this.gravity;

    //If player is on the ground or on a platform, stop decreasing velocity
    this.game.platforms.forEach((element) => {
      if (detectCollision(this, element)) {
        this.velocity.y = 0;
        this.gravity = 0.5;
        this.parachuteActivated = false;
      }
    });

    //Changing Sprite depending on the player movement

    //Player is not moving : Idle position
    if (this.velocity.x === 0 && this.velocity.y === 0 && this.direction === 1)
      this.currentSprite = this.spriteList.idle;
    if (this.velocity.x === 0 && this.velocity.y === 0 && this.direction === 2)
      this.currentSprite = this.spriteList.reverseIdle;

    //Player is in the air, parachute is not activated and direction is right : Jump position
    if (this.isInJump && !this.parachuteActivated && this.direction === 1) {
      this.currentSprite = this.spriteList.jump;
    }
    //Player is in the air, parachute is not activated and direction is left : Reverse jump position
    if (this.isInJump && !this.parachuteActivated && this.direction === 2) {
      this.currentSprite = this.spriteList.reverseJump;
    }
    //Player is moving right side : Walk position
    if (this.velocity.x > 0 && this.velocity.y === 0 && this.direction === 1) {
      this.currentSprite = this.spriteList.walk;
    }
    //Player is moving left side : Reverse walk position
    if (this.velocity.x < 0 && this.velocity.y === 0 && this.direction === 2) {
      this.currentSprite = this.spriteList.reverseWalk;
    }

    //Player is in the air, parachute is activated and direction is right : Parachute position
    if (this.isInJump && this.parachuteActivated && this.direction === 1) {
      this.currentSprite = this.spriteList.spriteParachute;
    }

    //Player is in the air, parachute is activated and direction is left : Reverse parachute position
    if (this.isInJump && this.parachuteActivated && this.direction === 2) {
      this.currentSprite = this.spriteList.reverseParachute;
    }
    //Setting limit for the player movement and that's where the background start scrolling
    if (this.position.x + this.velocity.x > 400) {
      this.position.x = 400;
      this.game.platforms.forEach((element) => {
        element.position.x -= this.speed;
      });
      this.game.foreground.position.x -= this.speed + 2;
      this.game.background.position.x -= this.speed - 2;
    }
    if (this.position.x < 100 && this.game.background.position.x < 0) {
      this.position.x = 100;
      this.game.platforms.forEach((element) => {
        element.position.x += this.speed;
      });
      this.game.foreground.position.x += this.speed + 2;
      this.game.background.position.x += this.speed - 2;
    }

    if (this.position.x <= 0) {
      this.position.x = 0;
    }
  }
}

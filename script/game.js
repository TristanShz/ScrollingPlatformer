import { Background } from "./background.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Platform } from "./platform.js";
import { images } from "./images.js";
import { Foreground } from "./foreground.js";

export class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.images = images;
  }

  start() {
    this.background = new Background(this);
    this.foreground = new Foreground(this);
    this.platforms = [
      new Platform(0, this.gameHeight - 150, 4000, 200, this.images.ground),
      new Platform(500, 550, 300, 150, this.images.platform),
      new Platform(900, 350, 300, 150, this.images.platform),
    ];
    this.player = new Player(this);
    this.gameObjects = [...this.platforms, this.player];

    new InputHandler(this);
  }
  draw(ctx) {
    this.background.draw(ctx);
    this.gameObjects.forEach((element) => element.draw(ctx));
    this.foreground.draw(ctx);
  }

  update() {
    this.gameObjects.forEach((element) => element.update());
  }
}

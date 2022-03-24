import { Background } from "./background.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Platform } from "./platform.js";
import { Foreground } from "./foreground.js";
import { platformImages } from "./platformImages.js";

export class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.platformImages = platformImages;
  }

  start() {
    this.background = new Background(this);
    this.foreground = new Foreground(this);
    this.platforms = [
      new Platform(
        -50,
        this.gameHeight - 200,
        1180,
        250,
        this.platformImages.groundSection02,
        90
      ),
      new Platform(1300, 600, 300, 133, this.platformImages.platform, 50),
      new Platform(1700, 400, 300, 133, this.platformImages.platform, 50),
      new Platform(
        2200,
        this.gameHeight - 200,
        2137,
        250,
        this.platformImages.groundSection01,
        80
      ),
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

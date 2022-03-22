import Background from "/script/background.js";
import Player from "/script/player.js";
import InputHandler from "/script/input.js";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start(ctx) {
    new Background(ctx);
    this.player = new Player(this);
    this.gameObjects = [this.player];

    new InputHandler(this);
  }
  draw(ctx) {
    this.gameObjects.forEach((element) => element.draw(ctx));
  }

  update() {
    this.gameObjects.forEach((element) => element.update());
  }
}

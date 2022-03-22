"user strict";

import Game from "/script/game.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = innerWidth;
const GAME_HEIGHT = innerHeight;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start(ctx);
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.draw(ctx);
  game.update();
  requestAnimationFrame(gameLoop);
}

gameLoop();

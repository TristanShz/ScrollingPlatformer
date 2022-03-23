"user strict";

import Game from "/script/game.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = innerWidth;
const GAME_HEIGHT = innerHeight;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const fps = 25;
const interval = 1000 / fps;
let lastTime = new Date().getTime();
let currentTime = 0;
let delta = 0;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();
function gameLoop() {
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(ctx);
  game.draw(ctx);

  currentTime = new Date().getTime();
  delta = currentTime - lastTime;
  if (delta > interval) {
    game.player.frame++;
  }

  lastTime = currentTime - (delta % interval);
}

gameLoop();

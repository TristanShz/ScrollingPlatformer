"user strict";

import { Game } from "./game.js";
import { images } from "./images.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = innerWidth;
const GAME_HEIGHT = innerHeight;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

// FPS System use for slowing the sprite animations
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

//Loading all images before executing gameLoop
function loadImages(images, onComplete) {
  let loaded = 0;

  function onLoad() {
    loaded++;
    if (loaded === images.length) {
      onComplete();
    }
  }

  for (const element in images) {
    let img = new Image();
    img.src = images[element];
    img.addEventListener("load", onLoad);
  }
}

loadImages(images, gameLoop());

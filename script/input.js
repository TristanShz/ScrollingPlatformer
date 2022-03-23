export class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        //LEFT key
        case 81:
          game.player.moveLeft();
          break;
        //RIGHT key
        case 68:
          game.player.moveRight();
          break;
        //ESPACE key
        case 32:
          console.log(game.player.velocity);
          if (game.player.velocity.y === 0) game.player.jump();
          if (game.player.isInJump) game.player.plane();
          break;
        //DOWN key
        case 40:
          break;
        //ENTER key
        case 13:
          break;
        //ESC key
        case 27:
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        //LEFT key
        case 81:
          if (game.player.velocity.x < 0) game.player.stop();
          break;
        //RIGHT key
        case 68:
          if (game.player.velocity.x > 0) game.player.stop();
          break;
        //UP key
        case 38:
          break;
        //DOWN key
        case 40:
          game.player.direction = 4;
          break;
      }
    });
  }
}

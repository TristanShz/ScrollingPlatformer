export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        //LEFT key
        case 37:
          game.player.moveLeft();
          break;
        //RIGHT key
        case 39:
          game.player.moveRight();
          break;
        //UP key
        case 38:
          if (game.player.position.y + game.player.height === game.gameHeight)
            game.player.jump();
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
        //ESPACE key
        case 32:
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        //LEFT key
        case 37:
          if (game.player.velocity.x < 0) game.player.stop();
          break;
        //RIGHT key
        case 39:
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

export function detectCollision(player, object) {
  const playerTop = player.position.y;
  const playerBottom = player.position.y + player.height;
  const playerLeft = player.position.x;
  const playerRight = player.position.x + player.width;

  const objectTop = object.position.y;
  const objectBottom = object.position.y + object.height;
  const objectLeft = object.position.x;
  const objectRight = object.position.x + object.width;

  //   if (
  //     playerLeft >= objectLeft &&
  //     playerLeft <= objectRight &&
  //     playerTop >= objectTop &&
  //     playerTop <= objectDown
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  if (
    playerBottom <= objectTop + 50 &&
    playerBottom + player.velocity.y >= objectTop + 50 &&
    playerRight >= objectLeft &&
    playerLeft <= objectRight
  ) {
    return true;
  } else {
    return false;
  }
}

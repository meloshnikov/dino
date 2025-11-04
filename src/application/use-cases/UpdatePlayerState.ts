import { Player } from '../../domain/models/Player';
import { World } from '../../domain/models/World';

// Применяет гравитацию и проверяет столкновение с землей
export const updatePlayerState = (player: Player, world: World) => {
  player.velocity.y += player.gravity;
  player.position.y += player.velocity.y;

  if (player.position.y >= world.groundLevel - player.size.height) {
    player.position.y = world.groundLevel - player.size.height;
    player.velocity.y = 0;
    player.isJumping = false;
  }
};

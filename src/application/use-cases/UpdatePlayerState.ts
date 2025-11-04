import { Player } from '../../domain/models/Player';
import { World } from '../../domain/models/World';

/**
 * @function updatePlayerState
 * @description Обновляет состояние игрока, применяя гравитацию и обрабатывая столкновение с землей.
 * @param {Player} player - Объект игрока.
 * @param {World} world - Объект мира для получения информации о земле.
 */
export const updatePlayerState = (player: Player, world: World) => {
  // Если игра не окончена, применяем гравитацию
  if (!world.isGameOver) {
    player.velocity.y += player.gravity;
  }
  player.position.y += player.velocity.y;

  // Проверка столкновения с землей (работает всегда)
  if (player.position.y >= world.groundLevel - player.size.height) {
    player.position.y = world.groundLevel - player.size.height;
    player.velocity.y = 0;
    player.isJumping = false;
  }
};

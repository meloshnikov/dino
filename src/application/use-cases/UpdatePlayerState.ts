import { Player, World } from '../../domain/models';

/**
 * @function updatePlayerState
 * @description Обновляет состояние игрока, применяя гравитацию и обрабатывая столкновение с землей.
 * @param {Player} player - Объект игрока.
 * @param {World} world - Объект мира для получения информации о земле.
 */
export const updatePlayerState = (
  player: Player,
  world: World,
  deltaTime: number,
) => {
  player.velocity.y += player.gravity;
  player.position.y += player.velocity.y;

  if (player.position.y >= world.groundLevel - player.size.height) {
    player.position.y = world.groundLevel - player.size.height;
    player.velocity.y = 0;
    if (player.isJumping) {
      player.isJumping = false;
      player.animationState = 'running';
    }
  }

  if (player.animationState === 'running') {
    player.frameTime += deltaTime;
    if (player.frameTime > player.frameInterval) {
      player.frameTime = 0;
      player.animationFrame = (player.animationFrame + 1) % 2;
    }
  }
};

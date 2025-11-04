import { Player } from '../../domain/models/Player';

/**
 * @function playerJump
 * @description Заставляет игрока совершить прыжок, если он не находится в прыжке.
 * @param {Player} player - Объект игрока.
 */
export const playerJump = (player: Player) => {
  if (!player.isJumping) {
    // Сила прыжка
    player.velocity.y = -15;
    player.isJumping = true;
  }
};

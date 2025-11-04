import { Player } from '../../domain/models/Player';

export const playerJump = (player: Player) => {
  if (!player.isJumping) {
    /** Сила прыжка */
    player.velocity.y = -15;
    player.isJumping = true;
  }
};

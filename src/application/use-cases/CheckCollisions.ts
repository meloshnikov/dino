import { Player, Obstacle } from '../../domain/models';

/**
 * @function checkCollisions
 * @description Проверяет столкновение между игроком и препятствиями.
 * @param {Player} player - Объект игрока.
 * @param {Obstacle[]} obstacles - Массив препятствий.
 * @returns {boolean} - True, если есть столкновение.
 */
export const checkCollisions = (player: Player, obstacles: Obstacle[]): boolean => {
  const playerBox = {
    x: player.position.x,
    y: player.position.y,
    width: player.size.width,
    height: player.size.height,
  };

  const hasCollision = obstacles.some((obstacle) => {
    const obstacleBox = {
      x: obstacle.x,
      y: obstacle.y,
      width: obstacle.width,
      height: obstacle.height,
    };

    // Простое обнаружение столкновений AABB (Axis-Aligned Bounding Box)
    const collided = 
      playerBox.x < obstacleBox.x + obstacleBox.width &&
      playerBox.x + playerBox.width > obstacleBox.x &&
      playerBox.y < obstacleBox.y + obstacleBox.height &&
      playerBox.y + playerBox.height > obstacleBox.y;

    return collided;
  });

  if (hasCollision) {
    player.animationState = 'collided';
  }

  return hasCollision;
};

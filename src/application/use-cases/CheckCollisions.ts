import { Player } from '../../domain/models/Player';
import { Obstacle } from '../../domain/models/Obstacle';

/**
 * Проверяет столкновение между игроком и препятствиями.
 * @param player - Объект игрока.
 * @param obstacles - Массив препятствий.
 * @returns {boolean} - Возвращает true, если есть столкновение, иначе false.
 */
export const checkCollisions = (player: Player, obstacles: Obstacle[]): boolean => {
  const playerBox = {
    x: player.position.x,
    y: player.position.y,
    width: player.size.width,
    height: player.size.height,
  };

  return obstacles.some((obstacle) => {
    const obstacleBox = {
      x: obstacle.x,
      y: obstacle.y,
      width: obstacle.width,
      height: obstacle.height,
    };

    // Простое обнаружение столкновений AABB (Axis-Aligned Bounding Box)
    return (
      playerBox.x < obstacleBox.x + obstacleBox.width &&
      playerBox.x + playerBox.width > obstacleBox.x &&
      playerBox.y < obstacleBox.y + obstacleBox.height &&
      playerBox.y + playerBox.height > obstacleBox.y
    );
  });
};

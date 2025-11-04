import { World } from '../../domain/models/World';
import { Obstacle } from '../../domain/models/Obstacle';
import { GAME_CONFIG } from '../../infrastructure/config/gameConstants';

/**
 * @function getRandomInt
 * @description Вспомогательная функция для получения случайного целого числа в заданном диапазоне (включительно).
 * @param {number} min - Минимальное значение.
 * @param {number} max - Максимальное значение.
 * @returns {number} - Случайное целое число.
 */
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Обновляет состояние игрового мира на каждом кадре.
 * @param world - Объект игрового мира.
 */
export const updateWorldState = (world: World) => {
  // Если игра окончена, остановить все обновления мира
  if (world.isGameOver) {
    // Если текущий счет больше рекорда, обновить рекорд
    if (world.score > world.highScore) {
      world.highScore = world.score;
    }
    return;
  }

  // 1. Обновление счета
  world.score += 1;

  // 2. Обновление смещения фона для эффекта движения
  world.backgroundOffset += world.speed;

  // 3. Логика появления препятствий
  world.obstacleSpawnTimer -= 1;
  if (world.obstacleSpawnTimer <= 0) {
    // Сброс таймера на случайное значение
    world.obstacleSpawnTimer = getRandomInt(
      GAME_CONFIG.OBSTACLE_SPAWN_RATE_MIN,
      GAME_CONFIG.OBSTACLE_SPAWN_RATE_MAX
    );

    // Создание нового препятствия
    const newObstacleHeight = getRandomInt(
      GAME_CONFIG.OBSTACLE_MIN_HEIGHT,
      GAME_CONFIG.OBSTACLE_MAX_HEIGHT
    );

    const newObstacle: Obstacle = {
      x: GAME_CONFIG.CANVAS_WIDTH,
      y: GAME_CONFIG.GROUND_LEVEL - newObstacleHeight,
      width: GAME_CONFIG.OBSTACLE_WIDTH,
      height: newObstacleHeight,
    };

    world.obstacles.push(newObstacle);
  }

  // 4. Движение и удаление препятствий
  // Обновляем положение каждого препятствия
  world.obstacles.forEach((obstacle) => {
    obstacle.x -= world.speed;
  });

  // Удаляем препятствия, которые вышли за пределы экрана
  world.obstacles = world.obstacles.filter(
    (obstacle) => obstacle.x + obstacle.width > 0
  );
};

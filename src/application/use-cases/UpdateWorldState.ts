import { World, Obstacle } from '../../domain/models';
import { GAME_CONFIG } from '../../infrastructure/config';

/**
 * @function getRandomInt
 * @description Возвращает случайное целое число в заданном диапазоне.
 * @param {number} min - Минимальное значение.
 * @param {number} max - Максимальное значение.
 * @returns {number} - Случайное целое число.
 */
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @function updateWorldState
 * @description Обновляет состояние игрового мира на каждом кадре.
 * @param {World} world - Объект игрового мира.
 */
export const updateWorldState = (world: World) => {
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
    const obstacleTypes = [
      { type: 'cactus-small', width: 44, height: 47 },
      { type: 'cactus-large', width: 66, height: 71 },
    ];
    const selectedType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];

    const newObstacle: Obstacle = {
      x: GAME_CONFIG.CANVAS_WIDTH,
      y: GAME_CONFIG.GROUND_LEVEL - selectedType.height + 10,
      width: selectedType.width,
      height: selectedType.height,
      type: selectedType.type as 'cactus-small' | 'cactus-large',
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

  // 5. Логика появления облаков
  world.cloudSpawnTimer -= 1;
  if (world.cloudSpawnTimer <= 0) {
    world.cloudSpawnTimer = getRandomInt(100, 300); // Spawn clouds less frequently than obstacles

    const newCloud = {
      x: GAME_CONFIG.CANVAS_WIDTH,
      y: getRandomInt(50, 150),
      width: 92, // Original width of the cloud sprite
      height: 28, // Original height of the cloud sprite
      speed: world.speed * 0.5, // Slower speed for parallax effect
    };

    world.backgroundObjects.push(newCloud);
  }

  // 6. Движение и удаление облаков
  world.backgroundObjects.forEach((cloud) => {
    cloud.x -= cloud.speed;
  });

  world.backgroundObjects = world.backgroundObjects.filter(
    (cloud) => cloud.x + cloud.width > 0
  );
};

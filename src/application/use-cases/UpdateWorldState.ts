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
  world.score += 1;

  world.backgroundOffset += world.speed;

  world.obstacleSpawnTimer -= 1;
  if (world.obstacleSpawnTimer <= 0) {
    world.obstacleSpawnTimer = getRandomInt(
      GAME_CONFIG.OBSTACLE_SPAWN_RATE_MIN,
      GAME_CONFIG.OBSTACLE_SPAWN_RATE_MAX
    );

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

  world.obstacles.forEach((obstacle) => {
    obstacle.x -= world.speed;
  });

  world.obstacles = world.obstacles.filter(
    (obstacle) => obstacle.x + obstacle.width > 0
  );

  world.cloudSpawnTimer -= 1;
  if (world.cloudSpawnTimer <= 0) {
    world.cloudSpawnTimer = getRandomInt(100, 300); // Spawn clouds less frequently than obstacles

    const newCloud = {
      spriteName: 'cloud',
      x: GAME_CONFIG.CANVAS_WIDTH,
      y: getRandomInt(50, 150),
      width: 92, // Original width of the cloud sprite
      height: 28, // Original height of the cloud sprite
      speed: world.speed * 0.5, // Slower speed for parallax effect
    };

    world.backgroundObjects.push(newCloud);
  }

  world.backgroundObjects.forEach((cloud) => {
    cloud.x -= cloud.speed;
  });

  world.backgroundObjects = world.backgroundObjects.filter(
    (cloud) => cloud.x + cloud.width > 0
  );

  const score = world.score;
  const dayColor = { r: 135, g: 206, b: 235 }; // #87CEEB
  const nightColor = { r: 0, g: 0, b: 139 }; // #00008B
  const transitionDuration = 1000; // Очки, за которые происходит переход

  let progress = (score % (transitionDuration * 2)) / transitionDuration;
  if (progress > 1) {
    progress = 2 - progress; // Плавный возврат к дневному цвету
  }

  const r = Math.round(dayColor.r + (nightColor.r - dayColor.r) * progress);
  const g = Math.round(dayColor.g + (nightColor.g - dayColor.g) * progress);
  const b = Math.round(dayColor.b + (nightColor.b - dayColor.b) * progress);

  world.backgroundColor = `rgb(${r}, ${g}, ${b})`;
};

/**
 * @class World
 * @description Представляет сущность игрового мира.
 * Хранит глобальные параметры, такие как скорость движения и уровень земли.
 */
export class World {
  /**
   * @property {number} groundLevel - Координата Y, на которой находится поверхность земли.
   */
  groundLevel: number;

  /**
   * @property {number} speed - Текущая скорость движения мира (пикселей за кадр).
   */
  speed: number;

  /**
   * @property {number} backgroundOffset - Смещение фона/земли по оси X.
   * Используется для создания иллюзии бесконечного движения.
   */
  backgroundOffset: number;

  /**
   * @constructor
   * @param {number} groundLevel - Начальный уровень земли.
   * @param {number} initialSpeed - Начальная скорость мира.
   */
  constructor(groundLevel: number, initialSpeed: number) {
    this.groundLevel = groundLevel;
    this.speed = initialSpeed;
    this.backgroundOffset = 0;
  }
}

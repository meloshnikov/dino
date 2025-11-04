/**
 * @interface Position
 * @description Представляет координаты объекта в 2D-пространстве.
 */
export interface Position {
  /** @property {number} x - Координата по оси X. */
  x: number;
  /** @property {number} y - Координата по оси Y. */
  y: number;
}

/**
 * @class Player
 * @description Представляет сущность игрока в игровом мире.
 * Содержит данные о его состоянии, такие как позиция, скорость и размер.
 */
export class Player {
  /**
   * @property {Position} position - Текущая позиция игрока (левый верхний угол).
   */
  position: Position;

  /**
   * @property {{ y: number }} velocity - Скорость игрока по вертикали.
   * Положительное значение - движение вниз, отрицательное - вверх.
   */
  velocity: { y: number };

  /**
   * @property {{ width: number; height: number }} size - Размеры игрока (ширина и высота).
   */
  size: { width: number; height: number };

  /**
   * @property {boolean} isJumping - Флаг, указывающий, находится ли игрок в состоянии прыжка.
   */
  isJumping: boolean;

  /**
   * @property {number} gravity - Сила гравитации, постоянно действующая на игрока.
   */
  gravity: number;

  /**
   * @constructor
   * @param {Position} initialPos - Начальная позиция игрока.
   * @param {{ width: number; height: number }} size - Размер игрока.
   * @param {number} gravity - Сила гравитации.
   */
  constructor(
    initialPos: Position,
    size: { width: number; height: number },
    gravity: number,
  ) {
    this.position = { ...initialPos };
    this.size = size;
    this.gravity = gravity;
    this.velocity = { y: 0 };
    this.isJumping = false;
  }
}

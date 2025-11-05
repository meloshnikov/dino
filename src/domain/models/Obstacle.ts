/**
 * @interface Obstacle
 * @description Определяет структуру объекта препятствия в игре.
 * @property {number} x - Горизонтальная координата (положение по оси X).
 * @property {number} y - Вертикальная координата (положение по оси Y).
 * @property {number} width - Ширина препятствия.
 * @property {number} height - Высота препятствия.
 */
export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cactus-small' | 'cactus-large';
}

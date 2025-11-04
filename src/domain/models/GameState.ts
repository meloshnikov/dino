/**
 * @enum GameState
 * @description Представляет различные состояния, в которых может находиться игра.
 * @property {number} WaitingToStart - Игра ожидает первого действия игрока.
 * @property {number} Playing - Идет активный игровой процесс.
 * @property {number} GameOver - Игра окончена после столкновения.
 */
export enum GameState {
  WaitingToStart,
  Playing,
  GameOver,
}

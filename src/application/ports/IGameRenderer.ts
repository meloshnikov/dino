import { Player } from '../../domain/models/Player';
import { World } from '../../domain/models/World';

/**
 * @interface IGameRenderer
 * @description Определяет контракт для любого рендерера в игре.
 * Абстрагирует конкретную реализацию отрисовки (например, Canvas, WebGL) от игровой логики.
 */
export interface IGameRenderer {
  /**
   * @method clear
   * @description Очищает область отрисовки.
   */
  clear(): void;

  /**
   * @method drawPlayer
   * @description Отрисовывает объект игрока.
   * @param {Player} player - Объект игрока для отрисовки.
   */
  drawPlayer(player: Player): void;

  /**
   * @method drawWorld
   * @description Отрисовывает игровой мир (земля, фон, препятствия, счет).
   * @param {World} world - Объект мира для отрисовки.
   */
  drawWorld(world: World): void;
}

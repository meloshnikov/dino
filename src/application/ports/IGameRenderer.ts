import { Player, World } from '../../domain/models';

/**
 * @interface IGameRenderer
 * @description Определяет контракт для рендерера игры.
 * @method clear - Очищает область отрисовки.
 * @param {World} world - игровой мир
 * @method draw - Отрисовывает все игровые объекты.
 * @param {Player} player - объект игрока.
 * @param {World} world - объект мира.
 */
export interface IGameRenderer {
  clear(world: World): void;

  draw(player: Player, world: World): void;
}

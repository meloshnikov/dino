import { Player, World } from '../../domain/models';

/**
 * @interface IGameRenderer
 * @description Определяет контракт для рендерера игры.
 * @method clear - Очищает область отрисовки.
 * @method draw - Отрисовывает все игровые объекты.
 */
export interface IGameRenderer {
  clear(): void;

  draw(player: Player, world: World): void;
}

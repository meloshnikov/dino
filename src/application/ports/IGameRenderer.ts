import { Player } from '../../domain/models/Player';
import { World } from '../../domain/models/World';

export interface IGameRenderer {
  clear(): void;
  drawPlayer(player: Player): void;
  drawWorld(world: World): void;
}

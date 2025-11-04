import { World } from '../../domain/models/World';

// Обновляет состояние мира, создавая эффект скроллинга
export const updateWorldState = (world: World) => {
  world.backgroundOffset += world.speed;
};

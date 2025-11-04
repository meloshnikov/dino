import React, { useEffect, useRef } from 'react';
import { Player } from '../../domain/models/Player';
import { World } from '../../domain/models/World';
import { playerJump } from '../../application/use-cases/PlayerJump';
import { updatePlayerState } from '../../application/use-cases/UpdatePlayerState';
import { updateWorldState } from '../../application/use-cases/UpdateWorldState';
import { checkCollisions } from '../../application/use-cases/CheckCollisions';
import { CanvasRenderer } from '../../infrastructure/rendering/CanvasRenderer';
import { BrowserInputHandler } from '../../infrastructure/input/BrowserInputHandler';
import { GAME_CONFIG } from '../../infrastructure/config/gameConstants';

/**
 * @hook useGameController
 * @description Основной хук управления игрой. Инициализирует и связывает все части игры:
 * модели, use cases, рендерер, обработчик ввода. Управляет игровым циклом.
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef - Ref на элемент canvas для отрисовки.
 */
export const useGameController = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const isGameRunning = useRef(false);
  // Используем `useRef` для хранения изменяемых объектов, чтобы избежать ре-рендеров
  const gameInstances = useRef<any>({});

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new CanvasRenderer(canvas);

    const resetGame = () => {
      const player = new Player(
        GAME_CONFIG.PLAYER_INITIAL_POS,
        GAME_CONFIG.PLAYER_SIZE,
        GAME_CONFIG.GRAVITY
      );
      const world = new World(
        GAME_CONFIG.GROUND_LEVEL,
        GAME_CONFIG.WORLD_INITIAL_SPEED
      );
      // Сохраняем лучший счет между перезапусками
      if (gameInstances.current.world) {
        world.highScore = gameInstances.current.world.highScore;
      }
      gameInstances.current = { player, world };
    };

    resetGame(); // Первый запуск

    const inputHandler = new BrowserInputHandler(() => {
      const { player, world } = gameInstances.current;

      if (world.isGameOver) {
        resetGame();
        isGameRunning.current = true;
      } else {
        if (!isGameRunning.current) {
          isGameRunning.current = true;
        }
        playerJump(player);
      }
    });

    let frameId: number;
    const gameLoop = () => {
      const { player, world } = gameInstances.current;

      if (isGameRunning.current && !world.isGameOver) {
        updatePlayerState(player, world);
        updateWorldState(world);

        if (checkCollisions(player, world.obstacles)) {
          world.isGameOver = true;
          isGameRunning.current = false; // Останавливаем обновления, но не рендеринг
        }
      }

      renderer.clear();
      renderer.drawWorld(world);
      renderer.drawPlayer(player);

      frameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(frameId);
      inputHandler.destroy();
    };
  }, [canvasRef]);
};

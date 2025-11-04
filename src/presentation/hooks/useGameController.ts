import React, { useEffect, useRef } from 'react';
import { Player } from '../../domain/models/Player';
import { World } from '../../domain/models/World';
import { playerJump } from '../../application/use-cases/PlayerJump';
import { updatePlayerState } from '../../application/use-cases/UpdatePlayerState';
import { updateWorldState } from '../../application/use-cases/UpdateWorldState';
import { CanvasRenderer } from '../../infrastructure/rendering/CanvasRenderer';
import { BrowserInputHandler } from '../../infrastructure/input/BrowserInputHandler';
import { GAME_CONFIG } from '../../infrastructure/config/gameConstants';

export const useGameController = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const isGameRunning = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    /** 1. Инициализация */
    const canvas = canvasRef.current;
    const renderer = new CanvasRenderer(canvas);
    const player = new Player(GAME_CONFIG.PLAYER_INITIAL_POS, GAME_CONFIG.PLAYER_SIZE, GAME_CONFIG.GRAVITY);
    const world = new World(GAME_CONFIG.GROUND_LEVEL, GAME_CONFIG.WORLD_INITIAL_SPEED);

    /** 2. Настройка обработчика ввода */
    const inputHandler = new BrowserInputHandler(() => {
      if (!isGameRunning.current) {
        /** Запускаем игру по первому действию */
        isGameRunning.current = true;
      }
      /** Вызов Use Case для прыжка */
      playerJump(player);
    });

    /** 3. Игровой цикл */
    let frameId: number;
    const gameLoop = () => {
      if (isGameRunning.current) {
        /** Обновляем состояние игры (Use Cases) */
        updatePlayerState(player, world);
        updateWorldState(world);
      }

      /** Отрисовка происходит всегда, чтобы показать начальное состояние */
      renderer.clear();
      renderer.drawWorld(world);
      renderer.drawPlayer(player);

      frameId = requestAnimationFrame(gameLoop);
    };

    /** Запускаем цикл (обновления начнутся после isGameRunning.current = true) */
    gameLoop();

    return () => {
      cancelAnimationFrame(frameId);
      inputHandler.destroy();
    };
  }, [canvasRef]);
};

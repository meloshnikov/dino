import React, { useEffect, useRef } from 'react';
import { GameController } from '../controllers/GameController';

/**
 * @hook useGameController
 * @description Основной хук управления игрой. Инициализирует и связывает все части игры:
 * модели, use cases, рендерер, обработчик ввода. Управляет игровым циклом.
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef - Ref на элемент canvas для отрисовки.
 */
export const useGameController = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const controllerRef = useRef<GameController | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const controller = new GameController(canvasRef.current);
    controllerRef.current = controller;
    controller.start();

    return () => {
      controller.destroy();
    };
  }, [canvasRef]);
};

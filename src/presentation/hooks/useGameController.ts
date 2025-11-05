import React, { useEffect, useRef } from 'react';
import { GameController } from '../controllers/GameController';

/**
 * @hook useGameController
 * @description Основной хук управления игрой. Инициализирует и связывает все части игры:
 * модели, use cases, рендерер, обработчик ввода. Управляет игровым циклом.
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef - Ref на элемент canvas для отрисовки.
 */
export const useGameController = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    let controller: GameController | null = null;

    const init = async () => {
      controller = await GameController.create(canvasRef.current!);
      controller.start();
    };

    init();

    return () => {
      controller?.destroy();
    };
  }, [canvasRef]);
};

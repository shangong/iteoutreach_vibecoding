import React from 'react';
import { Point } from '../types';
import { GRID_SIZE } from '../constants';

interface GameBoardProps {
  snake: Point[];
  food: Point;
  isGameOver: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ snake, food, isGameOver }) => {
  // Create a 1D array representing the grid cells to map over
  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE });

  return (
    <div 
      className={`relative grid gap-[1px] bg-cyber-grid p-1 border-4 border-cyber-grid shadow-[0_0_30px_rgba(0,0,0,0.8)] ${isGameOver ? 'opacity-50 grayscale-[50%]' : ''}`}
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
        width: 'min(90vw, 500px)',
        aspectRatio: '1/1',
      }}
    >
      {cells.map((_, index) => {
        const x = index % GRID_SIZE;
        const y = Math.floor(index / GRID_SIZE);
        
        // Check if this cell is snake head
        const isHead = snake[0].x === x && snake[0].y === y;
        
        // Check if this cell is part of snake body
        // We skip index 0 because that's the head
        const isBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
        
        // Check if food
        const isFood = food.x === x && food.y === y;

        return (
          <div
            key={`${x}-${y}`}
            className={`
              w-full h-full rounded-xs transition-all duration-100
              ${isHead ? 'bg-cyber-neonGreen z-10 scale-110 shadow-[0_0_15px_#39ff14]' : ''}
              ${isBody ? 'bg-green-700/80 shadow-[0_0_5px_#15803d]' : ''}
              ${isFood ? 'bg-cyber-neonPink animate-pulse-fast shadow-[0_0_15px_#ff00ff] rounded-full scale-75' : ''}
              ${!isHead && !isBody && !isFood ? 'bg-cyber-dark' : ''}
            `}
          />
        );
      })}
    </div>
  );
};
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Direction, GameStatus, Point } from './types';
import { 
  GRID_SIZE, 
  INITIAL_SPEED, 
  INITIAL_SNAKE, 
  SCORE_INCREMENT, 
  SPEED_DECREMENT, 
  MIN_SPEED 
} from './constants';
import { GameBoard } from './components/GameBoard';
import { Button } from './components/Button';

// Utility to generate random food not on snake
const generateFood = (snake: Point[]): Point => {
  let newFood: Point;
  let isOnSnake = true;
  
  while (isOnSnake) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    // eslint-disable-next-line no-loop-func
    isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
  }
  return newFood!;
};

function App() {
  // --- State ---
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 }); // Initial temp food, rewritten on mount
  const [direction, setDirection] = useState<Direction>(Direction.UP);
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  // Refs for state accessed inside event listeners/intervals to avoid dependency stale closures
  const directionRef = useRef<Direction>(Direction.UP);
  const speedRef = useRef<number>(INITIAL_SPEED);
  
  // To prevent multiple direction changes in a single tick
  const processedDirectionRef = useRef<Direction>(Direction.UP);

  // --- Initialization ---
  useEffect(() => {
    const savedHighScore = localStorage.getItem('neon-snake-highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    setFood(generateFood(INITIAL_SNAKE));
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('neon-snake-highscore', score.toString());
    }
  }, [score, highScore]);

  // --- Game Logic ---

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(Direction.UP);
    directionRef.current = Direction.UP;
    processedDirectionRef.current = Direction.UP;
    setScore(0);
    setSpeed(INITIAL_SPEED);
    speedRef.current = INITIAL_SPEED;
    setFood(generateFood(INITIAL_SNAKE));
    setStatus(GameStatus.PLAYING);
  };

  const handleGameOver = () => {
    setStatus(GameStatus.GAME_OVER);
  };

  const moveSnake = useCallback(() => {
    if (status !== GameStatus.PLAYING) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const currentDir = directionRef.current;
      processedDirectionRef.current = currentDir; // Mark this direction as processed

      const newHead = { ...head };

      switch (currentDir) {
        case Direction.UP:
          newHead.y -= 1;
          break;
        case Direction.DOWN:
          newHead.y += 1;
          break;
        case Direction.LEFT:
          newHead.x -= 1;
          break;
        case Direction.RIGHT:
          newHead.x += 1;
          break;
      }

      // 1. Check Wall Collision
      if (
        newHead.x < 0 || 
        newHead.x >= GRID_SIZE || 
        newHead.y < 0 || 
        newHead.y >= GRID_SIZE
      ) {
        handleGameOver();
        return prevSnake;
      }

      // 2. Check Self Collision
      // We don't check the tail because it will move out of the way unless we eat
      // However, simplified logic: just check all parts. 
      // Technically if we don't eat, the tail pops. If we hit the tail position, it's safe if not growing.
      // Safe approximation: Check collision against the whole body except the very last segment (which is about to move),
      // UNLESS we eat, then the tail stays.
      const isEating = newHead.x === food.x && newHead.y === food.y;
      
      // Determine collision candidates based on whether we grow or not
      const collisionBody = isEating ? prevSnake : prevSnake.slice(0, -1);
      
      if (collisionBody.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        handleGameOver();
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // 3. Handle Food
      if (isEating) {
        setScore(s => s + SCORE_INCREMENT);
        setFood(generateFood(newSnake));
        
        // Increase Speed
        setSpeed(prev => {
          const nextSpeed = Math.max(MIN_SPEED, prev - SPEED_DECREMENT);
          speedRef.current = nextSpeed;
          return nextSpeed;
        });
        
        // Don't pop tail (grow)
      } else {
        newSnake.pop(); // Remove tail
      }

      return newSnake;
    });
  }, [food, status]);

  // --- Game Loop ---
  useEffect(() => {
    if (status !== GameStatus.PLAYING) return;

    const gameLoop = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoop);
  }, [status, speed, moveSnake]);

  // --- Controls ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== GameStatus.PLAYING) return;

      const lastDir = processedDirectionRef.current; // Use the direction actually rendered/processed
      
      switch (e.key) {
        case 'ArrowUp':
          if (lastDir !== Direction.DOWN) directionRef.current = Direction.UP;
          break;
        case 'ArrowDown':
          if (lastDir !== Direction.UP) directionRef.current = Direction.DOWN;
          break;
        case 'ArrowLeft':
          if (lastDir !== Direction.RIGHT) directionRef.current = Direction.LEFT;
          break;
        case 'ArrowRight':
          if (lastDir !== Direction.LEFT) directionRef.current = Direction.RIGHT;
          break;
      }
      setDirection(directionRef.current); // Force re-render for UI update (optional but helpful for debug)
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status]);

  // --- Render ---
  return (
    <div className="min-h-screen bg-cyber-black flex flex-col items-center justify-center font-mono text-white relative selection:bg-cyber-neonGreen selection:text-black">
      
      {/* Header / Scoreboard */}
      <div className="w-full max-w-[500px] flex justify-between items-end mb-6 px-4 z-10">
        <div className="text-left">
          <h1 className="text-4xl font-bold italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-neonGreen to-cyber-neonBlue drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">
            NEON<br/>SERPENT
          </h1>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-xs text-gray-400 uppercase tracking-widest">Score</div>
          <div className="text-3xl font-bold text-cyber-neonPink drop-shadow-[0_0_8px_#ff00ff]">
            {score.toString().padStart(4, '0')}
          </div>
          <div className="text-[10px] text-gray-500">HI: {highScore.toString().padStart(4, '0')}</div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative z-10">
        <GameBoard snake={snake} food={food} isGameOver={status === GameStatus.GAME_OVER} />
        
        {/* Overlays */}
        {status === GameStatus.IDLE && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-6 z-20">
            <div className="text-center space-y-2">
              <p className="text-cyber-neonBlue animate-pulse text-sm tracking-[0.2em]">SYSTEM READY</p>
              <p className="text-gray-400 text-xs">USE ARROW KEYS TO NAVIGATE</p>
            </div>
            <Button onClick={startGame} variant="primary">Initialize</Button>
          </div>
        )}

        {status === GameStatus.GAME_OVER && (
          <div className="absolute inset-0 bg-red-900/20 backdrop-blur-sm flex flex-col items-center justify-center gap-6 z-20 border-2 border-red-500/50">
            <h2 className="text-5xl font-black text-red-500 drop-shadow-[0_0_15px_red] tracking-tighter">
              CRITICAL<br/>FAILURE
            </h2>
            <div className="text-center">
              <p className="text-gray-300 text-sm">FINAL SCORE</p>
              <p className="text-3xl text-white font-bold">{score}</p>
            </div>
            <Button onClick={startGame} variant="secondary">Reboot System</Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs text-gray-600 font-mono tracking-widest z-10">
        v1.0.0 // SYSTEM_NORMAL
      </div>
      
    </div>
  );
}

export default App;
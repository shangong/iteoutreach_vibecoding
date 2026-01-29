// Game Constants
const X_CLASS = 'x';
const O_CLASS = 'o';
const HUMAN_PLAYER = 'X';
const AI_PLAYER = 'O';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// DOM Elements
const cellElements = document.querySelectorAll('[data-index]');
const board = document.getElementById('gameBoard');
const turnIndicator = document.getElementById('turnIndicator');
const playerModeIndicator = document.getElementById('playerModeIndicator');
const currentTurn = document.getElementById('currentTurn');
const currentPlayerSpan = document.getElementById('currentPlayer');
const restartBtn = document.getElementById('restartBtn');
const endGameModal = document.getElementById('endGameModal');
const endGameMessage = document.getElementById('endGameMessage');
const newGameBtn = document.getElementById('newGameBtn');
const modeSelectionModal = document.getElementById('modeSelectionModal');
const twoPlayerBtn = document.getElementById('twoPlayerBtn');
const aiPlayerBtn = document.getElementById('aiPlayerBtn');
const aiThinkingModal = document.getElementById('aiThinkingModal');

// Game State
let isOrcTurn = false; // false = X's turn, true = O's turn
let isGameActive = false;
let isAiGame = false;
let isAiThinking = false;


// Score Tracking
let gamesFinished = 0;
let playerXWins = 0;
let playerOWins = 0;
let draws = 0;
// Initialize
showModeSelection();

// Event Listeners
restartBtn.addEventListener('click', () => {
    if (isGameActive) {
        startGame();
    } else {
        showModeSelection();
    }
});
newGameBtn.addEventListener('click', showModeSelection);
twoPlayerBtn.addEventListener('click', () => startTwoPlayerGame());
aiPlayerBtn.addEventListener('click', () => startAIGame());

function showModeSelection() {
    isGameActive = false;
    endGameModal.classList.add('hidden');
    modeSelectionModal.classList.remove('hidden');
    restartBtn.textContent = 'Start Game';
}

function startTwoPlayerGame() {
    isAiGame = false;
    modeSelectionModal.classList.add('hidden');
    restartBtn.textContent = 'Restart Game';
    startGame();
}

function startAIGame() {
    isAiGame = true;
    modeSelectionModal.classList.add('hidden');
    restartBtn.textContent = 'Restart Game';
    startGame();
}

function startGame() {
    isOrcTurn = false;
    isGameActive = true;
    isAiThinking = false;
    
    // Clean up board
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.classList.remove('taken');
        cell.innerText = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });

    // Reset UI
    aiThinkingModal.classList.add('hidden');
    endGameModal.classList.add('hidden');
    updateTurnIndicator();
}

function handleClick(e) {
    if (!isGameActive || isAiThinking) return;

    const cell = e.target;
    // Safety check just in case
    if (cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) return;

    const currentClass = isOrcTurn ? O_CLASS : X_CLASS;
    
    placeMark(cell, currentClass);
    
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        updateTurnIndicator();
        
        // Check if AI needs to move
        if (isAiGame && isOrcTurn && isGameActive) {
            makeAIMove();
        }
    }
}

function makeAIMove() {
    isAiThinking = true;
    aiThinkingModal.classList.remove('hidden');
    
    // Use setTimeout to allow UI to update and simulate thinking
    setTimeout(() => {
        const bestMove = getBestMove();
        
        if (bestMove !== null) {
            const cell = cellElements[bestMove];
            placeMark(cell, O_CLASS);
            
            if (checkWin(O_CLASS)) {
                endGame(false);
            } else if (isDraw()) {
                endGame(true);
            } else {
                swapTurns();
                updateTurnIndicator();
            }
        }
        
        isAiThinking = false;
        aiThinkingModal.classList.add('hidden');
    }, 500);
}

function getBestMove() {
    const boardState = getBoardState();
    let bestScore = -Infinity;
    let bestMove = null;
    
    for (let i = 0; i < 9; i++) {
        if (boardState[i] === '') {
            boardState[i] = AI_PLAYER;
            const score = minimax(boardState, 0, false);
            boardState[i] = '';
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    
    return bestMove;
}

function getBoardState() {
    const state = [];
    cellElements.forEach(cell => {
        if (cell.classList.contains(X_CLASS)) {
            state.push(HUMAN_PLAYER);
        } else if (cell.classList.contains(O_CLASS)) {
            state.push(AI_PLAYER);
        } else {
            state.push('');
        }
    });
    return state;
}

function minimax(boardState, depth, isMaximizing) {
    const winner = checkWinner(boardState);
    
    if (winner === AI_PLAYER) return 10 - depth;
    if (winner === HUMAN_PLAYER) return depth - 10;
    if (isBoardFull(boardState)) return 0;
    
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === '') {
                boardState[i] = AI_PLAYER;
                const score = minimax(boardState, depth + 1, false);
                boardState[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === '') {
                boardState[i] = HUMAN_PLAYER;
                const score = minimax(boardState, depth + 1, true);
                boardState[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner(boardState) {
    for (let combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}

function isBoardFull(boardState) {
    return boardState.every(cell => cell !== '');
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.classList.add('taken');
    cell.innerText = currentClass === X_CLASS ? 'X' : 'O';
}

function swapTurns() {
    isOrcTurn = !isOrcTurn;
}

function updateTurnIndicator() {
    const player = isOrcTurn ? 'O' : 'X';
    
    if (isAiGame) {
        playerModeIndicator.innerText = 'AI Mode - ';
        playerModeIndicator.style.color = isOrcTurn ? 'var(--secondary-color)' : 'var(--primary-color)';
        currentTurn.innerHTML = isOrcTurn ? 
            '<span class="ai-thinking">AI (O) is thinking...</span>' : 
            'Human (X)\'s Turn';
        currentPlayerSpan.innerText = player;
        currentPlayerSpan.style.color = isOrcTurn ? 'var(--secondary-color)' : 'var(--primary-color)';
    } else {
        playerModeIndicator.innerText = '';
        currentTurn.innerHTML = `Player <span id="currentPlayer">${player}</span>'s Turn`;
        currentPlayerSpan.innerText = player;
        currentPlayerSpan.style.color = isOrcTurn ? 'var(--secondary-color)' : 'var(--primary-color)';
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function endGame(draw){
    gamesFinished++;
    
    if(draw){
        draws++;
        document.getElementById("draws").innerText = draws;
    } else if (isOrcTurn){
        playerOWins++;
        document.getElementById("playerOScore").innerText = playerOWins;
    } else {
        playerXWins++;
        document.getElementById("playerXScore").innerText = playerXWins;
    }
    isGameActive = false;
    if (draw) {
        endGameMessage.innerText = "It's a Draw!";
    } else {
        const winner = isOrcTurn ? "O" : "X";
        if (isAiGame) {
            endGameMessage.innerText = isOrcTurn ? "AI Wins!" : "Human Wins!";
        } else {
            endGameMessage.innerText = `Player ${winner} Wins!`;
        }
    }
    endGameModal.classList.remove('hidden');
}

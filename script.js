// Game Constants
const X_CLASS = 'x';
const O_CLASS = 'o';
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
const currentPlayerSpan = document.getElementById('currentPlayer');
const restartBtn = document.getElementById('restartBtn');
const endGameModal = document.getElementById('endGameModal');
const endGameMessage = document.getElementById('endGameMessage');
const newGameBtn = document.getElementById('newGameBtn');

// Game State
let isOrcTurn = false; // false = X's turn, true = O's turn
let isGameActive = true;

// Initialize
startGame();

// Event Listeners
restartBtn.addEventListener('click', startGame);
newGameBtn.addEventListener('click', startGame);

function startGame() {
    isOrcTurn = false;
    isGameActive = true;
    
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
    endGameModal.classList.add('hidden');
    updateTurnIndicator();
}

function handleClick(e) {
    if (!isGameActive) return;

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
    }
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
    currentPlayerSpan.innerText = player;
    currentPlayerSpan.style.color = isOrcTurn ? 'var(--secondary-color)' : 'var(--primary-color)';
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

function endGame(draw) {
    isGameActive = false;
    if (draw) {
        endGameMessage.innerText = "It's a Draw!";
    } else {
        const winner = isOrcTurn ? "O" : "X";
        endGameMessage.innerText = `Player ${winner} Wins!`;
    }
    endGameModal.classList.remove('hidden');
}

# Tic-Tac-Toe (HTML, CSS & JavaScript) - ITE outreach's vibecoding project

## 📖 Project Overview

This project is a web-based implementation of the classic **Tic-Tac-Toe** game (also known as *Noughts and Crosses* or *Xs and Os*). The game is designed for two players who take turns marking spaces on a 3×3 grid, with the objective of aligning three identical symbols in a row, column, or diagonal.

The project was created as a simple yet complete demonstration of front-end web development fundamentals using **HTML**, **CSS**, and **vanilla JavaScript**, without relying on external libraries or frameworks.

---

## 🛠️ Technologies Used

- **HTML** – Provides the structure and layout of the game board and UI elements.
- **CSS** – Handles styling, layout, responsiveness, and visual feedback (such as hover effects and winning highlights).
- **JavaScript** – Implements the game logic, player turns, win/draw detection, and interactivity.

---

## 🎮 How the Game Works

1. The game starts with an empty 3×3 grid.
2. Two players take turns placing their symbols:
   - Player 1: **X**
   - Player 2: **O**
3. Players click on an empty cell to place their mark.
4. After each move, the game checks for:
   - A **win condition** (three matching symbols in a row, column, or diagonal)
   - A **draw condition** (all cells filled with no winner)
5. When a game-ending condition is reached:
   - The winner is announced, or
   - A draw is declared
6. The game can then be reset to allow replay.

---

## 🧠 Development Approach

The project was developed incrementally using the following approach:

### 1. Structure (HTML)
- Created a 3×3 grid using semantic HTML elements.
- Added containers for status messages (current turn, winner, or draw).
- Included a reset/restart button.

### 2. Styling (CSS)
- Used CSS Grid/Flexbox to align the board cleanly.
- Styled cells to be visually distinct and interactive.
- Added visual cues for user interaction (hover states, cursor changes).
- Ensured a simple, readable, and responsive layout.

### 3. Logic & Interactivity (JavaScript)
- Managed game state using variables and arrays.
- Implemented click event listeners for each cell.
- Tracked the current player and alternated turns.
- Defined all possible winning combinations.
- Checked for wins and draws after every move.
- Disabled further input once the game ends.
- Implemented game reset functionality.

---

## ✨ Features

- Two-player gameplay
- Turn-based logic
- Win detection (rows, columns, diagonals)
- Draw detection
- Clear game state feedback
- Replayability

---

## 🚀 Possible Future Enhancements

- Single-player mode with AI opponent
- Difficulty levels
- Score tracking across multiple rounds
- Animations and sound effects
- Improved accessibility
- Mobile-first UI refinements

---

## 👤 Author

This project was **developed entirely by Gemini/Antigravity**, an AI language model created by OpenAI, as part of an assisted software design and development exercise.

---

## Prompt

Please brainstorm on the description of a tic tac toe game. Tic-tac-toe (American English), noughts and crosses (Commonwealth English), or Xs and Os (Canadian or Irish English) is a paper-and-pencil game for two players who take turns marking the spaces in a three-by-three grid, one with Xs and the other with Os. A player wins when they mark all three spaces of a row, column, or diagonal of the grid, whereupon they traditionally draw a line through those three marks to indicate the win. It is a solved game, with a forced draw assuming best play from both players

please make this verborse describing how it is played with epics and user-stories.

Epic: Core Gameplay Experience
Epic Description

As a player, I want to engage in a simple yet complete turn-based strategy game so that I can quickly understand the rules, make meaningful decisions, and reach a clear outcome—win, lose, or draw—within a short play session.

User Story 1: Starting a New Game

As a player,
I want to begin a new game on a clean 3×3 grid,
So that both players start with equal opportunity and no prior advantage.

Narrative Flow:
At the start of the game, an empty three-by-three grid is presented, symbolizing a fresh battlefield of possibility. No squares are marked, and no player has yet asserted dominance. One player is assigned the symbol X, the other O, establishing clear identities for each side. The game designates which player will move first, traditionally X, signaling the opening of the contest.

Epic: Turn-Based Player Interaction
Epic Description

As players, we want to alternate turns in a structured manner so that the game proceeds fairly and predictably.

User Story 2: Taking a Turn

As the active player,
I want to place my symbol in an empty square on my turn,
So that I can advance toward forming a winning pattern.

Narrative Flow:
On each turn, the active player surveys the grid, weighing options and anticipating future outcomes. A single empty square is selected, and the player’s symbol is permanently inscribed within it. Once placed, the mark cannot be moved or removed, reinforcing the consequence of every decision. Control then passes to the opposing player, maintaining a rhythm of alternating moves.

Epic: Strategic Decision-Making
Epic Description

As a player, I want to think ahead and respond to my opponent’s actions so that the game becomes a contest of foresight rather than chance.

User Story 3: Creating Opportunities and Blocking Opponents

As a player,
I want to place my marks strategically,
So that I can build toward a winning line while preventing my opponent from completing theirs.

Narrative Flow:
With each move, the grid evolves into a visible record of intention and counter-intention. Players seek to align three of their symbols in a straight line—horizontally, vertically, or diagonally—while simultaneously recognizing threats posed by the opponent. A move may serve dual purposes: advancing one’s own strategy and thwarting another’s progress.

Epic: Determining Victory
Epic Description

As a player, I want the game to clearly recognize a winning condition so that success is unambiguous and satisfying.

User Story 4: Winning the Game

As a player,
I want the game to detect when I have completed a line of three symbols,
So that my victory is immediately acknowledged.

Narrative Flow:
When a player successfully marks three of their symbols in a continuous row, column, or diagonal, the game reaches its climax. The winning line is traditionally emphasized—often by drawing a line through the three symbols—signifying the conclusion of the contest. At this moment, all further play ceases, and the winner is declared.

Epic: Handling Game Resolution
Epic Description

As players, we want the game to end fairly even when no one achieves victory.

User Story 5: Ending in a Draw

As a player,
I want the game to recognize when all squares are filled without a winning line,
So that the outcome is resolved without ambiguity.

Narrative Flow:
If the grid becomes completely filled and no player has succeeded in forming a line of three, the game concludes in a draw. This outcome reflects the game’s solved nature: when both players make optimal decisions, neither can force a win. The draw stands as a testament to balanced play and perfect counter-strategy.

Epic: Replayability and Learning
Epic Description

As a player, I want to be able to replay the game and improve my understanding so that each session reinforces strategic thinking.

User Story 6: Learning Through Repetition

As a player,
I want to play multiple games in succession,
So that I can recognize patterns, improve my play, and appreciate the depth hidden within simplicity.

Narrative Flow:
Though each individual match is brief, repeated play reveals the underlying structure of Tic-Tac-Toe. Players begin to recognize optimal openings, inevitable responses, and the pathways that lead to forced draws. The game becomes not just entertainment, but a gentle introduction to logic, prediction, and game theory.

## 📄 License

This project is provided for educational and demonstration purposes.  
You are free to modify, extend, and reuse it as needed.
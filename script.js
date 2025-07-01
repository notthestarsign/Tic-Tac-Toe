const gameBoard = document.getElementById("gameBoard");
const statusDisplay = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
const winnerPopup = document.getElementById("winnerPopup");
const winnerMessage = document.getElementById("winnerMessage");
const playAgainButton = document.getElementById("playAgainButton");
const namePrompt = document.getElementById("namePrompt");
const startGameButton = document.getElementById("startGameButton");

let playerX = "Player X";
let playerO = "Player O";
let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function startGame() {
    playerX = document.getElementById("playerX").value || "Player X";
    playerO = document.getElementById("playerO").value || "Player O";
    namePrompt.style.display = "none";
    gameBoard.classList.remove("hidden");
    statusDisplay.classList.remove("hidden");
    restartButton.classList.remove("hidden");
    statusDisplay.textContent = `${playerX}'s turn (X)`;
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute("data-index"));

    if (board[cellIndex] !== "" || !gameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) {
        displayWinner();
    } else if (board.every(cell => cell !== "")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = `${currentPlayer === "X" ? playerX : playerO}'s turn (${currentPlayer})`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        if (condition.every(index => board[index] === currentPlayer)) {
            return true;
        }
        return false;
    });
}

function displayWinner() {
    const winnerName = currentPlayer === "X" ? playerX : playerO;
    winnerMessage.textContent = `${winnerName} wins!`;
    winnerPopup.classList.remove("hidden");
    gameActive = false;
}

function restartGame() {
    board = Array(9).fill("");
    currentPlayer = "X";
    gameActive = true;
    namePrompt.style.display = "flex";
    gameBoard.classList.add("hidden");
    statusDisplay.classList.add("hidden");
    restartButton.classList.add("hidden");
    Array.from(gameBoard.children).forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
    winnerPopup.classList.add("hidden");
}

gameBoard.addEventListener("click", handleCellClick);
restartButton.addEventListener("click", restartGame);
playAgainButton.addEventListener("click", restartGame);
startGameButton.addEventListener("click", startGame);

window.onload = () => {
    namePrompt.style.display = "flex";
};

const gameBoard = [
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	''
];

// Define the winning combinations
const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

// Initialize game variables
let currentPlayer = 'X';
let gameOver = false;
let singlePlayer = true;
let aiPlayer = 'O';

// Get references to HTML elements
const message = document.getElementById('message');
const cells = document.getElementsByTagName('td');
const singlePlayerCheckbox = document.getElementById('ai-player');
const restartButton = document.getElementById('restart');

// Add event listeners
for (let i = 0; i < cells.length; i++) {
	cells[i].addEventListener('click', cellClicked);
}
singlePlayerCheckbox.addEventListener('change', singlePlayerChanged);
restartButton.addEventListener('click', restart);

// Handle cell clicked event
function cellClicked() {
	// Get the index of the clicked cell
	const index = parseInt(this.id.replace('cell-', ''));
	
	// Check if the cell is already occupied or the game is over
	if (gameBoard[index] !== '' || gameOver) {
		return;
	}
	
	// Update the game board
	gameBoard[index] = currentPlayer;
	this.textContent = currentPlayer;
	
	// Check for a winner or a tie
	if (checkWin()) {
		gameOver = true;
		message.textContent = currentPlayer + ' wins!';
	} else if (checkTie()) {
		gameOver = true;
		message.textContent = 'Tie game!';
	} else {
		// Switch to the next player
		currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		
		// If playing against AI, make the AI move
		if (singlePlayer && currentPlayer === aiPlayer) {
			makeAiMove();
		}
	}
}

// Handle single player checkbox changed event
function singlePlayerChanged() {
	singlePlayer = singlePlayerCheckbox.checked;
	if (singlePlayer) {
		// If switching to single player, choose a random player for AI
		aiPlayer = Math.random() < 0.5 ? 'X' : 'O';
		
		// If the AI is going first, make the AI move
		if (aiPlayer === 'X') {
			makeAiMove();
		}
	} else {
		// If switching to multiplayer, reset the AI player
		aiPlayer = '';
	}
	restart();
}

// Handle restart button clicked event
function restart() {
	// Reset game variables
	gameBoard.fill('');
	currentPlayer = 'X';
	gameOver = false;
	message.textContent = '';
	
	// Reset the game board display
	for (let i = 0; i < cells.length; i++) {
		cells[i].textContent = '';
	}
	
	// If playing against AI and the AI is going first, make the AI move
	if (singlePlayer && aiPlayer === 'X') {
		makeAiMove();
	}
}

// Check for a winner
function checkWin() {
    for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
    return true;
    }
    }
    return false;
    }
    
    // Check for a tie
    function checkTie() {
    for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === '') {
    return false;
    }
    }
    return true;
    }
    
    // Make the AI move
    function makeAiMove() {
    // Wait for a short time before making the move to simulate "thinking"
    setTimeout(() => {
    // Find all empty cells
    const emptyCells = [];
    for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === '') {
    emptyCells.push(i);
    }
    }
    // Choose a random empty cell
	const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
	
	// Update the game board and display
	gameBoard[index] = aiPlayer;
	document.getElementById('cell-' + index).textContent = aiPlayer;
	
	// Check for a winner or a tie
	if (checkWin()) {
		gameOver = true;
		message.textContent = aiPlayer + ' wins!';
	} else if (checkTie()) {
		gameOver = true;
		message.textContent = 'Tie game!';
	} else {
		// Switch to the human player
		currentPlayer = 'X';
	}
}, 500);}

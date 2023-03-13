// Create an array of five-letter words
var words = ["apple", "banana", "cherry", "grape", "orange", "pear", "peach", "plum", "melon"];

// Choose a random word from the array
var randomIndex = Math.floor(Math.random() * words.length);
var chosenWord = words[randomIndex];

// Create an array to store the correct guesses
var correctGuesses = [];

// Create a variable to keep track of the number of incorrect guesses
var incorrectGuesses = 0;

// Display the chosen word as blank spaces
var wordElement = document.getElementById("word");
for (var i = 0; i < chosenWord.length; i++) {
	correctGuesses.push("_");
	wordElement.innerHTML += "_ ";
}

// Function to handle submitting a guess
function submitGuess() {
    var guessInput = document.getElementById("guess");
    var guess = guessInput.value.toLowerCase();
    guessInput.value = "";
    // Check if the guess is valid
if (guess.length != 5) {
	document.getElementById("message").innerHTML = "Please enter a five-letter word.";
	return;
}

// Check if the guess is correct
var correctLetters = 0;
for (var i = 0; i < chosenWord.length; i++) {
	if (guess[i] == chosenWord[i]) {
		correctGuesses[i] = guess[i];
		correctLetters++;
	}
}

// If all letters are correct, the game is won
if (correctLetters == 5) {
	document.getElementById("message").innerHTML = "Congratulations, you won!";
	return;
}

// If some letters are correct, display the partially correct word
if (correctLetters > 0) {
	wordElement.innerHTML = "";
	for (var i = 0; i < correctGuesses.length; i++) {
		wordElement.innerHTML += correctGuesses[i] + " ";
	}
	document.getElementById("message").innerHTML = "Correct letters: " + correctLetters;
	return;
}

// If no letters are correct, increment the number of incorrect guesses
incorrectGuesses++;
document.getElementById("message").innerHTML = "Incorrect guess. You have " + (6 - incorrectGuesses) + " guesses left.";

// If the maximum number of incorrect guesses is reached, the game is lost
if (incorrectGuesses == 6) {
	document.getElementById("message").innerHTML = "Game over. The word was " + chosenWord + ".";
	return;
}
}
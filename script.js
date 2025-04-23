// Geting references to HTML elements
const guessForm = document.getElementById('guessForm');
const guessInput = document.getElementById('guessInput');
const messageDiv = document.getElementById('message');
const playAgainBtn = document.getElementById('playAgain');
const changeColorBtn = document.getElementById('changeColor');

// Generating a random number between 1 and 100
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0; // This helps keep track of how many guesses the user has made

// A function to generate a random pastel color using HSL
const getRandomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 90%)`;

// Changing the background color when the button is clicked / onclick event listener
changeColorBtn.addEventListener('click', () => {
  document.body.style.backgroundColor = getRandomColor();
});

// Listen for the form submission when user presses "Guess"
guessForm.addEventListener('submit', function(e) {
  e.preventDefault(); // This prevents the form from reloading the page
  const userGuess = parseInt(guessInput.value); // Converting the user input to a number

  // Validating the user's guess
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    messageDiv.textContent = ' Please enter a valid number between 1 and 100.';
    return;
  }

  attempts++; // Incrementing the number of attempts

  // Check if the guess is correct
  if (userGuess === secretNumber) {
    messageDiv.textContent = `🎉 Correct! The number was ${secretNumber}. You guessed it in ${attempts} attempts.`;
    playAgainBtn.classList.remove('hidden'); // Show the "Play Again" button
    guessInput.disabled = true; // Disable the input so the user can't keep guessing
  } else if (userGuess < secretNumber) {
    messageDiv.textContent = '📉 Too low! Try again.'; // Hint if guess is too low
  } else {
    messageDiv.textContent = '📈 Too high! Try again.'; // Hint if guess is too high
  }
});

// When the "Play Again" button is clicked, reset the game
playAgainBtn.addEventListener('click', () => {
  secretNumber = Math.floor(Math.random() * 100) + 1; // New random number
  attempts = 0; // Reset attempt counter
  messageDiv.textContent = ''; // Clear previous messages
  guessInput.value = ''; // Clear the input field
  guessInput.disabled = false; // Enable input again
  playAgainBtn.classList.add('hidden'); // Hide the "Play Again" button
});

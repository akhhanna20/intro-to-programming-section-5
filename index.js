const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const belowTheLowest = document.getElementById("below-zero");
const higherThanMax = document.getElementById("up-max");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  attempts = attempts + 1;
  hideAllMessages();

  if (guess <= 0 || guess >= 100) {
    if (guess <= 0) {
      belowTheLowest.style.display = "";
    } else if (guess >= 100) {
      higherThanMax.style.display = "";
    }
    // Enable the input and submit button
    submitButton.disabled = true;
    guessInput.disabled = true;

    resetGame();
  }

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = "";

    // Enable the input and submit button
    submitButton.disabled = true;
    guessInput.disabled = true;

    resetGame();
  }

  if (guess !== targetNumber && guess > 0 && guess < 100) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else if (guess > targetNumber) {
      tooHighMessage.style.display = "";
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    // console.log("atp:", attempts);
    // console.log("maxNum:", maxNumberOfAttempts);
    // console.log("remAtp:", remainingAttempts);

    numberOfGuessesMessage.style.display = "";

    //If amount of attempts > 1 it shows "guesses" else it shows "guess"
    remainingAttempts > 1
      ? (numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> 
    
    ${remainingAttempts} guesses remaining`)
      : (numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> 
    
    ${remainingAttempts} guess remaining`);
  }

  if (attempts === maxNumberOfAttempts) {
    // Enable the input and submit button
    submitButton.disabled = true;
    guessInput.disabled = true;
    resetGame();
  }

  //Clean input and hide reset button after all attempts is finished
  guessInput.value = "";
  resetButton.style.display = "";
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = "none";
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  //Submit button is disabled before cursor is not in input
  if (!guessInput.value) {
    submitButton.disabled = true;
  }
  guessInput.addEventListener("click", (e) => {
    submitButton.disabled = false;
  });

  // Reset number of attempts
  attempts = 0;
  maxNumberOfAttempts = 5;
  // console.log(maxNumberOfAttempts);

  hideAllMessages();
  resetButton.style.display = "none";
}
submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();

// Enable the input and submit button
// Reset number of attempts
function resetGame() {
  resetButton.addEventListener("click", (e) => {
    submitButton.disabled = false;
    guessInput.disabled = false;
    maxNumberOfAttempts = 5;
    attempts = 0;
  });
}

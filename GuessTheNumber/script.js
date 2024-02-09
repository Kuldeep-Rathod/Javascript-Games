let randomNumber = Math.floor(Math.random() * 100) + 1;

const submit = document.querySelector('#subt')
const userInput = document.querySelector('#guessField')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p');

let prevGuesses = []
let numGuesses = 1
let playGame = true

if (playGame) {
  submit.addEventListener('click', function(e) {
    e.preventDefault()
    const guess = parseInt(userInput.value)
    validateGuess(guess)
  })
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number')
  }
  else if (guess < 1) {
    alert('Please enter a number greater than 1')
  }
  else if (guess > 100) {
    alert('Please enter a number less than 100')
  }
  else {
    prevGuesses.push(guess)
    if (numGuesses === 10) {
      previousGuesses(guess)
      lowOrHi.innerHTML = `Game Over! Number was ${randomNumber}`
      lowOrHi.style.backgroundColor = 'red'
      endGame()
    }
    else {
      previousGuesses(guess)
      checkGuess(guess)
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    lowOrHi.innerHTML = `You guessed correctly in ${numGuesses} guesses`
    lowOrHi.style.backgroundColor = 'green'
    endGame()
  }
  else if (guess < randomNumber) {
    lowOrHi.innerHTML = 'Too low'
    lowOrHi.style.backgroundColor = 'orange'
  }
  else if (guess > randomNumber) {
    lowOrHi.innerHTML = 'Too high'
    lowOrHi.style.backgroundColor = 'red'
  }
}

function previousGuesses(guess) {
  userInput.value = ''
  guessSlot.innerHTML += `${guess}, `
  numGuesses++;
  remaining.innerHTML = `${10 - numGuesses} `
}

function endGame() {
  userInput.value = ''
  userInput.setAttribute('disabled', '')
  p.classList.add('button')
  p.innerHTML = `<h3 id=newGame>Start New Game</h3>`
  startOver.appendChild(p)
  playGame = false
  newGame()
}

function newGame() {
  const newGamebtn = document.querySelector('#newGame')
  newGamebtn.addEventListener(('click'), function(e) {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    prevGuesses = []
    numGuesses = 1
    guessSlot.innerHTML = ''
    remaining.innerHTML = `${10 - numGuesses} `;
    userInput.removeAttribute('disabled')
    startOver.removeChild(p)
    playGame = true
    e.preventDefault()
  })
}


const gameNumberElement = document.querySelector(".game__number");
const gameFeedbackElement = document.querySelector(".game__feedback");
const gameGuessElement = document.querySelector(".game__guess");
const gameHealthNumberElement = document.querySelector(".game__health-number");
const gameHealthElement = document.querySelector(".game__health-bar");
const gamePlaytBtn = document.querySelector(".game__button-play");
const gameResetBtn = document.querySelector(".game__button-reset");
let gameHealth;
let gameOver;
let randomGuessNumber;

const updateData = (element, message) => {
  element.textContent = message
}

const init = () => {
  gameHealth = 100
  gameOver = 0
  randomGuessNumber = Math.trunc(Math.random() * 10) + 1

  updateData(gameHealthNumberElement, "100%")
  updateData(gameFeedbackElement, "Qual o seu palpite?");
  updateData(gameNumberElement, "?");

  gameGuessElement.value = "";
  gameHealthElement.style.backgroundColor = "green";
  gameHealthElement.style.width = `${gameHealth}%`;
}

init()

const playGame = () => {
  const guess = Number(gameGuessElement.value)

  if(!gameOver) {
    if (guess <= 0) {
      updateData(gameFeedbackElement, "Entre com um número válido!")
    } else if (guess === randomGuessNumber) {
      gameNumberElement.textContent = randomGuessNumber
      updateData(gameFeedbackElement, "Você ganhou!")
      gameOver = true
    } else if (guess !== randomGuessNumber) {
      if (gameHealth > 20) {
        updateData(gameFeedbackElement, guess > randomGuessNumber ? "Tente um número mais baixo!" : "Tente um número mais alto")
        gameHealth -=20
        gameHealthElement.style.width = `${gameHealth}%`
        updateData(gameHealthNumberElement, `${gameHealth}%`)

        if (gameHealth < 50) {
          gameHealthElement.style.backgroundColor = "red"
        }
      } else {
        updateData(gameFeedbackElement, "Game over!");
        gameHealth = 0;
        gameHealthElement.style.width = `${gameHealth}%`;
        updateData(gameHealthNumberElement, "0%");
        gameOver = true;
      }
    }
  } else {
    updateData(gameFeedbackElement, "Reset para jogar novamente!")
  }
}

gamePlaytBtn.addEventListener('click', playGame)
gameResetBtn.addEventListener('click', init)
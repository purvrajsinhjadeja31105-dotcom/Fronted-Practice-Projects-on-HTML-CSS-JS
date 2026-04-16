const buttons = document.querySelectorAll(".move-button");
const userScore = document.querySelector("#user-score");
const compScore = document.querySelector("#comp-score");
const userChoice = document.querySelector("#user-choice");
const compChoice = document.querySelector("#comp-choice");
const result = document.querySelector("#result");
const historyList = document.querySelector("#history-list");
const roundCounter = document.querySelector("#round-counter");
const resetButton = document.querySelector("#reset-btn");

let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;

const choiceEmoji = {
  rock: "✊",
  paper: "✋",
  scissor: "✌️"
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerSelection = button.dataset.choice;
    const computerSelection = computerPlayer();
    const outcome = playRound(playerSelection, computerSelection);
    updateDisplay(playerSelection, computerSelection, outcome);
  });
});

resetButton.addEventListener("click", resetGame);


function computerPlayer() {
  const choices = ["rock", "paper", "scissor"];
  const randomChoice = Math.floor(Math.random() * choices.length);
  return choices[randomChoice];
}

function playRound(playerSelection, compSelection) {
  if (playerSelection === compSelection) {
    return {
      winner: "tie",
      message: `Tie! Both chose ${capitalize(playerSelection)}.`
    };
  }

  const playerWins =
    (playerSelection === "paper" && compSelection === "rock") ||
    (playerSelection === "rock" && compSelection === "scissor") ||
    (playerSelection === "scissor" && compSelection === "paper");

  if (playerWins) {
    playerScore++;
    return {
      winner: "player",
      message: `You win! ${capitalize(playerSelection)} beats ${capitalize(compSelection)}.`
    };
  }

  computerScore++;
  return {
    winner: "computer",
    message: `You lose! ${capitalize(compSelection)} beats ${capitalize(playerSelection)}.`
  };
}

function updateDisplay(playerSelection, computerSelection, outcome) {
  userScore.textContent = playerScore;
  compScore.textContent = computerScore;
  userChoice.textContent = `${choiceEmoji[playerSelection]} ${capitalize(playerSelection)}`;
  compChoice.textContent = `${choiceEmoji[computerSelection]} ${capitalize(computerSelection)}`;
  result.textContent = outcome.message;
  addHistory(outcome, playerSelection, computerSelection);
}

function addHistory(outcome, playerSelection, computerSelection) {
  roundNumber += 1;
  const entry = document.createElement("li");
  entry.textContent = `Round ${roundNumber}: ${capitalize(playerSelection)} ${choiceEmoji[playerSelection]} vs ${capitalize(computerSelection)} ${choiceEmoji[computerSelection]} — ${outcome.message}`;
  historyList.prepend(entry);
  roundCounter.textContent = `${roundNumber} ${roundNumber === 1 ? "round" : "rounds"}`;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;
  userScore.textContent = playerScore;
  compScore.textContent = computerScore;
  userChoice.textContent = "—";
  compChoice.textContent = "—";
  result.textContent = "Make your move.";
  historyList.innerHTML = "";
  roundCounter.textContent = "0 rounds";
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

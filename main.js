let randomNumber = 0;
let userAnswer = document.getElementById("user-answer");
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let resultArea = document.getElementById("result-area");
let chance = 5;
let history = [];

playButton.addEventListener("click", playGame);
resetButton.addEventListener("click", resetGame);
userAnswer.addEventListener("click", function () {
  userAnswer.value = "";
});

function randomValue() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log(`정답은 ${randomNumber} 입니다.`);
}

function playGame() {
  let userNumber = userAnswer.value;

  if (1 > userNumber || userNumber > 100) {
    resultArea.textContent = "1 부터 100 사이의 숫자를 입력해주세요.";
    return;
  }
  if (history.includes(userNumber) == true) {
    resultArea.textContent =
      "중복된 값을 입력하셨습니다. 다른 값을 입력해주세요.";
    return;
  }

  if (userNumber == "") {
    resultArea.textContent = "정답을 입력해주세요.";
    return;
  }

  chance--;
  chanceArea.textContent = `남은 기회 : ${chance}회`;

  if (randomNumber > userNumber) {
    resultArea.textContent = "더 높은 숫자를 입력해주세요.";
  } else if (randomNumber < userNumber) {
    resultArea.textContent = "더 낮은 숫자를 입력해주세요.";
  } else {
    playButton.disabled = true;
    resultArea.textContent = "정답입니다. 초기화 후 다시 시작할 수 있습니다.";
    return;
  }

  if (chance == 0) {
    playButton.disabled = true;
    resultArea.textContent = `아쉽습니다. 정답은 ${randomNumber}입니다. 초기화 후 다시 시작해주세요.`;
  }

  history.push(userNumber);
  console.log(history);
}

function resetGame() {
  randomValue();
  userAnswer.value = "";
  chance = 5;
  resultArea.textContent =
    "게임이 리셋되었습니다. 게임 결과가 여기 표시됩니다.";
  chanceArea.textContent = "남은 기회 : 5회";
  playButton.disabled = false;
  history = [];
}

randomValue();

// 랜덤번호 지정
// 유저가 번호 입력 -> GO 라는 버튼 누름
// 유저가 랜덤번호 맞출 경우, 맞췄습니다. 라는 문구 출력
// 랜덤번호보다 높으면, Down!
// 랜덤번호보다 낮으면, Up!
// Reset 버튼 누르면 게임이 리셋
// 5번의 기회를 다 쓰면 게임 종료 (더 이상 진행 불가)
// 1 ~ 100 범위를 벗어가너가 숫자를 중복 입력하면 기회를 깎지 않는다

let computerNum = 0;
let playButton = document.getElementById("play-button"); // 페이지로부터 ID를 기반으로 가져옴
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play); // click 시 play 함수 실행 (함수도 매개변수로 사용가능)
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1; // 1부터 100까지 랜덤값 출력
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (1 > userValue || userValue > 100) {
    resultArea.textContent = "1과 100 사이 값을 입력해주세요.";
    return;
  }

  if (history.includes(userValue) == true) {
    resultArea.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
    return;
  }

  chances--;
  chanceArea.textContent = `남은 기회: ${chances}회`;

  if (userValue < computerNum) {
    resultArea.textContent = "UP!!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "DOWN!!!";
  } else {
    resultArea.textContent = "정답!!!";
    gameOver = true
  }

  history.push(userValue);
  console.log(history);

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset() {
  // user input이 정리되고
  userInput.value = "";
  // 새로운 번호가 생성됨
  pickRandomNum();
  chances = 5;
  resultArea.textContent = "리셋이 되었습니다. 새로운 게임이 시작됩니다.";
  chanceArea.textContent = "남은 기회: 5회";
  playButton.disabled = false;
}

pickRandomNum();

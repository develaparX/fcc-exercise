const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

const rollDice = () => {
  diceValuesArr = [];

  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceValuesArr.push(randomDice);
  };

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
};

const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
};

const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue);
  totalScoreElement.textContent = score;

  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

const getHighestDuplicates = (arr) => {
  const counts = {};

  for (const num of arr) {
    if (counts[num]) {
      counts[num]++;
    } else {
      counts[num] = 1;
    }
  }

  let highestCount = 0;

  for (const num of arr) {
    const count = counts[num];
    if (count >= 3 && count > highestCount) {
      highestCount = count;
    }
    if (count >= 4 && count > highestCount) {
      highestCount = count;
    }
  }

  const sumOfAllDice = arr.reduce((a, b) => a + b, 0);

  if (highestCount >= 4) {
    updateRadioOption(1, sumOfAllDice);
  }

  if (highestCount >= 3) {
    updateRadioOption(0, sumOfAllDice);
  }

  updateRadioOption(5, 0);
};

const detectFullHouse = (arr) => {
  const counts = {};

  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  const hasThreeOfAKind = Object.values(counts).includes(3);
  const hasPair = Object.values(counts).includes(2);

  if (hasThreeOfAKind && hasPair) {
    updateRadioOption(2, 25);
  }

  updateRadioOption(5, 0);
};

const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });

  scoreSpans.forEach((span) => {
    span.textContent = "";
  });
};

const resetGame = () => {
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  round = 1;
  rolls = 0;

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });

  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = "";

  rollsElement.textContent = rolls;
  roundElement.textContent = round;

  resetRadioOptions();
};

const checkForStraights = (diceArray) => {
  // Buat array unik dan urutkan
  const uniqueSorted = [...new Set(diceArray)].sort((a, b) => a - b);

  let isLargeStraight = false;
  let isSmallStraight = false;

  // Cek Large Straight:
  // Harus tepat 5 angka dan harus berupa urutan [1,2,3,4,5] atau [2,3,4,5,6]
  if (uniqueSorted.length === 5) {
    if (
      (uniqueSorted[0] === 1 &&
       uniqueSorted[1] === 2 &&
       uniqueSorted[2] === 3 &&
       uniqueSorted[3] === 4 &&
       uniqueSorted[4] === 5) ||
      (uniqueSorted[0] === 2 &&
       uniqueSorted[1] === 3 &&
       uniqueSorted[2] === 4 &&
       uniqueSorted[3] === 5 &&
       uniqueSorted[4] === 6)
    ) {
      isLargeStraight = true;
    }
  }

  // Cek Small Straight:
  // Cari run minimal 4 angka berurutan dalam uniqueSorted.
  let currentRun = 1;
  for (let i = 1; i < uniqueSorted.length; i++) {
    if (uniqueSorted[i] === uniqueSorted[i - 1] + 1) {
      currentRun++;
      if (currentRun >= 4) {
        isSmallStraight = true;
        break;
      }
    } else {
      currentRun = 1;
    }
  }

  // Update radio options sesuai dengan hasil pengecekan:
  if (isLargeStraight) {
    // Jika large straight, update radio button kelima (misal index 4) dengan 40,
    // dan juga update radio button keempat (misal index 3) dengan 30.
    updateRadioOption(4, 40); // Large Straight
    updateRadioOption(3, 30); // Small Straight juga diaktifkan
  } else if (isSmallStraight) {
    // Jika hanya small straight, update radio button keempat dengan 30.
    updateRadioOption(3, 30);
  } else {
    // Jika tidak ada straight, update radio button terakhir dengan 0.
    updateRadioOption(scoreInputs.length - 1, 0);
  }
};


rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.");
  } else {
    rolls++;
    resetRadioOptions();
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr)
  }
});

rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;

  if (isModalShowing) {
    rulesBtn.textContent = "Hide rules";
    rulesContainer.style.display = "block";
  } else {
    rulesBtn.textContent = "Show rules";
    rulesContainer.style.display = "none";
  }
});

keepScoreBtn.addEventListener("click", () => {
  let selectedValue;
  let achieved;

  for (const radioButton of scoreInputs) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      achieved = radioButton.id;
      break;
    }
  }

  if (selectedValue) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOptions();
    updateScore(selectedValue, achieved);
    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${score}`);
        resetGame();
      }, 500);
    }
  } else {
    alert("Please select an option or roll the dice");
  }
});
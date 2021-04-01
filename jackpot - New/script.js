"use strict";

// Title
const titleCheatBtn = document.querySelector(".title__container");
const titleH1 = document.querySelector(".title__h1");
const livesEl = document.querySelector(".lives");
// Numbers
const stop1 = document.getElementById("number__1");
const J = document.getElementById("number__2");
const A = document.getElementById("number__3");
const C = document.getElementById("number__4");
const K = document.getElementById("number__5");
const P = document.getElementById("number__6");
const O = document.getElementById("number__7");
const T = document.getElementById("number__8");
const stop2 = document.getElementById("number__9");

//Buttons
const rollBtnEl = document.getElementById("rollBtn");
const bothBtnEl = document.getElementById("bothBtn");
const resetBtnEl = document.getElementById("resetBtn");
const dice1BtnEl = document.getElementById("dice1Btn");
const dice2BtnEl = document.getElementById("dice2Btn");
const startBtnEl = document.querySelector(".startBtn");

// ============================================Arrays=============================================
const numbers = [stop1, J, A, C, K, P, O, T, stop2];
const revealedNumbers = [".", "J", "A", "C", "K", "P", "O", "T", "."];
let foundNumbers = [0];
let lives = 3;
let cheatSwitch = false;
// ============================================Vars===============================================
let dice1, dice2, bothDice;
//================================================================================================

if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
  /* iOS hides Safari address bar */
  window.addEventListener("load", function () {
    setTimeout(function () {
      window.scrollTo(0, 1000);
    }, 1000);
  });

  window.addEventListener("load", function () {
    setTimeout(function () {
      window.scrollTo(0, 1000);
    }, 2000);
  });
}

// FUNCTIONS
// Enable Buttons
const enableBtns = (btn) => {
  btn.disabled = false;
  btn.classList.remove("hidden");
};

// Disable Buttons
const disableBtns = (btn) => {
  btn.disabled = true;
  btn.classList.add("hidden");
};

// Init Function
const init = () => {
  cheatSwitch = false;
  lives = 3;
  livesEl.innerHTML = `Lives - (${lives})`;
  foundNumbers = [0];
  enableBtns(dice1BtnEl);
  enableBtns(dice2BtnEl);
  enableBtns(bothBtnEl);
  enableBtns(rollBtnEl);

  disableBtns(dice1BtnEl);
  disableBtns(dice2BtnEl);
  disableBtns(bothBtnEl);
  disableBtns(resetBtnEl);
  dice1BtnEl.src = `images/dice-1.png`;
  dice2BtnEl.src = `images/dice-2.png`;
  titleH1.innerHTML = `Jackpot`;

  // Reset Numbers
  for (let i = 0; i < numbers.length; i++) {
    numbers[i].innerHTML = i + 1;
    numbers[i].classList.remove("found");
  }
};
init();

// GAME
rollBtnEl.addEventListener("click", () => {
  // Cheat Check
  if (cheatSwitch) cheat();

  if (!cheatSwitch) {
    enableBtns(dice1BtnEl);
    enableBtns(dice2BtnEl);
    enableBtns(bothBtnEl);
    disableBtns(rollBtnEl);
    //============================================//
    dice1 = Math.trunc(Math.random() * 6 + 1);
    dice2 = Math.trunc(Math.random() * 6 + 1);
    bothDice = dice1 + dice2;
    if (bothDice > 9) bothDice = 0;
    //============================================//

    dice1BtnEl.src = `images/dice-${dice1}.png`;
    dice2BtnEl.src = `images/dice-${dice2}.png`;
    // Check available options
    checkDice(dice1, dice2, bothDice);
  }
});

// Check Valid Dice Function
const checkDice = (dice1, dice2, bothDice) => {
  const dice = [dice1, dice2, bothDice];

  dice.forEach((dice, i) => {
    if (foundNumbers.includes(dice)) {
      if (i === 0) disableBtns(dice1BtnEl);
      if (i === 1) disableBtns(dice2BtnEl);
      if (i === 2) disableBtns(bothBtnEl);
    }
  });

  if (dice1BtnEl.disabled && dice2BtnEl.disabled && bothBtnEl.disabled) {
    lives -= 1;
    livesEl.innerHTML = `Lifes - (${lives})`;
    titleH1.innerHTML = `Life Lost`;
    // Check lives
    if (lives < 1) {
      disableBtns(rollBtnEl);
      livesEl.innerHTML = `Lifes - (${lives})`;
    } else {
      enableBtns(rollBtnEl);
    }
  }
  // console.log(lives);
  lostCheck();
};

// Win Check
const winCheck = () => {
  if (foundNumbers.length === 10) {
    titleH1.innerHTML = "WINNER!!";
    enableBtns(resetBtnEl);
    disableBtns(rollBtnEl);
  } else {
    titleH1.innerHTML = "Playing";
  }
};

// Lost Check
const lostCheck = () => {
  if (dice1 === dice2) {
    if (foundNumbers.includes(dice1) && foundNumbers.includes(bothDice) && lives === 0) {
      enableBtns(resetBtnEl);
      titleH1.innerHTML = "GAME OVER";
    } else {
      titleH1.innerHTML = "Playing";
    }
  } else if (foundNumbers.includes(dice1) && foundNumbers.includes(dice2) && foundNumbers.includes(bothDice) && lives === 0) {
    enableBtns(resetBtnEl);
    titleH1.innerHTML = "GAME OVER";
  } else {
    titleH1.innerHTML = "Playing";
  }
};

// Reveal Letter Function
const revealLetter = (dice) => {
  const diceNum = dice - 1;
  numbers[diceNum].innerHTML = `${revealedNumbers[diceNum]}`;
  numbers[diceNum].classList.add("found");
  foundNumbers.push(dice);
  disableBtns(dice1BtnEl);
  disableBtns(dice2BtnEl);
  disableBtns(bothBtnEl);
  enableBtns(rollBtnEl);
  winCheck();
};

// BUTTON EVENT LISTENERS
dice1BtnEl.addEventListener("click", () => {
  revealLetter(dice1);
});

dice2BtnEl.addEventListener("click", () => {
  revealLetter(dice2);
});

bothBtnEl.addEventListener("click", () => {
  revealLetter(bothDice);
});

resetBtnEl.addEventListener("click", init);

// ======================================================
// Cheat

titleCheatBtn.addEventListener("click", () => {
  //
  cheatSwitch = cheatSwitch ? false : true;
  console.log(cheatSwitch);
});

const cheat = () => {
  enableBtns(dice1BtnEl);
  enableBtns(dice2BtnEl);
  enableBtns(bothBtnEl);
  disableBtns(rollBtnEl);
  //============================================//
  dice1 = Math.trunc(Math.random() * 6 + 1);
  dice2 = Math.trunc(Math.random() * 6 + 1);
  bothDice = dice1 + dice2;
  if (bothDice > 9) bothDice = 0;
  console.log(`Og dice - ${dice1}/${dice2}/${bothDice}`);
  //============================================//
  // Check to see if number has already been found and replace if it has
  dice1BtnEl.src = `images/dice-${dice1}.png`;
  dice2BtnEl.src = `images/dice-${dice2}.png`;

  while (foundNumbers.includes(dice1) && foundNumbers.includes(dice2) && foundNumbers.includes(bothDice)) {
    foundNumbers.includes(dice1) ? (dice1 = Math.trunc(Math.random() * 6 + 1)) : dice1;
    foundNumbers.includes(dice2) ? (dice2 = Math.trunc(Math.random() * 6 + 1)) : dice2;
    // foundNumbers.includes(bothDice) ? (bothDice = Math.trunc(Math.random() * 9 + 1)) : bothDice;

    if (foundNumbers.includes(bothDice)) {
      dice1 = Math.trunc(Math.random() * 6 + 1);
      dice2 = Math.trunc(Math.random() * 6 + 1);
      bothDice = dice1 + dice2;
      if (bothDice > 9) bothDice = 0;
    }
    dice1BtnEl.src = `images/dice-${dice1}.png`;
    dice2BtnEl.src = `images/dice-${dice2}.png`;
    console.log(`New dice - ${dice1}/${dice2}/${bothDice} ---------------`);
  }
  checkDice(dice1, dice2, bothDice);
};

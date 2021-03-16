"use strict";

// Title
const titleH1 = document.querySelector(".title__h1");
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
// ============================================Vars===============================================
let dice1, dice2, bothDice, playing;
//================================================================================================
// Start
addEventListener(
  "load",
  function () {
    window.scrollTo(1, 0);
  },
  false
);

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
  foundNumbers = [0];
  enableBtns(dice1BtnEl);
  enableBtns(dice2BtnEl);
  enableBtns(bothBtnEl);
  enableBtns(rollBtnEl);

  disableBtns(dice1BtnEl);
  disableBtns(dice2BtnEl);
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
});

// Check Valid Dice Function
const checkDice = (dice1, dice2, bothDice) => {
  const dice = [dice1, dice2, bothDice];
  dice.forEach((dice, i) => {
    if (foundNumbers.includes(dice)) {
      if (i === 0) {
        disableBtns(dice1BtnEl);
      } else if (i === 1) {
        disableBtns(dice2BtnEl);
      } else if (i === 2) {
        disableBtns(bothBtnEl);
      }
    }
  });
  lostCheck();
};

// Win Check
const winCheck = () => {
  foundNumbers.length === 10 ? (titleH1.innerHTML = "WINNER!!") : (titleH1.innerHTML = "Playing");
};

// Lost Check
const lostCheck = () => {
  if (dice1 === dice2) {
    if (foundNumbers.includes(dice1) && foundNumbers.includes(bothDice)) {
      resetBtnEl.style.opacity = 100;
      resetBtnEl.disabled = false;
      titleH1.innerHTML = "GAME OVER";
    } else {
      titleH1.innerHTML = "Playing";
    }
  } else if (foundNumbers.includes(dice1) && foundNumbers.includes(dice2) && foundNumbers.includes(bothDice)) {
    resetBtnEl.style.opacity = 100;
    resetBtnEl.disabled = false;
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

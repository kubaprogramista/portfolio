/* eslint-disable linebreak-style */

const canvasArray = document.querySelectorAll('.scratch-box');
const canvasOverlay = 'png/game_png/overlay.png';
const resetButton = document.querySelector('.reset-game-button');
const gamesPlayed = document.querySelector('.games-played');
const title = document.querySelector('.game-title');
const gamesWon = document.querySelector('.games-won');
const balanceAmount = document.querySelector('.balance');

const planetsArray = [
  "url('png/game_png/uranus.png')",
  "url('png/game_png/neptune.png')",
  "url('png/game_png/saturn.png')",
  "url('png/game_png/venus.png')",
  "url('png/game_png/jupiter.png')",
  "url('png/game_png/mars.png')",
  "url('png/game_png/earth.png')",
  "url('png/game_png/moon.png')",
];

const dynamicPlanetCounter = {
  uranus: 0,
  neptune: 0,
  saturn: 0,
  venus: 0,
  jupiter: 0,
  mars: 0,
  earth: 0,
  moon: 0,
};

const prizeSystem = [22, 18, 14, 10, 8, 6, 4, 2];

let checkIfScratched = false;
let gameCount = 1;

function newGame() {
  let countScratches = 0;
  gamesPlayed.innerHTML = `${gameCount}`;
  gameCount += 1;
  canvasArray.forEach((canvas) => {
    canvas.addEventListener(
      'mouseover',
      () => {
        checkIfScratched = true;
        if (checkIfScratched) {
          countScratches += 1;
        }
        if (countScratches === 9) {
          setTimeout(() => {
            ifGameOver();
          }, 2000);
        }
      },
      { once: true }
    );
  });
  resetButton.classList.remove('active');
}
window.onload = newGame();

let gameWonCount = 0;
gamesWon.innerHTML = `${gameWonCount}`;

const gamePrice = 100;
let reward = 0;
let balance = 100;
balanceAmount.innerHTML = `${balance}`;

function ifGameOver() {
  let i = 0;
  let gameResult = false;
  for (const [, value] of Object.entries(dynamicPlanetCounter)) {
    if (value === 3) {
      gameResult = true;
      gameRewardHandler(prizeSystem[i], 1);
    } else if (value === 4) {
      gameResult = true;
      gameRewardHandler(prizeSystem[i], 2);
    } else if (value === 5) {
      gameResult = true;
      gameRewardHandler(prizeSystem[i], 4);
    } else if (value === 6) {
      gameResult = true;
      gameRewardHandler(prizeSystem[i], 10);
    }
    i += 1;
  }
  if (gameResult === true) {
    title.innerHTML = 'You Won!';
    gameWonCount += 1;
    gamesWon.innerHTML = `${gameWonCount}`;
  } else {
    title.innerHTML = 'You lost.';
  }
  resetButton.classList.add('active');
}

function gameRewardHandler(base, multiplier) {
  reward = gamePrice * base * multiplier;
  balance += reward;
  balanceAmount.innerHTML = `${balance}`;
}

function canvasHandler() {
  canvasArray.forEach((canvas) => {
    const ctx = canvas.getContext('2d');
    canvas.width = 150;
    canvas.height = 150;

    function scratcher(canvas, overlay) {
      canvas.mycanvas = canvas.getContext('2d');
      canvas.img = new Image();
      canvas.img.src = overlay;
      canvas.img.onload = function drawScratchers() {
        canvas.mycanvas.drawImage(this, 0, 0, canvas.width, canvas.height);
      };
    }

    function getBrushPosition(ctx, xReference, yReference) {
      const rectangleInfo = ctx.canvas.getBoundingClientRect();
      return {
        x: Math.floor(
          ((xReference - rectangleInfo.left) /
            (rectangleInfo.right - rectangleInfo.left)) *
            150
        ),
        y: Math.floor(
          ((yReference - rectangleInfo.top) /
            (rectangleInfo.bottom - rectangleInfo.top)) *
            150
        ),
      };
    }

    function drawDot(ctx, mouseX, mouseY) {
      const brushSize = 25;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, brushSize, 0, 2 * Math.PI);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fill();
    }

    canvas.addEventListener(
      'mousemove',
      (e) => {
        const brushPosition = getBrushPosition(ctx, e.clientX, e.clientY);
        drawDot(ctx, brushPosition.x, brushPosition.y);
      },
      false
    );
    window.onload = scratcher(canvas, canvasOverlay);
  });
}
window.onload = canvasHandler();

function randomPlanetsHandler() {
  canvasArray.forEach((canvas) => {
    const random = Math.floor(Math.random() * planetsArray.length);
    canvas.style.backgroundImage = planetsArray[random];

    switch (random) {
      case 0:
        dynamicPlanetCounter.uranus += 1;
        break;
      case 1:
        dynamicPlanetCounter.neptune += 1;
        break;
      case 2:
        dynamicPlanetCounter.saturn += 1;
        break;
      case 3:
        dynamicPlanetCounter.venus += 1;
        break;
      case 4:
        dynamicPlanetCounter.jupiter += 1;
        break;
      case 5:
        dynamicPlanetCounter.mars += 1;
        break;
      case 6:
        dynamicPlanetCounter.earth += 1;
        break;
      case 7:
        dynamicPlanetCounter.moon += 1;
        break;
      default:
        break;
    }
  });
}
window.onload = randomPlanetsHandler();

function dataReset() {
  dynamicPlanetCounter.uranus = 0;
  dynamicPlanetCounter.neptune = 0;
  dynamicPlanetCounter.saturn = 0;
  dynamicPlanetCounter.venus = 0;
  dynamicPlanetCounter.jupiter = 0;
  dynamicPlanetCounter.mars = 0;
  dynamicPlanetCounter.earth = 0;
  dynamicPlanetCounter.moon = 0;
}

/*
RESET GAME
*/

resetButton.addEventListener('click', () => {
  canvasHandler();
  newGame();

  dataReset();
  randomPlanetsHandler();
  balance -= 100;
  balanceAmount.innerHTML = `${balance}`;
  title.innerHTML = 'Scratch Cards!';
});

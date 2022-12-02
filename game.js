const canvasArray = document.querySelectorAll('.scratch-box');
const canvasOverlay = "png/game_png/overlay.png";

const planetsArray = [
    "url('png/game_png/neptune.png')",
    "url('png/game_png/jupiter.png')",
    "url('png/game_png/earth.png')",
    "url('png/game_png/saturn.png')",
];

let dynamicPlanetCounter = {
    "neptune": 0,
    "jupiter": 0,
    "earth": 0,
    "saturn": 0,
}

function randomPrizes() {
    canvasArray.forEach(canvas => {
        let random = Math.floor(Math.random() * (planetsArray.length));
        canvas.style.backgroundImage = planetsArray[random];

        switch (random) {
            case 0:
                dynamicPlanetCounter.neptune++;
                break;
            case 1:
                dynamicPlanetCounter.jupiter++;
                break;
            case 2:
                dynamicPlanetCounter.earth++;
                break;
            case 3:
                dynamicPlanetCounter.saturn++;
                break;
        }
    });
}
window.onload = randomPrizes();

let checkIfScratched = false;
let countScratches = 0; 

const title = document.querySelector('.game-title');

function newGame() {
    canvasArray.forEach(canvas => {
        canvas.addEventListener('mouseover', () => {
            setTimeout(() => {
                checkIfScratched = true;
                if(checkIfScratched) {
                    countScratches++;
                }
                if(countScratches === 9){
                    ifGameOver();
                }
            }, 2000);
        }, {once : true})
    });

}

window.onload = newGame();

const gamesPlayed = document.querySelector('.games-played');
const gamesWon = document.querySelector('.games-won');
let gameResult = 0;
let gameCount = 1;
let gameWonCount = 0;

gamesPlayed.innerHTML = `${gameCount}`;

function ifGameOver() {
    gamesPlayed.innerHTML = `${gameCount}`;
    for(const numberOfPlanets in dynamicPlanetCounter){
        if(dynamicPlanetCounter[numberOfPlanets] >= 4) {
            gameResult = 1;
        } else {
            gameResult = 0;
        }
    }
    if(gameResult === 1){
        title.innerHTML = "You Won!";
        gameWonCount++;
        gamesWon.innerHTML = `${gameWonCount}`;
    } else {
        title.innerHTML = "You lost.";
    }
}

function canvasHandler() {
    canvasArray.forEach(canvas => {
        let ctx = canvas.getContext('2d');
        canvas.width = 150;
        canvas.height = 150;
    
        function scratcher(canvas, overlay){
            canvas.mycanvas = canvas.getContext('2d');
            canvas.img = new Image();
            canvas.img.src = overlay;
            canvas.img.onload = function(){
                canvas.mycanvas.drawImage(this, 0,0, canvas.width, canvas.height);
            }
        }
    
        function getBrushPosition(ctx, xReference, yReference){
            let rectangleInfo = (ctx.canvas).getBoundingClientRect();
            return {
                x: Math.floor((xReference-rectangleInfo.left)/(rectangleInfo.right-rectangleInfo.left)*150),
                y: Math.floor((yReference-rectangleInfo.top)/(rectangleInfo.bottom-rectangleInfo.top)*150)
            }
        };
        
        function drawDot(ctx, mouseX, mouseY) {
            let brushSize = 25;
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, brushSize, 0, 2*Math.PI);
            ctx.globalCompositeOperation = "destination-out";
            ctx.fill();
        }
        
        canvas.addEventListener('mousemove', (e) => {
            let brushPosition = getBrushPosition(ctx, e.clientX, e.clientY);
            drawDot(ctx, brushPosition.x, brushPosition.y);
        }, false);
        window.onload = scratcher(canvas, canvasOverlay);
    });
}

window.onload = canvasHandler();

/* 
RESET GAME
*/

const resetButton = document.querySelector('.reset-game-button');

resetButton.addEventListener('click', () => {
    gameCount++;
    canvasHandler();
    randomPrizes();
    newGame();
    ifGameOver();
    title.innerHTML = "Scratch Cards!";
});
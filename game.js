const canvasArray = document.querySelectorAll('.scratch-box');
const canvasOverlay = "png/game_png/overlay.png";
const resetButton = document.querySelector('.reset-game-button');
const gamesPlayed = document.querySelector('.games-played');
const title = document.querySelector('.game-title');
const gamesWon = document.querySelector('.games-won');

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

let dynamicPlanetCounter = {
    "uranus": 0,
    "neptune": 0,
    "saturn": 0,
    "venus": 0,
    "jupiter": 0,
    "mars": 0,
    "earth": 0,
    "moon": 0,
}

function randomPrizes() {
    canvasArray.forEach(canvas => {
        let random = Math.floor(Math.random() * (planetsArray.length));
        canvas.style.backgroundImage = planetsArray[random];

        switch (random) {
            case 0:
                dynamicPlanetCounter.uranus++;
                break;
            case 1:
                dynamicPlanetCounter.neptune++;
                break;
            case 2:
                dynamicPlanetCounter.saturn++;
                break;
            case 3:
                dynamicPlanetCounter.venus++;
                break;
            case 4:
                dynamicPlanetCounter.jupiter++;
                break;
            case 5:
                dynamicPlanetCounter.mars++;
                break;
            case 6:
                dynamicPlanetCounter.earth++;
                break;
            case 7:
                dynamicPlanetCounter.moon++;
                break;
        }
    });
}
window.onload = randomPrizes();

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

let checkIfScratched = false;
let gameCount = 1;

function newGame() {
    let countScratches = 0; 
    gamesPlayed.innerHTML = `${gameCount}`;
    gameCount++;
    canvasArray.forEach(canvas => {
        canvas.addEventListener('mouseover', () => {
            checkIfScratched = true;
            if(checkIfScratched) {
                countScratches++;
            }
            if(countScratches === 9){
                setTimeout(() => {
                    ifGameOver();
                }, 2000);
            }
        }, {once : true})
    });
    resetButton.classList.remove("active");
}
window.onload = newGame();

let gameWonCount = 0;
gamesWon.innerHTML = `${gameWonCount}`;

function ifGameOver() {
    let gameResult = false;
    for(const numberOfPlanets in dynamicPlanetCounter){
        //specify number of planets to win a game
        if(dynamicPlanetCounter[numberOfPlanets] >= 3) {
            //game won
            gameResult = true;
        } else {
            //game lost
        }
    }
    if(gameResult === true){
        title.innerHTML = "You Won!";
        gameWonCount++;
        gamesWon.innerHTML = `${gameWonCount}`;
    } else {
        title.innerHTML = "You lost.";
    }
    resetButton.classList.add("active");
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

resetButton.addEventListener('click', () => {
    canvasHandler();
    newGame();

    dataReset();
    randomPrizes();
    title.innerHTML = "Scratch Cards!";
});
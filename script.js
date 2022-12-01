/*
DESKTOP ICONS HANDLER
*/

const allIconsHandler = (icons) => {
    icons.forEach(icon => {
        if(icon.style.filter == "opacity(0%)"){
            icon.style.cursor = "pointer";
            icon.style.filter = "opacity(100%)";
            setTimeout(() => {
                icon.style.transform = "scale(100%)";
            }, 100);
        } else {
            icon.style.cursor = "default";
            icon.style.filter = "opacity(0%)";
            setTimeout(() => {
                icon.style.transform = "scale(0%)";
            }, 100);
        }
    });
}

/*
OPENING FILES / CLOSING FILES
*/

const openFunction = (section, icon, closeBtn) => {
    allIconsHandler(allIcons);
    section.style.transform = "scale(100%)";

    closeBtn.style.cursor = "pointer";
}

const closeFunction = (section, icon, closeBtn) => {
    allIconsHandler(allIcons);
    section.style.transform = "scale(0%)";

    closeBtn.style.cursor = "default";
}

/*
>>>>>>FUNCTION CALLS FOR ICONS / WINDOWS
*/

/*
ABOUT ME CALL
*/

const allIcons = document.querySelectorAll(".desktop-file-container");
const aboutSection = document.querySelector(".about-section");
const closeAboutBtn = document.querySelector(".close-about-section");
const aboutMeIcon = document.querySelector("#about-me-icon");

aboutMeIcon.addEventListener('click', function () {
    openFunction(aboutSection, aboutMeIcon, closeAboutBtn);
});


closeAboutBtn.addEventListener('click', function () {
    closeFunction(aboutSection, aboutMeIcon, closeAboutBtn);
});

/*
ABOUT ME IMG
*/

const imgContainer = document.querySelector(".image-container");
const closeImg = document.querySelector("#close-img");
const imgIcon = document.querySelector(".image-icon-container");
let isImgOpen = false;

imgIcon.addEventListener('click', () => {
    isImgOpen = true;
    imgContainer.style.transform = "scale(100%)";
    imgContainer.style.filter = "opacity(100%)";
    imgIcon.style.filter = "opacity(0%)";
    
    imgIcon.style.cursor = "default";
    closeImg.style.cursor = "pointer";
})

closeImg.addEventListener('click', () => {
    isImgOpen = false;
    imgContainer.style.transform = "scale(0%)";
    
    imgIcon.style.filter = "opacity(100%)";
    imgIcon.style.cursor = "pointer";
    closeImg.style.cursor = "default";
})

/*
CONTACT FORM CALL
*/

const contactSection = document.querySelector(".form-container");
const contactBtn = document.querySelector(".contact-btn");
const closeContact = document.querySelector("#close-contact-form"); 
const thankYouText = document.querySelector(".thank-you-text");

contactBtn.addEventListener('click', () => {
    contactSection.style.transform = "scale(100%)";
    contactSection.style.filter = "opacity(100%)";
    imgIcon.style.filter = "opacity(0%)";
    imgIcon.style.transform = "scale(0%)";

    closeContact.style.cursor = "pointer";

    if(isImgOpen == true) {
        imgContainer.style.transform = "scale(0%)";
        imgIcon.style.transform = "scale(0%)";
        
        imgIcon.style.filter = "opacity(100%)";
        imgIcon.style.cursor = "pointer";
        isImgOpen = false;
    }
})

closeContact.addEventListener('click', () => {
    contactSection.style.transform = "scale(0%)";
    imgIcon.style.filter = "opacity(100%)";
    imgIcon.style.transform = "scale(100%)";

    closeContact.style.cursor = "default";
})

/*
THANK YOU NOTIFICATION
*/

const sendBtn = document.querySelector(".send-btn");
const contactInputs = document.querySelectorAll(".contact-input");

sendBtn.addEventListener('click', () => {
    let x = 0;
    contactInputs.forEach(input => {
        if(input.value === ""){
            
        } else {
            x++;
        }
    });
    if(x === 3){
        thankYouText.style.transform = "scale(100%)";
        thankYouText.style.filter = "opacity(100%)";
    }
})

/*
PROJECTS CALL
*/

const projectsSection = document.querySelector('.projects-section');
const closeProjects = document.querySelector('.close-projects-section');
const projectsIcon = document.querySelector('#projects-icon');

projectsIcon.addEventListener('click', function () {
    openFunction(projectsSection, projectsIcon, closeProjects);
});


closeProjects.addEventListener('click', function () {
    closeFunction(projectsSection, projectsIcon, closeProjects);
});

const gameSection = document.querySelector(".game-section");
const closeGameBtn = document.querySelector(".close-game-section");
const gameIcon = document.querySelector("#game-icon");

gameIcon.addEventListener('click', function () {
    openFunction(gameSection, gameIcon, closeGameBtn);
});


closeGameBtn.addEventListener('click', function () {
    closeFunction(gameSection, gameIcon, closeGameBtn);
});


/*
GAME
*/
const canvasArray = document.querySelectorAll('.scratch-box');
const canvasOverlay = "png/game_png/overlay.png";

const overlayArray = [
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
        let random = Math.floor(Math.random() * (overlayArray.length));
        canvas.style.backgroundImage = overlayArray[random];

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

let gameResult = 0;

function ifGameOver() {
    for(const numberOfPlanets in dynamicPlanetCounter){
        if(dynamicPlanetCounter[numberOfPlanets] >= 3) {
            gameResult = 1;
        }
    }
    title.innerHTML = "You Won!";
}

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

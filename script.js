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

closeImg.addEventListener('click', () => {
    imgContainer.style.transform = "scale(0%)";
    
    imgIcon.style.filter = "opacity(100%)";
    imgIcon.style.cursor = "pointer";
})

imgIcon.addEventListener('click', () => {
    imgContainer.style.transform = "scale(100%)";
    imgContainer.style.filter = "opacity(100%)";
    imgIcon.style.filter = "opacity(0%)";
    
    imgIcon.style.cursor = "pointer";
    closeImg.style.cursor = "pointer";
})

/*
CONTACT FORM CALL
*/

const contactSection = document.querySelector(".form-container");
const contactBtn = document.querySelector(".contact-btn");
const closeContact = document.querySelector("#close-contact-form");

contactBtn.addEventListener('click', () => {
    contactSection.style.transform = "scale(100%)";
    contactSection.style.filter = "opacity(100%)";
    imgIcon.style.filter = "opacity(0%)";
    setTimeout(() => {
        imgIcon.style.transform = "scale(0%)";
    }, 1000);
})

closeContact.addEventListener('click', () => {
    contactSection.style.transform = "scale(0%)";
    imgIcon.style.filter = "opacity(100%)";
    imgIcon.style.transform = "scale(100%)";
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
const allIcons = document.querySelectorAll(".desktop-file-container");
const aboutSection = document.querySelector(".about-section");
const closeAboutBtn = document.querySelector(".close-about-section");
const aboutMeIcon = document.querySelector("#about-me-icon");
const imgContainer = document.querySelector(".image-container");
const closeImg = document.querySelector("#close-img");
const imgIcon = document.querySelector(".image-icon-container");
const contactSection = document.querySelector(".form-container");
const contactBtn = document.querySelector(".contact-btn");
const closeContact = document.querySelector("#close-contact-form");
const thankYouText = document.querySelector(".thank-you-text");
const sendBtn = document.querySelector(".send-btn");
const contactInputs = document.querySelectorAll(".contact-input");
const projectsSection = document.querySelector(".projects-section");
const closeProjects = document.querySelector(".close-projects-section");
const projectsIcon = document.querySelector("#projects-icon");
const gameSection = document.querySelector(".game-section");
const closeGameBtn = document.querySelector(".close-game-section");
const gameIcon = document.querySelector("#game-icon");
const projectsText = document.querySelectorAll(".project-text");

/*
DESKTOP ICONS HANDLER
*/

const allIconsHandler = (icons) => {
  icons.forEach((icon) => {
    const iconCopy = icon;
    if (iconCopy.style.filter === "opacity(0%)") {
      iconCopy.style.cursor = "pointer";
      iconCopy.style.filter = "opacity(100%)";
      setTimeout(() => {
        iconCopy.style.transform = "scale(100%)";
      }, 100);
    } else {
      iconCopy.style.cursor = "default";
      iconCopy.style.filter = "opacity(0%)";
      setTimeout(() => {
        iconCopy.style.transform = "scale(0%)";
      }, 100);
    }
  });
};

/*
OPENING FILES / CLOSING FILES
*/

const open = (section, icon, closeBtn) => {
  const sectionCopy = section;
  const closeBtnCopy = closeBtn;
  allIconsHandler(allIcons);
  sectionCopy.style.transform = "scale(100%)";

  closeBtnCopy.style.cursor = "pointer";
};

const close = (section, icon, closeBtn) => {
  const sectionCopy = section;
  const closeBtnCopy = closeBtn;
  allIconsHandler(allIcons);
  sectionCopy.style.transform = "scale(0%)";

  closeBtnCopy.style.cursor = "default";
};

/*
ABOUT ME CALL
*/

aboutMeIcon.addEventListener("click", () => {
  open(aboutSection, aboutMeIcon, closeAboutBtn);
});

closeAboutBtn.addEventListener("click", () => {
  close(aboutSection, aboutMeIcon, closeAboutBtn);
});

/*
ABOUT ME IMG
*/

let isImgOpen = false;

imgIcon.addEventListener("click", () => {
  isImgOpen = true;
  imgContainer.style.transform = "scale(100%)";
  imgContainer.style.filter = "opacity(100%)";
  imgIcon.style.filter = "opacity(0%)";

  imgIcon.style.cursor = "default";
  closeImg.style.cursor = "pointer";
});

closeImg.addEventListener("click", () => {
  isImgOpen = false;
  imgContainer.style.transform = "scale(0%)";

  imgIcon.style.filter = "opacity(100%)";
  imgIcon.style.cursor = "pointer";
  closeImg.style.cursor = "default";
});

/*
CONTACT FORM CALL
*/

contactBtn.addEventListener("click", () => {
  contactSection.style.transform = "scale(100%)";
  contactSection.style.filter = "opacity(100%)";
  imgIcon.style.filter = "opacity(0%)";
  imgIcon.style.transform = "scale(0%)";

  closeContact.style.cursor = "pointer";

  if (isImgOpen === true) {
    imgContainer.style.transform = "scale(0%)";
    imgIcon.style.transform = "scale(0%)";

    imgIcon.style.filter = "opacity(100%)";
    imgIcon.style.cursor = "pointer";
    isImgOpen = false;
  }
});

closeContact.addEventListener("click", () => {
  contactSection.style.transform = "scale(0%)";
  imgIcon.style.filter = "opacity(100%)";
  imgIcon.style.transform = "scale(100%)";

  closeContact.style.cursor = "default";
});

/*
THANK YOU NOTIFICATION
*/

sendBtn.addEventListener("click", () => {
  let x = 0;
  contactInputs.forEach((input) => {
    if (input.value !== "") {
      x += 1;
    }
  });
  if (x === 3) {
    thankYouText.style.transform = "scale(100%)";
    thankYouText.style.filter = "opacity(100%)";
  }
});

/*
PROJECTS CALL
*/

projectsIcon.addEventListener("click", () => {
  open(projectsSection, projectsIcon, closeProjects);
  setTimeout(() => {
    projectsText.forEach((text) => {
      text.classList.add("active");
    });
  }, 300);
});

closeProjects.addEventListener("click", () => {
  close(projectsSection, projectsIcon, closeProjects);
  setTimeout(() => {
    projectsText.forEach((text) => {
      text.classList.remove("active");
    });
  }, 300);
});

gameIcon.addEventListener("click", () => {
  open(gameSection, gameIcon, closeGameBtn);
});

closeGameBtn.addEventListener("click", () => {
  close(gameSection, gameIcon, closeGameBtn);
});

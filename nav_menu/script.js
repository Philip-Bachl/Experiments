const navButton = document.querySelector(".nav-button");
const navList = document.querySelector("nav > ul");

let navOpen = false;

navButton.addEventListener("click", () => {
    navOpen = !navOpen;
    if (navOpen) {
        return navList.classList.add("open");
    }
    navList.classList.remove("open");
});
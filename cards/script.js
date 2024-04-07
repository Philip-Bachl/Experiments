const rollButton = document.querySelector("#roll");

const cards = document.querySelectorAll(".card")

rollButton.addEventListener("click", e => {
    cards.forEach(c => {
        const number = Math.floor(Math.random() * 10);

        c.querySelector(".top").innerText = number;
        c.querySelector(".bottom").innerText = number;
        c.querySelector(".main").innerText = number;
    });
});
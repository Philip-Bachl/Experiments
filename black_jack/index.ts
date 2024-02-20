import { Game } from "./lib/game";
import { Card, CardColor, CardType } from "./lib/card";

const helpText = `
    help: shows this page, duh
    list: lists cards
    exit: exits the program
    start: starts the game with one deck
    end: ends the game
    show: shows the percentage of a card specified with
          show /^10|[2-9jqka]$/ /^[shdc]$/
`;

let game;

console.log("awaiting input...");

// TODO add the remove command
// TODO add the add deck command

inputLoop:
for await (const line of console) {
    const words = line.split(" ");
    if (words.length < 1) continue;
    
    switch (words[0]) {
        case "help":
            console.log(helpText);
            break;
        case "list":
            if (!game) break;
            console.log(game.activeCards);
            break;
        case "exit":
            break inputLoop;
        case "start":
            console.log("starting game...");
            game = new Game();
            break;
        case "end":
            console.log("ending game...");
            game = null;
            break;
        case "show":
            if (!game) {
                console.log("no game started");
                break;
            }

            words.shift();
            console.log((game.probabilityOf(Card.fromConsoleArguments(words)) * 100) + "%");
    }

    console.log("awaiting input...");
}

console.log("exiting...");
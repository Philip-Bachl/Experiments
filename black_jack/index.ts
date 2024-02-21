import { Game } from "./lib/game";
import { Card, CardColor, CardType } from "./lib/card";

const helpText = `
    help: shows this page, duh
    list: lists cards
    exit: exits the program
    start: starts the game with one deck
    add: adds a deck
    remove: remove card specified with /^10|[2-9jqka]$/ /^[shdc]$/
    end: ends the game
    show: shows the percentages of all cards
`;

let game;

console.log("awaiting input...");

// TODO add the remove command
// TODO add the add deck command

inputLoop:
for await (const line of console) {
    const words = line.split(" ");
    if (words.length < 1) continue;
    let card;
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
        case "add":
            if (!game) {
                console.log("no game started");
                break;
            }

            game.addDeck();
            console.log("deck added");
            
            break;
        case "remove":
            if (!game) {
                console.log("no game started");
                break;
            }
            words.shift();
            card = Card.fromConsoleArguments(words);
            if (!card) break;
            game.removeCard(card);
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

            for (let i = CardType.TWO; i <= CardType.ACE; i++) {
                console.log(CardType[i] + ": " + prepareProbability(game.probabilityOf(i) * 100));
            }
    }

    console.log("awaiting input...");
}

console.log("exiting...");
process.exit();

function prepareProbability(value: number) {
    return (Math.floor(value * 10000) / 10000) + "%";
}
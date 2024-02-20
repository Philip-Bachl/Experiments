import { Card, CardColor, CardType } from "./card";

class Game {
    public activeCards: Card[] = [];

    public constructor() {
        this.addDeck();
    }

    public removeCard(card: Card) {
        this.activeCards = this.activeCards.filter(card.equals);
    }

    public addDeck() {
        for (let t = CardType.TWO; t <= CardType.ACE; t++) {
            for (let c = CardColor.SPADES; c <= CardColor.CLUBS; c++) {
                this.activeCards.push(new Card(t, c));
            }
        }
    }

    public probabilityOf(card: Card | null): number {
        if (!card) return -1;
        
        let winCardCount = this.activeCards.filter(c => card.equals(c)).length;
        let totalCardCount = this.activeCards.length;

        return Math.floor((winCardCount / totalCardCount) * 10000) / 10000;
    }
}

export { Game }
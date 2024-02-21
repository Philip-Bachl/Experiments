import { Card, CardColor, CardType } from "./card";

class Game {
    public activeCards: Card[] = [];

    public constructor() {
        this.addDeck();
    }

    public removeCard(card: Card) {
        const index = this.activeCards.findIndex(c => c.equals(card));

        if (index < 0) {
            console.log("could not find card in deck");
        }
        
        this.activeCards.splice(index, 1);
    }

    public addDeck() {
        for (let t = CardType.TWO; t <= CardType.ACE; t++) {
            for (let c = CardColor.SPADES; c <= CardColor.CLUBS; c++) {
                this.activeCards.push(new Card(t, c));
            }
        }
    }

    public probabilityOf(cardType: CardType): number {
        let winCardCount = this.activeCards.filter(c => c.type == cardType).length;
        let totalCardCount = this.activeCards.length;

        return winCardCount / totalCardCount;
    }
}

export { Game }
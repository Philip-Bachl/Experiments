enum CardType {
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING,
    ACE
}

enum CardColor {
    SPADES,
    HEARTS,
    DIAMONDS,
    CLUBS
}

class Card {
    public static fromConsoleArguments(args: string[]): Card | null {
        if (args.length < 2) return null;
        
        if (!/^10|[2-9jqka]$/.test(args[0])) return null;
        if (!/^[shdc]$/.test(args[1])) return null;
    
        let type;
        let color;
        
        switch (args[0]) {
            case "2":
                type = CardType.TWO;
                break;
            case "3":
                type = CardType.THREE;
                break;
            case "4":
                type = CardType.FOUR;
                break;
            case "5":
                type = CardType.FIVE;
                break;
            case "6":
                type = CardType.SIX;
                break;
            case "7":
                type = CardType.SEVEN;
                break;
            case "8":
                type = CardType.EIGHT;
                break;
            case "9":
                type = CardType.NINE;
                break;
            case "10":
                type = CardType.TEN;
                break;
            case "j":
                type = CardType.JACK;
                break;
            case "q":
                type = CardType.QUEEN;
                break;
            case "k":
                type = CardType.KING;
                break;
            default:
                type = CardType.ACE;
        }
    
        switch (args[1]) {
            case "s":
                color = CardColor.SPADES;
                break;
            case "h":
                color = CardColor.HEARTS;
                break;
            case "d":
                color = CardColor.DIAMONDS;
                break;
            default:
                color = CardColor.CLUBS;
        }

        return new Card(type, color);
    }

    public constructor(public type: CardType, public color: CardColor) {}

    public equals(card: Card) {
        return card.color == this.color && card.type == this.type;
    }

}

export { Card, CardColor, CardType };
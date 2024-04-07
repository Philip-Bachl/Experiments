class ExpectationBuilder<T> {
    constructor(private thisThing: T) {}

    public toBeEqualTo(thatThing: T): TestResult {
        return this.thisThing === thatThing;
    }

    public toBeGreaterThan(thatThing: T): TestResult {
        return this.thisThing > thatThing;
    }
    public toBeLesserThan(thatThing: T): TestResult {
        return this.thisThing < thatThing;
    }
}

function expect<T>(thisThing: T): ExpectationBuilder<T> {
    return new ExpectationBuilder<T>(thisThing);
}
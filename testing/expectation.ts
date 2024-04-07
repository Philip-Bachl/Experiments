class TestResult<T> {
    public value: T | null;

    constructor(value: T | null) {
        this.value = value;
    }
}

class ExpectationBuilder<T> {
    constructor(private thisThing: T) {}

    public toBeEqualTo(thatThing: T): TestResult<T> {
        if (this.thisThing === thatThing) {
            return new TestResult<T>(null);
        }
        return new TestResult<T>(this.thisThing);
    }

    public toBeGreaterThan(thatThing: T): TestResult<T> {
        if (this.thisThing > thatThing) {
            return new TestResult<T>(null);
        }
        return new TestResult<T>(this.thisThing);
    }

    public toBeLesserThan(thatThing: T): TestResult<T> {
        if (this.thisThing < thatThing) {
            return new TestResult<T>(null);
        }
        return new TestResult<T>(this.thisThing);
    }
}

function expect<T>(thisThing: T): ExpectationBuilder<T> {
    return new ExpectationBuilder<T>(thisThing);
}

export { TestResult, ExpectationBuilder, expect };
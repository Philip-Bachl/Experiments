class Tests {
    private static _tests: Test[] = [];

    public static successTests: Test[] = [];
    public static falureTests: Test[] = [];

    public static beforeEach = () => {};
    
    public static register(title: string, testFunction: TestFunction) {
        this._tests.push(new Test(title, testFunction));
    }

    public static run() {
        this.execute();
        this.print();
    }

    private static execute(): void {
        this._tests.forEach(test => {
            const testResult = test.callback();
            
            if (testResult) {
                test.state = TestState.SUCCESS;
                this.successTests.push(test);
                return;
            }

            test.state = TestState.FALURE;
            this.falureTests.push(test);
        });
    }

    private static print(): void {
        if (this._tests.length == 0) return console.log("No Tests Where Executed");

        console.log(`${this._tests.length} Tests Executed:`);
        
        console.log(`    ${this.successTests.length} succeeded (${this.successTests.length * 100 / this._tests.length}%)`);
        console.log(`    ${this.falureTests.length} failed (${this.falureTests.length * 100 / this._tests.length}%)`);
    }
}
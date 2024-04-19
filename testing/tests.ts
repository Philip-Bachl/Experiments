import { Test, TestFunction, TestState } from "./test";

class Tests {
    private static _tests: Test<unknown>[] = [];

    public static successTests: Test<unknown>[] = [];
    public static falureTests: Test<unknown>[] = [];

    public static beforeEach = () => {};
    
    public static register<T>(title: string, testFunction: TestFunction<T>) {
        this._tests.push(new Test(title, testFunction));
    }

    public static run() {
        this.execute();
        this.print();
    }

    private static execute(): void {
        this._tests.forEach(test => {
            this.beforeEach();
            const testResult = test.callback().value;

            if (testResult) {
                test.state = TestState.FALURE;            
                this.falureTests.push(test);
                return;
            }

            test.state = TestState.SUCCESS;
            this.successTests.push(test);
        });
    }

    private static print(): void {
        if (this._tests.length == 0) return console.info("No Tests Where Executed");

        if (this.falureTests.length > 0) console.error("The following Tests failed Execution: ")
        for (let i = 0; i < this.falureTests.length; i++) {
            console.error(`${i + 1} "${this.falureTests[i].title}"`);
        }

        console.log();

        console.info(`${this._tests.length} Test(s) Executed:`);
        console.info(`    ${this.successTests.length} succeeded (${this.successTests.length * 100 / this._tests.length}%)`);
        if (this.falureTests.length > 0) {
            console.error(`    ${this.falureTests.length} failed (${this.falureTests.length * 100 / this._tests.length}%)`);
            return;
        }
        console.info(`    ${this.falureTests.length} failed (${this.falureTests.length * 100 / this._tests.length}%)`);
    }
}

export { Tests };
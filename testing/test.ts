import { TestResult } from "./expectation";

enum TestState {
    NOT_EXECUTED = -2,
    EXECUTING = -1,
    SUCCESS = 0,
    FALURE = 1
}

type TestFunction<T> = () => TestResult<T>;

class Test<T> {
    private _title: string;
    private _callback: TestFunction<T>;

    public get title(): string { return this._title };
    public get callback(): TestFunction<T> { return this._callback };

    public state: TestState = TestState.NOT_EXECUTED;

    constructor(title: string, callback: TestFunction<T>) {
        this._title = title;
        this._callback = callback;
    }
}

export { TestState, TestFunction, Test };
enum TestState {
    NOT_EXECUTED = -2,
    EXECUTING = -1,
    SUCCESS = 0,
    FALURE = 1
}

type TestResult = boolean;
type TestFunction = () => TestResult;

class Test {
    private _title: string;
    private _callback: () => boolean;

    public get title(): string { return this._title };
    public get callback(): () => boolean { return this._callback };

    public state: TestState = TestState.NOT_EXECUTED;

    constructor(title: string, callback: () => boolean) {
        this._title = title;
        this._callback = callback;
    }
}
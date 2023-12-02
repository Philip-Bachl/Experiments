/*const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");*/

const number = useState();

number.subscribe(data => {
    console.log(data);
});

number.set(5);
number.set(2);
number.set(1);
number.set(10);

function useState() {
    let data = null;
    let subscribers = [];

    let state = {
        set(value) {
            data = value;
            subscribers.forEach(func => func(data));
            return this.data;
        },
        get() {
            return this.data;
        },
        subscribe(func) {
            subscribers.push(func);
        }
    }

    return state;
}
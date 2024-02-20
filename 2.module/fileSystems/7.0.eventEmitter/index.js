const EventEmitter = require("events");
const myEmitter = new EventEmitter()

const MyEvents = Object.freeze({
    TEST: 'TEST'
})
// runs every time the event `test` is emitted
myEmitter.on(MyEvents.TEST, (num) => {
    console.log(`Hello from ${num}`)
})

// runs only once
myEmitter.once(MyEvents.TEST, (num) => {
    console.log(`Hello once from ${num}`)
})

let num = 0;
for (var i in Array(10).fill(num++)) {
    myEmitter.emit(MyEvents.TEST, i)
}
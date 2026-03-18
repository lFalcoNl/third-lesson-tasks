import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

console.log('1. Synchronous start');

// process.nextTick – виконується **перед всім іншим**, після поточної синхронної фази
// В Node.js process.nextTick має вищий пріоритет ніж Promise (microtasks), але тут є тонкість через ES Module / Node версію.
// У CommonJS (require) process.nextTick завжди йде перед Promise, у ES Modules порядок може виглядати інакше.
process.nextTick(() => {
    console.log('2. process.nextTick');
});

// Promise.resolve().then(...) – microtask, виконується після синхронного коду
Promise.resolve().then(() => {
    console.log('3. Promise microtask');
});


// setTimeout – timers phase
setTimeout(() => {
    console.log('4. setTimeout (0 ms)');
}, 0);

// setImmediate – check phase, після I/O
setImmediate(() => {
    console.log('5. setImmediate');
});

// I/O simulation
fs.readFile(__filename, () => {
    console.log('6. fs.readFile callback (I/O)');

  // всередині I/O можна додати ще
    setTimeout(() => {
        console.log('7. setTimeout inside I/O callback');
    }, 0);

    setImmediate(() => {
        console.log('8. setImmediate inside I/O callback');
    });

    process.nextTick(() => {
        console.log('9. process.nextTick inside I/O callback');
    });

    Promise.resolve().then(() => {
        console.log('10. Promise inside I/O callback');
    });
});

console.log('1. Synchronous end');


// Фази Event Loop, які видно тут:

//     Timers → setTimeout, setInterval

//     Pending I/O callbacks → callback від fs, net, http

//     Idle, prepare → внутрішні Node.js фази

//     Poll → обробка I/O

//     Check → setImmediate

//     Close callbacks → socket.on('close')

//     Microtasks / nextTick:

//          process.nextTick виконується до Promises

//          Promise.then виконується після синхронного коду і nextTick

// Цей код чітко показує, як Node.js чергує:

//      синхронний код

//      microtasks (process.nextTick + Promises)

//      timers (setTimeout)

//      check phase (setImmediate)

//      I/O callbacks
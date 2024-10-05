console.log("Process begin");

setTimeout(() => {
    console.log("Executed 2");
}, 2000);

setTimeout(() => {
    console.log("Executed 1");
}, 0);

console.log("Process end");
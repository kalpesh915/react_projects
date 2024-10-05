let x = 10;
let y = 20;

setTimeout(()=>{
    y = 50;
}, 2000);

let z = x + y;

console.log(z);
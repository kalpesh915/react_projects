let x = 10;
let y = 20;

let myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(50);
  }, 2000);
});

myPromise.then((data)=>{
    y = data;
    z = x + y;
    console.log(z);
}, (err)=>{
    console.log("Error is ",err);
});
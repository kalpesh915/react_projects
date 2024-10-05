// timeout_vs_immediate.js

setImmediate(() => {
  console.log("immediate");
});

setTimeout(() => {
  console.log("timeout");
});

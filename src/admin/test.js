function either(a, b) {
  if (!a && !b) {
    return "Either a or b must be provided";
  }
  return console.log(a, b);
}

function both(a, b) {
  if (!a || !b) {
    return "Both a and b must be provided";
  }
  return console.log(a, b);
}

// let username = "davr0n";
// let email = "xzero1119@gmail.com";
let b = "world";
let a = "hello";
// either(a, b);
both(a, b);

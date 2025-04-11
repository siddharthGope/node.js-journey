const fs = require("fs");
const os = require("os");

console.log(os.cpus().length);

//sync
// fs.writeFileSync("./test.txt", "hello world");

// async
// fs.writeFile("./test.txt", "Hello world async", (err) => {});

// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

// fs.readFile("./contacts.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log(result);
//   }
// });

// fs.appendFileSync("./test.txt", new Date().toString());
// fs.appendFileSync("./test.txt", `This is a new line\n`);

// Blocking

// console.log(1);
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);
// console.log(2);

// Non Blocking request
// console.log(1);
// fs.readFile("./contacts.txt", "utf-8", (err, result) => {
//   console.log(result);
// });

// console.log(2);

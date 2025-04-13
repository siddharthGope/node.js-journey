const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("GET request to the homepage");
});

app.get("/books", (req, res) => {
  return res.send(req.query.name);
});

// function myHandler(req, res) {
//   if (req.url === "/favicon.ico") {
//     return res.end();
//   }
//   const log = `${Date.now()} ${req.url}: New req received\n`;

//   const myURL = url.parse(req.url, true);
//   console.log(myURL);

//   fs.appendFile("log.txt", log, (err, data) => {
//     switch (myURL.pathname) {
//       case "/":
//         res.end("This is homepage");
//         break;
//       case "/dodo":
//         const qp = myURL.query.myname;
//         res.end(`Hi ${qp}`);
//         break;
//       default:
//         res.end("404 not found");
//         break;
//     }
//   });
// }

app.listen(8000, () => console.log("Server started!"));

const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log("Server started!"));

const express = require("express");
const http = require("http");
const client = require("./db");
var policy = require("./routes/policy");
var app = express();
const cors = require("cors");
var corsOptions = {
    origin: "http://localhost:3000"
  };
app.use(cors(corsOptions));
app.use("/policy", policy);

// app.use(function (req, res, next) {
//   let err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// if (process.env.ENV === "Dev") {
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.send({
//       message: err.message,
//       error: err,
//     });
//   });
// }
const host = process.env.HOST;
const port = process.env.PORT;
const server = http.createServer(app);
server.listen(port, () => console.log(`app online @ ${host}:${port}`));

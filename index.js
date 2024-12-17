//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let passwordIsTrue = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
  console.log(req.body);
  if (req.body["password"] === "ILoveProgramming") {
    passwordIsTrue = true;
  }
  next();
}

app.get("/", (req, res) => {
  res.sendFile(_dirname + "/public/index.html");
});

app.use(passwordCheck);

app.post("/check", (req, res) => {
  if (passwordIsTrue) {
    res.sendFile(_dirname + "/public/secret.html");
  } else {
    res.sendFile(_dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log("Port is running in " + port);
});

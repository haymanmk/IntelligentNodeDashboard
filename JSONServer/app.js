const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.route("/").get((req, res) => {
  res.send("Hello world");
});

app
  .route("/api/config")
  .get((req, res) => {
    fs.readFile("./config.json", (err, data) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        let jsonData = JSON.parse(data);
        res.send(jsonData);
        console.log(jsonData);
      }
    });
  })
  .post((req, res) => {
    console.log(req.body);
    res.sendStatus(201);
  });

let port = 80;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

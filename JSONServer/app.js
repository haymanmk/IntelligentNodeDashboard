const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const { config } = require("process");

const app = express();

let configObject = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.route("/").get((req, res) => {
  res.send("Hello world");
});

app
  .route("/api/config")
  .get((req, res) => {
    readJSON("./config.json")
      .then((data) => {
        configObject = JSON.parse(data);
        res.send(configObject);
        console.log(configObject);
      })
      .catch((err) => {
        res.send(err);
        console.log(err);
      });
  })
  .post((req, res) => {
    readJSON("./config.json")
      .then((data) => {
        configObject = JSON.parse(data);

        let confObj = JSON.parse(JSON.stringify(req.body));
        configObject.RS232.settings.baudRate.value = confObj.baudRate;
        configObject.RS232.settings.parity.value = confObj.parity;
        fs.writeFile("./config.json", JSON.stringify(configObject), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(confObj);
            res.sendStatus(201);
          }
        });
      })
      .catch((err) => {
        res.send(err);
        console.log(err);
      });
  });

let port = 80;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function readJSON(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

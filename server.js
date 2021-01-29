const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongodb = require('mongodb');
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

const db = require("./app/models");
let connectionString = `mongodb://localhost:27017/crud`

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
//    app.listen(5000)
  }
)

// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Dikpeme REST API."
    });
});

require("./app/routes/product.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const fs = require('fs');

var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs);

app.listen(port, () => console.log(`Listening on port ${port}`));
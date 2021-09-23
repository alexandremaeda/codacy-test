"use strict";

const cors = require("cors");

const whitelist = ["http://127.0.0.1:8080"];

module.exports = cors({
  origin: (origin, callback) => {
    //cors disabled
    // if (whitelist.indexOf(origin) !== -1) {
    //   callback(null, true);
    // } else {
    //   callback(new Error('Not allowed by CORS'));
    // }

    callback(null, true);
  },
});

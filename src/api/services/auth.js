'use strict';

const jwt = require('jsonwebtoken');

const login = async (login, password) => {
  if (login === 'test' && password === '123') {
    //auth ok
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300, // expires in 5min
    });
    return token;
  }
};

module.exports = {
  login,
};

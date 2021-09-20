'use strict';

var createError = require('http-errors');
const AuthService = require('../services/auth');

const login = async (req, res, next) => {
  const { login, password } = req.body;
  const token = await AuthService.login(login, password);

  if (token) {
    return res.json({ auth: true, token: token });
  }

  next(createError(400, 'Invalid credentials.'));
};

const logout = async (req, res) => {
  res.json({ auth: false, token: null });
};

module.exports = {
  login,
  logout,
};

'use strict';

var createError = require('http-errors');
const { BadRequest } = require('../../utils/errors');
const AuthService = require('../services/auth');

const login = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const token = await AuthService.login(login, password);

    if (token) {
      return res.json({ auth: true, token: token });
    }

    throw new BadRequest('Invalid credentials');
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  res.json({ auth: false, token: null });
};

module.exports = {
  login,
  logout,
};

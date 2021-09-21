'use strict';

const { GeneralError } = require('../../utils/errors');

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: err.message,
    // message: "internal server error"
  });
};

module.exports = handleErrors;

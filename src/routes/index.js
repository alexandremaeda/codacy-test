const fs = require('fs');
const path = require('path');
const { Router } = require('express');

const currentPath = path.join(__dirname, '.');
const routes = Router();

/**
 * Dyanmic Routing
 * Adds all routes from routes folder
 */
fs.readdirSync(currentPath).forEach((file) => {
  if (file !== 'index.js') routes.use('/', require(`${currentPath}/${file}`));
});

module.exports = routes;

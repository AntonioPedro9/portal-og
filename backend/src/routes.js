const express = require("express");
const routes = express.Router();

const getPrices = require("./services/getPrices");

routes.get("/getPrices/vm", getPrices.vm);
routes.get("/getPrices/container", getPrices.container);

module.exports = routes;

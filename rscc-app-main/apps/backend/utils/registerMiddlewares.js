const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");

const securityHeaders = require("../middleware/securityHeaders");
const requestLogger = require("../middleware/requestLogger");
const responseTime = require("../middleware/responseTime");

module.exports = (app) => {
  app.use(helmet());

  app.use(cors());

  app.use(compression());

  app.use(express.json({ limit: "10mb" }));

  app.use(express.urlencoded({ extended: true }));

  app.use(morgan("dev"));

  app.use(requestLogger);

  app.use(responseTime);

  app.use(securityHeaders);
};

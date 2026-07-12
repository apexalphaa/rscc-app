const routes = require("../routes");
const healthCheck = require("../middleware/healthCheck");
const apiVersion = require("../middleware/apiVersion");
const notFound = require("../middleware/notFound");
const errorHandler = require("../middleware/errorHandler");

module.exports = (app) => {
  app.get("/health", healthCheck);

  app.use(apiVersion("v1"));

  app.use("/api/v1", routes);

  app.use(notFound);

  app.use(errorHandler);
};

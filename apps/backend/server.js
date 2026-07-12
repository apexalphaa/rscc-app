require("./config/env");

const http = require("http");

const app = require("./app");

const env = require("./config/env");
const logger = require("./config/logger");
const connectDatabase = require("./config/database");

const gracefulShutdown = require("./middleware/gracefulShutdown");
const processHandlers = require("./middleware/processHandlers");

async function bootstrap() {
  processHandlers();

  await connectDatabase();

  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    logger.success(
      `Server running on http://localhost:${env.PORT}`
    );
  });

  gracefulShutdown(server);
}

bootstrap();

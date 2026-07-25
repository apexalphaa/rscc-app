import "./config/env.js";

import http from "http";

import app from "./app.js";

import env from "./config/env.js";
import logger from "./config/logger.js";
import connectDatabase from "./config/database.js";

import gracefulShutdown from "./middleware/gracefulShutdown.js";
import processHandlers from "./middleware/processHandlers.js";

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

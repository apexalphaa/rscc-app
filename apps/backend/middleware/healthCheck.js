const mongoose = require("mongoose");

module.exports = (req, res) => {
  res.status(200).json({
    success: true,
    status: "UP",

    uptime: process.uptime(),

    database:
      mongoose.connection.readyState === 1 ? "CONNECTED" : "DISCONNECTED",

    timestamp: new Date().toISOString(),

    memory: process.memoryUsage(),

    node: process.version,

    environment: process.env.NODE_ENV,
  });
};

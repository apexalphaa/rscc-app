require("dotenv").config();

const required = [
  "NODE_ENV",
  "PORT",
  "MONGO_URI",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(
    `❌ Missing required environment variables:\n${missing.join("\n")}`
  );
  process.exit(1);
}

module.exports = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
  MONGO_URI: process.env.MONGO_URI,

  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  },

  CLIENT_URL: process.env.CLIENT_URL,

  BCRYPT_ROUNDS: Number(process.env.BCRYPT_ROUNDS || 10),

  RATE_LIMIT_WINDOW: Number(process.env.RATE_LIMIT_WINDOW || 15),
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX || 100),
});

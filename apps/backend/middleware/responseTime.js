module.exports = (req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);

    const ms = (diff[0] * 1e9 + diff[1]) / 1e6;

    res.setHeader("X-Response-Time", `${ms.toFixed(2)}ms`);
  });

  next();
};

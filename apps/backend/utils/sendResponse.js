module.exports = (
  res,
  {
    statusCode = 200,
    success = true,
    message = "Success",
    data = null,
    meta = {},
  }
) => {
  return res.status(statusCode).json({
    success,
    message,
    meta,
    data,
    timestamp: new Date().toISOString(),
  });
};

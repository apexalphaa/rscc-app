module.exports = (version = "v1") => {
  return (req, res, next) => {
    req.apiVersion = version;
    res.setHeader("X-API-Version", version);
    next();
  };
};

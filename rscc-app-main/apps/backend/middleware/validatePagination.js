module.exports = (req, res, next) => {
  req.pagination = {
    page: Math.max(parseInt(req.query.page || 1, 10), 1),
    limit: Math.max(parseInt(req.query.limit || 10, 10), 1),
  };

  next();
};

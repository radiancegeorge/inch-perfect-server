const error = (err, req, res, next) =>
  res.status(500).json({
    error: err,
  });
module.exports = error;

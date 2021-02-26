const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/auth/google', require('../auth/google'));

router.use(function (req, res, next) {
  const err = new Error('404 Not found');
  err.status = 404;
  next(err);
});

module.exports = router;

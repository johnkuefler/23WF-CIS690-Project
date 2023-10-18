var express = require('express');
var router = express.Router();


router.get('/create', function(req, res, next) {
  res.render('patients/create');
});

router.get('/details', function(req, res, next) {
  res.render('patients/details');
});

module.exports = router;

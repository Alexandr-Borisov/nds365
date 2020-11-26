const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('docs');
});

router.get('/doc', (req, res) => {
  res.render('docs');
});

router.get('/calc', (req, res) => {
  res.render('calc');
});

router.get('/nalogcalc', (req, res) => {
  res.render('nalogcalc');
});

router.get('/workflow', (req, res) => {
  res.render('workflow');
});

router.get('/risk', (req, res) => {
  res.render('risk');
});

module.exports = router;

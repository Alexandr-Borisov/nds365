const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('docs');
});

router.get('/doc', (req, res) => {
  res.render('docs/doc');
});

router.get('/calc', (req, res) => {
  res.render('docs/calc');
});

router.post('/calc', (req, res) => {
  res.redirect('docs/calc');
});

router.get('/nalogcalendar', (req, res) => {
  res.render('docs/nalogcalendar');
});

router.get('/workflow', (req, res) => {
  res.render('docs/workflow');
});

router.get('/risk', (req, res) => {
  res.render('docs/risk');
});

module.exports = router;

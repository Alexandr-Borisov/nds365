const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('docs');
});

router.get('/doc', (req, res) => {
  res.render('doc');
});

router.get('/calc', (req, res) => {
  res.render('/docs/calc');
});

router.post('/calc', (req, res) => {
  res.redirect('/calc');
});

router.get('/nalogcalendar', (req, res) => {
  res.render('nalogcalendar');
});

router.get('/workflow', (req, res) => {
  res.render('workflow');
});

router.get('/risk', (req, res) => {
  res.render('risk');
});

module.exports = router;

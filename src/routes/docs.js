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
  const { director, manager } = req.body;
  const NdflDir = director * 0.13;
  const NdflMan = manager * 0.13;
  const cardDir = director - NdflDir;
  const cardMan = manager - NdflMan;
  const vznosDir = 12130 * 0.302 + ((director - 12130) * 0.152);
  const vznosMan = 12130 * 0.302 + ((manager - 12130) * 0.152);
  const priceDir = Number(director) + Number(vznosDir);
  const priceMan = Number(manager) + Number(vznosMan);
  res.json({
    NdflDir, NdflMan, cardDir, cardMan, vznosDir, vznosMan, priceDir, priceMan,
  });
  // res.redirect('docs/calc');
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

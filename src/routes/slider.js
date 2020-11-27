const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('slider');
});

router.post('/', async (req, res) => {
  const group = req.body.group[0];
  const group1 = req.body.group1[0];
  const group2 = req.body.group2[0];
  if (group === 'yes' && group1 === 'yes' && group2 === 'yes' || group === 'no' && group1 === 'no' && group2 === 'yes') {
    return res.render('after-slider', { status: true });
  }
  return res.render('after-slider');
});
module.exports = router;

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('slider');
});

router.post('/', async (req, res) => {
  console.log(req.body.group[0]);
  res.render('after-slider');
});
module.exports = router;

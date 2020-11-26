const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('slider');
});

router.post('/answer', async (req, res) => {
  res.render('answertoslider');
});
module.exports = router;

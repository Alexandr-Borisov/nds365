const express = require('express');

const router = express.Router();


router.get('/calculator', (req, res) => {
  res.render('calculator/calculator');
});

router.post('/calculator', (req, res) => {
  const { earnings, bank, nds, np, debit, credit, cashgap } = req.body;
  
});


module.exports = router;

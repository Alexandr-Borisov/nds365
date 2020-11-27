const express = require('express');

const router = express.Router();

router.get('/calculator', (req, res) => {
  res.render('calculator/calculator');
});

router.post('/calculator', (req, res) => {
  const { earnings, bank, debit, credit } = req.body;
  const nds = 13;
  const np = 4.8;
  const newNds = String((+earnings * nds) / 100);
  const newNp = String((+earnings * np) / 100);
  const newCashgap = String(+bank + +debit - +credit - newNds - newNp);
  const dividends = String((newNp * 100) / 20);
  const tax = String(nds + np);
  res.json({ newNds, newNp, newCashgap, dividends, tax });
});

module.exports = router;

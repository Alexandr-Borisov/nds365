const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact');
});

router.post('/basecontact', (req, res) => {
  const { email } = req.body;
  console.log(email);
  res.redirect('/');
});

module.exports = router;

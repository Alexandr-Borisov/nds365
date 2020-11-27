const express = require('express');
const Status = require('../mongo/models/user.model');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact');
});

router.post('/basecontact', async (req, res) => {
  const { email } = req.body;
  await Status.findByIdAndUpdate(req.session.status.id, { email });
  res.render('thanks');
});

module.exports = router;

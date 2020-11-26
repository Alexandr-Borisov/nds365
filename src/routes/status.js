const express = require('express');

const Status = require('../mongo/models/user.model');

const router = express.Router();

router.post('/status', async (req, res) => {
  const indusrty = req.body.group1[0];
  const bussines = req.body.group2[0];
  const status = new Status({ indusrty, bussines });
  await status.save();
  res.redirect('/docs');
});
module.exports = router;

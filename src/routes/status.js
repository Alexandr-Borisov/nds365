const express = require('express');

const Status = require('../mongo/config/models/user.model');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', async (req, res) => {
  const { indusrty, bussines } = req.body;
  const status = new Status({ indusrty, bussines });
  await status.save();
  res.render('calendar');
});
module.exports = router;

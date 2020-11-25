const express = require('express');

const Status = require();
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', (req, res, next) => {
  const { indusrty, bussines } = req.body;
  const status = new Status({ indusrty, bussines });
  res.render('first');
});

router.get('/first/:id', (req, res) => {

});
module.exports = router;

const User = require('../models/user.model');

const checkAuth = async (req, res, next) => {
  const userId = req.session?.user?.id;

  console.log(req.session);

  if (userId) {
    const user = await User.findById(userId);
    if (user) {
      res.locals.name = user.name;
      req.app.locals.aaa = 'aaa';
      return next();
    }
    return res.status(401).redirect('/');
  }

  return res.status(401).redirect('/');
};

module.exports = {
  checkAuth,
};

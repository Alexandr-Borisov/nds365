const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnect = require('./src/mongo/config/db');
const statusRouter = require('./src/routes/status');
// const { checkAuth } = require('./src/middleware/auth');

const app = express();
const PORT = 3000;
dbConnect();

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'src', 'views'));
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// require('crypto').randomBytes(64).toString('hex')
const secretSession = '46b76110a6e9e3c9cf333f02ae8fa12e46e6dad262ef5901376d34feb7145f7323cd73dbc2161ab82e167e0b60104f98b512d277649c357a9b6bcaa70259e5c8';
app.use(
  session({
    name: 'sid',
    secret: secretSession,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'asdfasdf',
    }),
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60e3 },
  }),
);

app.use('/', statusRouter);

app.listen(PORT, () => {
  console.log('Server started on port ', PORT);
});

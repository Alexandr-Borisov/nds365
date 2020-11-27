const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnect = require('./src/mongo/config/db');
const statusRouter = require('./src/routes/status');
const calculatorRouter = require('./src/routes/calculator_rout');
const docsRouter = require('./src/routes/docs');
const sliderRouter = require('./src/routes/slider');
const calendarRouter = require('./src/routes/calendar');
const contactRouter = require('./src/routes/contact');
// const { checkAuth } = require('./src/middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;
dbConnect();

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'src', 'views'));
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(
  session({
    name: 'sid',
    secret: process.env.SECRETSESSION,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'sessions',
    }),
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);
app.use('/', statusRouter);
app.use('/docs', docsRouter);
app.use('/slider', sliderRouter);
app.use('/calendar', calendarRouter);
app.use('/contact', contactRouter);

app.get('/range_slider', (req, res) => {
  res.render('range_slider');
});
app.use('/', statusRouter);
app.use('/calculator', calculatorRouter);

app.listen(PORT, () => {
  console.log('Server started on port ', PORT);
});

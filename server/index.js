const path = require('path');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const express = require('express');
const app = express();
module.exports = app;

//serialize deserialize
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch(done);
});

//middleware loggging
app.use(morgan('dev'));

//Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    resave: false,
    saveUninitialized: false,
  })
);
// you'll of course want static middleware so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, '../public')));

//passports
app.use(passport.initialize());
app.use(passport.session());

// Routes ( API )
// app.use('/api', require('./api'));

//404
app.use((req, res, next) =>
  path.extname(req.path).length > 0 ? res.status(404).send('Not found') : next()
);

// index HTML
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

//500
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

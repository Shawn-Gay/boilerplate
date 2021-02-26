const db = require('./db');
const session = require('express-session');
const app = require('./index');
const port = process.env.port || 1337;

// dbStore.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    resave: false,
    saveUninitialized: false,
  })
);

db.sync().then(function () {
  app.listen(port);
});

// server.listen(port, () => console.log('listening on port 1337'));

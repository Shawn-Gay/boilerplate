const db = require('./db');

const app = require('./index');
const port = process.env.port || 1337;

// dbStore.sync();

if (process.env.NODE_ENV === 'development') {
  require('./auth/localSecrets'); // this will mutate the process.env object with your secrets.
}

db.sync().then(function () {
  app.listen(port);
});

// server.listen(port, () => console.log('listening on port 1337'));

const configureRoutes = (app) => {
  app.use('/', (req, res) => {
    res.status(200).send('Welcome to Vintage Poker!');
  });
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/users', require('./api/users'));
};

module.exports = configureRoutes;

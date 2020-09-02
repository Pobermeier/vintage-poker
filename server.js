const express = require('express');
const dotenv = require('dotenv');

// Config
// Load env vars if env is not production
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './server/local.env' });
}
const PORT = process.env.PORT || 5000;

// Init express app
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server started and listening on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const colors = require('colors/safe');
// const helmet = require('helmet');

// const routes = require('./routes');

const server = express();
const port = process.env.PORT;

// server.use(helmet());

server.use(cors({ origin: process.env.FRONT_URL }));
// server.use(routes);

server.listen(port, () => {
  console.log(
    `##### server is running on ${colors.brightGreen(
      process.env.BACK_URL
    )}. ${colors.yellow(new Date().toLocaleString())} #####`
  );
});

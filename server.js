const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketIo = require("socket.io")(server);
const cors = require("cors");
const colors = require("colors/safe");
// const helmet = require('helmet');

const routes = require("./src/routes");
const socket = require("./src/socket");

const port = process.env.PORT;
// app.use(helmet());

app.use(cors({ origin: process.env.FRONT_URL }));
app.use(routes);

socket(socketIo);

server.listen(port, () => {
  console.log(
    `##### server is running on ${colors.brightGreen(
      process.env.BACK_URL
    )}. ${colors.yellow(new Date().toLocaleString())} #####`
  );
});

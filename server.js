const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const socketIo = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONT_URL,
    credentials: true,
  },
});
const colors = require("colors/safe");

const socket = require("./src/socket");

const port = process.env.PORT;
app.use(cors({ origin: process.env.FRONT_URL, credentials: true }));
app.use(routes);

socket(socketIo);

server.listen(port, () => {
  console.log(
    `##### server is running on ${colors.brightGreen(
      process.env.BACK_URL
    )}. ${colors.yellow(new Date().toLocaleString())} #####`
  );
});

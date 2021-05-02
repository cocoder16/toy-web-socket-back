const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketIo = require("socket.io")(server);
const cors = require("cors");
const colors = require("colors/safe");
// const helmet = require('helmet');

const routes = require("./src/routes");

const port = process.env.PORT;
// app.use(helmet());

app.use(cors({ origin: process.env.FRONT_URL }));
app.use(routes);

socketIo.on("connection", function (socket) {
  console.log("소켓 접속 완료");
  console.log("### socket: ", socket);

  // 참가
  socket.on("join", userName => {
    const roomName = "room 1";
    socket.join(roomName);
    console.log("### join ", socket.rooms); // Set { <socket.id>, "room 1" }
    io.to(roomName).emit(`${userName} has joined the room`); // broadcast to everyone in the room
  });

  // //
  // socket.on("alert", touserid => {
  //   //alet 이벤트로 데이터 받기
  //   io.to(touserid).emit("heejewake", touserid); //touserid: 클라이언트1이 보낸데이터"hwi"
  // }); //heejewake이벤트: hwi 에게 메시지 hwi를 보낸다
});

server.listen(port, () => {
  console.log(
    `##### server is running on ${colors.brightGreen(
      process.env.BACK_URL
    )}. ${colors.yellow(new Date().toLocaleString())} #####`
  );
});

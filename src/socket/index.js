const colors = require("colors/safe");

module.exports = function (socketIo) {
  socketIo.on("connection", function (socket) {
    console.log(`${colors.brightGreen("socket connection succeeded.")}`);
    const roomName = "room 1";

    // 참가
    socket.on("join", userName => {
      socket.join(roomName);
      console.log("### join ", socket.rooms); // Set { <socket.id>, "room 1" }
      socketIo.to(roomName).emit(`${userName} has joined the room`); // broadcast to everyone in the room
    });

    // 메시지 송신
    socket.on("send", message => {
      socketIo.to(roomName).emit("receive", message); // 방에 참가한 인원들은 메시지 수신
    });

    // 나가기
    socket.on("leave", userName => {
      socket.leave(roomName);
      console.log("### leave: ", socket.rooms);
      socketIo.to(roomName).emit(`${userName} has leaved the room`); // broadcast to everyone in the room
    });
  });
};

const colors = require("colors/safe");

module.exports = function (socketIo) {
  socketIo.on("connection", function (socket) {
    console.log(`${colors.brightGreen("socket connection succeeded.")}`);
    const roomName = "room 1";

    // 참가
    socket.on("join", user => {
      socket.join(roomName);
      console.log("### join ", socket.rooms); // Set { <socket.id>, "room 1" }
      console.log("### user: ", user);
      socketIo
        .to(roomName)
        .emit("receive", { content: `${user.name} has joined the room.` }); // broadcast to everyone in the room
    });

    // 메시지 송신
    socket.on("send", (user, message) => {
      socketIo.to(roomName).emit("receive", [user, message]); // 방에 참가한 인원들은 메시지 수신
    });

    // 나가기
    socket.on("leave", user => {
      socket.leave(roomName);
      console.log("### leave: ", socket.rooms);
      socketIo.to(roomName).emit(`${user.name} has leaved the room.`); // broadcast to everyone in the room
    });
  });
};

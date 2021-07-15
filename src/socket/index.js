const colors = require("colors/safe");

const printSocketEventFired = require("../lib/prints/printSocketEventFired");
const { formatHourMin } = require("../lib/format/time");

module.exports = function (socketIo) {
  socketIo.on("connection", function (socket) {
    console.log(`${colors.brightGreen("socket connection succeeded.")}`);
    const roomName = "room 1";

    // 참가
    socket.on("join", user => {
      socket.join(roomName);
      printSocketEventFired("join", { user, room: socket.rooms });
      const content = `${user.name} has joined the room.`;
      const time = formatHourMin(new Date());
      const data = { content, time };
      socketIo.to(roomName).emit("receive", data);
      printSocketEventFired("receive", { to: roomName, ...data });
    });

    // 메시지 송신
    socket.on("send", ({ user, content }) => {
      const time = formatHourMin(new Date());
      const data = { nickname: user.name, content, time };
      socketIo.to(roomName).emit("receive", data);
      printSocketEventFired("receive", { to: roomName, ...data });
    });

    // 나가기
    socket.on("leave", user => {
      socket.leave(roomName);
      const content = `${user.name} has leaved the room.`;
      const time = formatHourMin(new Date());
      const data = { content, time };
      socketIo.to(roomName).emit("receive", data);
      printSocketEventFired("receive", { to: roomName, ...data });
    });
  });
};

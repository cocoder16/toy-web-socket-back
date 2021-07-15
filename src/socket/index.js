const colors = require("colors/safe");

const printSocketEventFired = require("../lib/prints/printSocketEventFired");
const { formatHourMin } = require("../lib/format/time");

module.exports = function (socketIo) {
  socketIo.on("connection", function (socket) {
    // TODO: connect한 유저의 IP 등 정보를 받아오기
    console.log(`${colors.brightGreen("socket connection succeeded.")}`);
    const roomName = "room 1";

    // 참가
    socket.on("JOIN", user => {
      socket.join(roomName);
      printSocketEventFired("JOIN", { user, room: socket.rooms });
      const content = `${user.name} has joined the room.`;
      const time = formatHourMin(new Date());
      const data = { content, time };
      socketIo.to(roomName).emit("RECEIVE", data);
      printSocketEventFired("RECEIVE", { to: roomName, ...data });
    });

    // 메시지 송신
    socket.on("SEND", ({ user, content }) => {
      const time = formatHourMin(new Date());
      const data = { nickname: user.name, content, time };
      socketIo.to(roomName).emit("RECEIVE", data);
      printSocketEventFired("RECEIVE", { to: roomName, ...data });
    });

    // 나가기
    socket.on("LEAVE", user => {
      socket.leave(roomName);
      const content = `${user.name} has leaved the room.`;
      const time = formatHourMin(new Date());
      const data = { content, time };
      socketIo.to(roomName).emit("RECEIVE", data);
      printSocketEventFired("RECEIVE", { to: roomName, ...data });
    });
  });
};

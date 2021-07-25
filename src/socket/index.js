const colors = require("colors/safe");

const { SOCKET_EVENT } = require("../config/event");
const printSocketEventFired = require("../lib/prints/printSocketEventFired");
const { formatHourMin } = require("../lib/format/time");

module.exports = function (socketIo) {
  socketIo.on("connection", function (socket) {
    // TODO: connect한 유저의 IP 등 정보를 받아오기
    console.log(`${colors.brightGreen("socket connection succeeded.")}`);
    const roomName = "room 1";

    // 참가
    socket.on(SOCKET_EVENT.JOIN, user => {
      socket.join(roomName);
      printSocketEventFired(SOCKET_EVENT.JOIN, { user, room: socket.rooms });
      const content = `${user.name} has joined the room.`;
      const time = formatHourMin(new Date());
      const data = { content, time };
      socketIo.to(roomName).emit(SOCKET_EVENT.RECEIVE, data);
      printSocketEventFired(SOCKET_EVENT.RECEIVE, { to: roomName, ...data }); // TODO: emit 이후에는 항상 로그를 출력하도록, 그리고 fire랑 구분된 메시지로,
    });

    // 메시지 송신
    socket.on(SOCKET_EVENT.SEND, ({ user, content }) => {
      const time = formatHourMin(new Date());
      const data = { nickname: user.name, content, time };
      printSocketEventFired(SOCKET_EVENT.SEND, { user, content });
      socketIo.to(roomName).emit(SOCKET_EVENT.RECEIVE, data);
      printSocketEventFired(SOCKET_EVENT.RECEIVE, { to: roomName, ...data });
    });

    // 나가기
    socket.on(SOCKET_EVENT.LEAVE, user => {
      socket.leave(roomName);
      printSocketEventFired(SOCKET_EVENT.LEAVE, { user });
      const content = `${user.name} has leaved the room.`;
      const time = formatHourMin(new Date());
      const data = { content, time };
      socketIo.to(roomName).emit(SOCKET_EVENT.RECEIVE, data);
      printSocketEventFired(SOCKET_EVENT.RECEIVE, { to: roomName, ...data });
    });

    socket.on("disconnect", reason => {
      console.log(`${colors.brightGreen("disconnect")}: ${reason}`);
    });
  });
};

const colors = require("colors/safe");

const SOCKET_EVENT = require("../config/event");
const formatHourMin = require("../lib/formatHourMin");
const { printPingLog, printPongLog } = require("../lib/print");

module.exports = function (socketIo) {
  socketIo.on("connection", function (socket) {
    console.log(`${colors.brightGreen("socket connection succeeded.")}`);
    const roomName = "room 1"; // 편의상 모든 유저는 같은 방을 사용

    socket.on(SOCKET_EVENT.JOIN_ROOM, requestData => {
      socket.join(roomName);
      printPingLog(SOCKET_EVENT.JOIN_ROOM, requestData);
      const content = `${requestData.nickname} has joined the room.`;
      const time = new Date();
      const responseData = { content, time };
      socketIo.to(roomName).emit(SOCKET_EVENT.RECEIVE_MESSAGE, responseData);
      printPongLog(SOCKET_EVENT.RECEIVE_MESSAGE, responseData);
    });

    socket.on(SOCKET_EVENT.UPDATE_NICKNAME, requestData => {
      socket.join(roomName);
      printPingLog(SOCKET_EVENT.UPDATE_NICKNAME, requestData);
      const content = `User's name has been changed.\n ${requestData.prevNickname} => ${requestData.nickname}.`;
      const time = new Date();
      const responseData = { content, time };
      socketIo.to(roomName).emit(SOCKET_EVENT.RECEIVE_MESSAGE, responseData);
      printPongLog(SOCKET_EVENT.RECEIVE_MESSAGE, responseData);
    });

    socket.on(SOCKET_EVENT.SEND_MESSAGE, requestData => {
      printPingLog(SOCKET_EVENT.SEND_MESSAGE, requestData);
      const time = new Date();
      const responseData = {
        nickname: requestData.nickname,
        content: requestData.content,
        time,
      };
      socketIo.to(roomName).emit(SOCKET_EVENT.RECEIVE_MESSAGE, responseData);
      printPongLog(SOCKET_EVENT.RECEIVE_MESSAGE, responseData);
    });

    socket.on("disconnect", reason => {
      console.log(`${colors.brightGreen("disconnect")}: ${reason}`);
    });
  });
};

const colors = require("colors/safe");

const printLog = require("../lib/printLog");

const SOCKET_EVENT = {
  JOIN_ROOM: "JOIN_ROOM",
  UPDATE_NICKNAME: "UPDATE_NICKNAME",
  SEND_MESSAGE: "SEND_MESSAGE",
  RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
};

module.exports = function (socketIo) {
  socketIo.on("connection", function (socket) {
    console.log(`${colors.brightGreen("socket connection succeeded.")}`);
    const roomName = "room 1"; // 편의상 모든 유저는 같은 방을 사용

    Object.keys(SOCKET_EVENT).forEach(typeKey => {
      const type = SOCKET_EVENT[typeKey];

      socket.on(type, requestData => {
        const firstVisit = type === SOCKET_EVENT.JOIN_ROOM;

        if (firstVisit) {
          socket.join(roomName);
        }

        const responseData = {
          ...requestData,
          type,
          time: new Date(),
        };
        socketIo.to(roomName).emit(SOCKET_EVENT.RECEIVE_MESSAGE, responseData);
        printLog(responseData);

        // 서버는 이벤트를 받은 시각과 함께 데이터를 그대로 중계해주는 역할만 수행
        // 프론트엔드에서 출력 메시지 값 등을 관리
      });
    });

    socket.on("disconnect", reason => {
      console.log(`${colors.brightGreen("disconnect")}: ${reason}`);
    });
  });
};

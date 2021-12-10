const DummyController = require("../controllers/dummy");
const processWithLogs = require("../lib/processWithLogs");

module.exports = function (router) {
  router.post("/dummy", (request, response) =>
    processWithLogs({
      request,
      response,
      controllerFunction: DummyController.create,
    })
  );
  router.get("/dummy", (request, response) =>
    processWithLogs({
      request,
      response,
      controllerFunction: DummyController.get,
    })
  );
  router.put("/dummy", (request, response) =>
    processWithLogs({
      request,
      response,
      controllerFunction: DummyController.update,
    })
  );
  router.delete("/dummy", (request, response) =>
    processWithLogs({
      request,
      response,
      controllerFunction: DummyController.delete,
    })
  );
};

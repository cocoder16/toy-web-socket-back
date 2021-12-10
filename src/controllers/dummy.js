module.exports = DummyController = {
  create() {
    return { status: 200, data: "c" };
  },
  get() {
    return { status: 200, data: "r" };
  },
  update() {
    return { status: 200, data: "u" };
  },
  delete() {
    return { status: 200, data: "d" };
  },
};

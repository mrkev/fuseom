const simple = {
  type: "__dir",
  children: {
    test: {
      type: "__file",
      contents: "nice\n"
    },
    hello: {
      type: "__dir",
      children: {
        world: {
          type: "__file",
          contents: "HELLO WORLD\n"
        }
      }
    }
  }
};

module.exports = {
  simple
};

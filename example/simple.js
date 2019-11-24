const simple = {
  _type: "__dir",
  children: {
    test: {
      _type: "__file",
      contents: "nice\n"
    },
    hello: {
      _type: "__dir",
      children: {
        world: {
          _type: "__file",
          contents: "HELLO WORLD\n"
        }
      }
    }
  }
};

module.exports = { simple };

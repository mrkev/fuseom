const EventEmitter = require("events").EventEmitter;

class Node extends EventEmitter {
  constructor() {
    super();
    this.parent = null;
  }
}

module.exports = Node;

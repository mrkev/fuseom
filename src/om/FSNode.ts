const EventEmitter = require("events").EventEmitter;

export default class FSNode extends EventEmitter {
  name: string;
  parent: FSNode | null;
  constructor(name: string) {
    super();
    this.name = name;
    this.parent = null;
  }
}

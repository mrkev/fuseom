const Directory = require("../src/om/Directory.js");
const File = require("../src/om/File.js");

function dir(options) {
  return new Directory(options);
}

function file(options) {
  return new File(options);
}

const simple2 = dir({
  name: "root",
  children: [
    file({
      name: "test",
      contents: "nice\n"
    }),
    dir({
      name: "hello",
      children: [
        file({
          name: "world",
          contents: "HELLO WORLD\n"
        })
      ]
    })
  ]
});

let timer;

function startAdding() {
  let i = 0;
  timer = setTimeout(function append() {
    const filei = new File({ name: `num-${i}`, contents: "" + i });
    simple2.appendChild(filei);
    if (i < 10) {
      i++;
      timer = setTimeout(append, 1000);
    }
  }, 1000);
}

function stopAdding() {
  clearTimeout(timer);
}

module.exports = {
  simple2,
  startAdding,
  stopAdding
};

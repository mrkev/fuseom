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

const withEvent = new Directory({ name: "withEvent", children: [] });
simple2.appendChild(withEvent);

const onOpendir = () => console.log("Opened this dir!");
const onReleasedir = () => console.log("Released this dir!");

let timer;
function startAdding() {
  // Evented directory
  withEvent.addListener("opendir", onOpendir);
  withEvent.addListener("releasedir", onReleasedir);

  // Async-added files
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
  withEvent.removeListener("opendir", onOpendir);
  withEvent.removeListener("releasedir", onReleasedir);
  clearTimeout(timer);
}

module.exports = {
  simple2,
  startAdding,
  stopAdding
};

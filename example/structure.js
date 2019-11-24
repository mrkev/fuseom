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

for (var i = 0; i < 20; i++) {
  const filei = new File({ name: `num-${i}`, contents: String(i) });
  simple2.appendChild(filei);
}

module.exports = {
  simple2
};

const { simple2 } = require("../../example/example-structure");
const readdir = require("./readdir").forStructure(simple2);

test("readdir", done => {
  readdir("/", function(code, contents) {
    expect(code).toBe(0);
    expect(contents).toEqual([
      "test",
      "img.png",
      "hello",
      "fileEvents",
      "dirEvents"
    ]);
    done();
  });

  readdir("/hello", function(code, contents) {
    expect(code).toBe(0);
    expect(contents).toEqual(["world"]);
    done();
  });
});

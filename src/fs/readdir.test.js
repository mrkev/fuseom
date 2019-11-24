const { simple } = require("../../example/simple");
const readdir = require("./readdir").forStructure(simple);

test("readdir", done => {
  readdir("/", function(code, contents) {
    expect(code).toBe(0);
    expect(contents).toEqual(["test", "hello"]);
    done();
  });

  readdir("/hello", function(code, contents) {
    expect(code).toBe(0);
    expect(contents).toEqual(["world"]);
    done();
  });
});

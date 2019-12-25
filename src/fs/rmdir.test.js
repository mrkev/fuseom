const { simple2 } = require("../../example/example-structure");
const rmdir = require("./rmdir").forStructure(simple2);

test("rmdir", done => {
  rmdir("/dirEvents", function(code, fd) {
    expect(code).toBe(0);
    done();
  });
});

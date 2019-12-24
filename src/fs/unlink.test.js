const { simple2 } = require("../../example/example-structure");
const unlink = require("./unlink").forStructure(simple2);

test("open", done => {
  unlink("/test", 0, function(code, fd) {
    expect(code).toBe(0);
    done();
  });
});

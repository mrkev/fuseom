const { simple2 } = require("../../example/example-structure");
const unlink = require("./unlink").forStructure(simple2);

test("unlink", (done) => {
  unlink("/test", function (code, fd) {
    expect(code).toBe(0);
    done();
  });
});

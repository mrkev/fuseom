const { simple2 } = require("../../example/example-structure");
const open = require("./open").forStructure(simple2);

test("open", (done) => {
  open("/", 0, function (code, fd) {
    expect(code).toBe(0);
    done();
  });
});

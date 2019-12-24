const { simple2 } = require("../../example/example-structure");
const open = require("./open").forStructure(simple2);

test("realeasedir", done => {
  open("/", 3, function(code) {
    expect(code).toBe(0);
    done();
  });
});

const { simple } = require("../../example/simple");
const open = require("./open").forStructure(simple);

test("open", done => {
  open("/", 0, function(code, fd) {
    expect(code).toBe(0);
    done();
  });
});

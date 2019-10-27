const { simple } = require("../structure");
const open = require("./open").forStructure(simple);

test("open", done => {
  open("/", 0, function(code, fd) {
    expect(code).toBe(0);
    done();
  });
});

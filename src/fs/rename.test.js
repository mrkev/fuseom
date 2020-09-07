const { simple2 } = require("../../example/example-structure");
const rename = require("./rename").forStructure(simple2);

test("rename", (done) => {
  rename("/test", "/test2", function (code) {
    expect(code).toBe(0);
    done();
  });
});

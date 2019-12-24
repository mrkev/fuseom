const { simple2 } = require("../../example/example-structure");
const getattr = require("./getattr").forStructure(simple2);

test("getattr", done => {
  getattr("/", function(code) {
    expect(code).toBe(0);
    done();
  });

  getattr("/hello/world", function(code) {
    expect(code).toBe(0);
    done();
  });
});

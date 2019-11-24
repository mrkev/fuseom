const { simple } = require("../../example/simple");
const getattr = require("./getattr").forStructure(simple);

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

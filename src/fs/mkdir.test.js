const { simple2 } = require("../../example/example-structure");
const mkdir = require("./mkdir").forStructure(simple2);
const readdir = require("./readdir").forStructure(simple2);

test("mkdir", done => {
  readdir("/", function(code, original) {
    mkdir("zzz", 16877, function(code) {
      readdir("/", function(code, contents) {
        expect(code).toBe(0);
        expect(original.concat(["zzz"])).toEqual(contents);
        done();
      });
    });
  });
});

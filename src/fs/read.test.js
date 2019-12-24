const { simple2 } = require("../../example/example-structure");
const read = require("./read").forStructure(simple2);

test("read", done => {
  read(
    "/test",
    /*fd*/ 42,
    Buffer.from(""),
    /*read len*/ 100,
    /*read from pos*/ 0,
    function(res, fd) {
      // res < 0 => error
      // res >= 0 => num bytes read
      // nice\n is 5 bytes
      expect(res).toBe(5);
      done();
    }
  );

  read(
    "/hello/world",
    /*fd*/ 42,
    Buffer.from(""),
    /*read len*/ 100,
    /*read from pos*/ 0,
    function(res, fd) {
      // res < 0 => error
      // res >= 0 => num bytes read
      // nice\n is 5 bytes
      expect(res).toBe(12);
      done();
    }
  );
});

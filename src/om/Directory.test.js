const Directory = require("./Directory");

test("Directory", () => {
  const dir = new Directory({ name: "hello" });

  expect(dir.name).toBe("hello");
  expect(dir._type).toBe("__dir");
});

const File = require("./File");

test("File", () => {
  const file = new File({ name: "hello", contents: "world" });

  expect(file.name).toBe("hello");
  expect(file._type).toBe("__file");
  expect(file.contents).toBe("world");
});

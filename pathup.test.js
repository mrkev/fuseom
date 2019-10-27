const { pathup, parse } = require("./pathup");
const { simple } = require("./structure");

// d /
// f /test "nice\n"
// d /hello/
// f /hello/world "HELLO WORLD\n"

test("structure simple", () => {
  expect(pathup("/", simple).type).toEqual("__dir");
  expect(pathup("/test", simple).type).toEqual("__file");
  expect(pathup("/hello", simple).type).toEqual("__dir");
});

test("structure nested", () => {
  expect(pathup("/hello/world", simple).type).toEqual("__file");
});

test("contents", () => {
  expect(pathup("/test", simple).contents).toEqual("nice\n");
  expect(pathup("/hello/world", simple).contents).toEqual("HELLO WORLD\n");
});

test("parse easy", () => {
  expect(parse("/")).toEqual([]);
  expect(parse("/hello")).toEqual(["hello"]);
  expect(parse("/hello/world")).toEqual(["hello", "world"]);
});

test("parse with '.'", () => {
  expect(parse("/.")).toEqual([]);
  expect(parse("/./hello")).toEqual(["hello"]);
  expect(parse("/hello/./world")).toEqual(["hello", "world"]);
});

test("parse with '..'", () => {
  expect(parse("/nice/..")).toEqual([]);
  expect(parse("/hello/../hello")).toEqual(["hello"]);
  expect(parse("/hello/world/..")).toEqual(["hello"]);
});

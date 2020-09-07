const Directory = require("../src/om/Directory.js");
const File = require("../src/om/File.js");

const image = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAA" +
    "CA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0" +
    "YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly" +
    "93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAg" +
    "ICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZm" +
    "Y6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAADuUlEQVQ4EbVU" +
    "TUtcZxR+7ufkXp1SZ4iZRE1EDVQRnTAhowsZMFm40I2rNqUIIev8hvoPQroQXBTqwiAWcd0EglEhiZNajVZrQGXAWAzaZpzMnZn7lXPeeIe5Da" +
    "Wb9Ax33vOec8/znI/3vVI6nfbxP4v8b/iSJIGfzyGfkPi+D13XUalUBL6qqmIvy5+8WuX/r2RCkUzAoIuLi2hqaoLrutjb28P6+josyxJkiqJA" +
    "07SQXiqVwHaOZYx/itLc3Px9YIxEIlheXsbExATGxsYwMjIiwEdHRwXA/Pw8EokEcrkcDg4OYJomVlZWMDU1JSqfmZlBR0cHbNsOtVoNCHjlTF" +
    "iSySQMwxAVxONxQbi0tIRMJoPe3l5MT0+jtbUVg4ODYGImY18qlcL4+DhisZjoggCjv1C7uOyenh7Mzs5iY2ND6FQpdnd3sba2JloSjUYxPDyM" +
    "/v5+TE5OYn9/X9jZtrOzg+3t7WqyAUmoEu419/+HBw9E+eVymbJqAJP39fWBCR3HEU+hUMDQ0JCYGc8um81iYGAAjY2N8DwvwBdraCY8tHhDA1" +
    "Y3N9Hd3S2yvH37O7RcbsF7AuUsD9+8wdOFBTx/8QJtbW1C5/nMzc3R0D2UyxXk83lRXcAk1V5GCT5sSUGDbeHxy9/EO98M9OOXzT9wfHISxKC1" +
    "vR0GHfOtrS2g/SouWwU0Xkggu7qO9PUkJFULnbIQyTm6ewu2hF+vnOIIUQwdGlg8f4QF6wvMWBq+pAkaskSnx4FFVUf0CNpcC797KizXQ4oAHh" +
    "VdXJJ81F7j6kwUynPHlXDPdFB2fRj+KVK0KvT2rbp3uKYryJU11Cke8qqMuOoioeeJ1MPDYxM36m1cNSq4GdFx58RAWvbx8TrXnK4IgR16Em5G" +
    "K4iqHi5GHHxLgcSDn97WgZPoND+GGZRpPYH85cgiiRQl1ltXxmFFQ5PuopP8TrW5ZyRcWp7AbmkeZefg5+N6PPnbRJdpw/YlfB0vQiPQZwVdZN" +
    "tFZEVK6D1VTnccJlXzuqTjvOZiq6Rhj2KqLSJsofOHgIl8+t0/qsfDioxmSUWGjrRFzhYi/5Oynrdl3KXHIZDXtF6hil8R6I9FBV/RvDLnXKxS" +
    "bAdVYhNeINXBMwmXWCTQGG2Y+Jj+dFrfEmiMAtmeowpo9ojTvkD+A/L1UJUMmiVfkuz6WTyZhFRJAgP33j3bsM5k/Fng68UP21hYJyyxZwLWuS" +
    "2cKMfUSm3rhD0g4E2g197fwMZ+Bgt8rNe2iP2BhL5dgfFzrx8AfECEDdx45a0AAAAASUVORK5CYII=",
  "base64"
);

const simple2 = new Directory({
  name: "root",
  children: [
    new File({
      name: "test",
      contents: "nice\n",
    }),
    new File({
      name: "img.png",
      contents: image,
    }),
    new Directory({
      name: "hello",
      children: [
        new File({
          name: "world",
          contents: "HELLO WORLD\n",
        }),
      ],
    }),
  ],
});
simple2.mode.owner.write = true;

// This file will log file events
const fileEvents = new File({ name: "fileEvents", contents: "" });
fileEvents.mode.owner.write = true;
simple2.appendChild(fileEvents);

const onFileRename = () => console.log("Renamed the file!");
const onUnlink = () => console.log("Unlinked this file!");
fileEvents.addListener("unlink", onUnlink);
fileEvents.addListener("rename", onFileRename);

// This directory will log directory events
const dirEvents = new Directory({ name: "dirEvents", children: [] });
dirEvents.mode.owner.write = true;
simple2.appendChild(dirEvents);

const onOpendir = () => console.log("Opened this dir!");
const onReleasedir = () => console.log("Released this dir!");
const onDirRename = () => console.log("Renamed the directory!");
const onMkdir = () => console.log("Created subdirectory.");
dirEvents.addListener("opendir", onOpendir);
dirEvents.addListener("releasedir", onReleasedir);
dirEvents.addListener("rename", onDirRename);
dirEvents.addListener("mkdir", onMkdir);

// Add some files asynchronously
let timer;
function startAdding() {
  // Async-added files
  let i = 0;
  timer = setTimeout(function append() {
    const filei = new File({ name: `num-${i}`, contents: "" + i });
    simple2.appendChild(filei);
    if (i < 9) {
      i++;
      timer = setTimeout(append, 1000);
    }
  }, 1000);
}

//
function cleanup() {
  dirEvents.removeListener("opendir", onOpendir);
  dirEvents.removeListener("releasedir", onReleasedir);
  dirEvents.removeListener("rename", onRename);
  dirEvents.removeListener("mkdir", onMkdir);
  fileEvents.removeListener("unlink", onUnlink);
  fileEvents.removeListener("rename", onRename);
  clearTimeout(timer);
}

module.exports = {
  simple2,
  startAdding,
  cleanup,
};

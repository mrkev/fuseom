const fetch = require("node-fetch");
const Directory = require("../src/om/Directory.js");
const File = require("../src/om/File.js");
const { mount } = require("../src/index.js");
const mountPath = process.platform !== "win32" ? "./mnt" : "M:\\";

const tifu = new Directory({
  name: "root",
  children: [],
});
tifu.mode.owner.write = true;

function getPage(dir, after = null) {
  return fetch(`https://www.reddit.com/r/tifu.json?after=${after}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      for (post of json.data.children) {
        const contents = post.data.selftext;
        const name = post.data.title + ".txt";
        dir.appendChild(new File({ name, contents }));
      }

      if (json.data.after != null) {
        const afterFile = new File({
          name: "_next",
          contents: "Delete this file to load the next page",
        });
        afterFile.mode.owner.write = true;
        afterFile.addListener("unlink", function () {
          dir.removeChild(afterFile);
          const nextDir = new Directory({ name: "next", children: [] });
          nextDir.mode.owner.write = true;
          dir.appendChild(nextDir);
          getPage(nextDir, json.data.after);
        });
        dir.appendChild(afterFile);
      }
    })
    .catch(console.error);
}

if (require.main === module) {
  getPage(tifu)
    .then(() => {
      const mounted = mount(mountPath, tifu);
    })
    .catch(console.error);
}

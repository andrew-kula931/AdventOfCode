var fs = require("fs");

function sortConnections() {
  const trios: string[][] = [];

  dependencies.forEach((value, key) => {
    for (let one of value) {
      if (dependencies.has(one)) {
        for (let two of dependencies.get(one)!) {
          if (dependencies.has(two)) {
            if (dependencies.get(two)!.includes(key)) {
              trios.push([key, one, two]);
            }
          }
        }
      }
    }
  });

  const tTrios: string[][] = [];
  for (let trio of trios) {
    if (
      trio[0].startsWith("t") ||
      trio[1].startsWith("t") ||
      trio[2].startsWith("t")
    ) {
      tTrios.push(trio);
    }
  }

  console.log(tTrios.length / 6);
}

function findPassword() {
  let finalList: string[] = [];

  dependencies.forEach((value: string[], key) => {
    if (value.length >= finalList.length) {
      for (let num of value) {
        let connectedList: string[] = [];
        const checking = dependencies.get(num)!;
        for (let i = 0; i < dependencies.get(num)!.length; i++) {
          if (!value.includes(checking[i])) {
            continue;
          }

          connectedList.push(checking[i]!);
        }

        if (connectedList.length > finalList.length) {
          finalList = connectedList;
        }
      }
    }
  });

  console.log(finalList);
}

var filename = process.argv[2];
if (!filename) {
  console.error("Please provide a filename");
  process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);

const dependencies = new Map<string, string[]>();

lines.forEach(function (line) {
  const connections: string[] = line.split("-");
  if (dependencies.has(connections[0])) {
    let lst = dependencies.get(connections[0]) ?? [];
    lst.push(connections[1]);
    dependencies.set(connections[0], lst);
  } else {
    dependencies.set(connections[0], [connections[1]]);
  }

  if (dependencies.has(connections[1])) {
    let lst = dependencies.get(connections[1]) ?? [];
    lst.push(connections[0]);
    dependencies.set(connections[1], lst);
  } else {
    dependencies.set(connections[1], [connections[0]]);
  }
});

//sortConnections();
findPassword();

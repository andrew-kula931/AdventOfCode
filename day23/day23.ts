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
  const nodes = Array.from(dependencies.keys());

  //Helper function to check if a subset form a clique
  function isClique(subset) {
    for (let i = 0; i < subset.length; i++) {
      for (let j = i + 1; j < subset.length; j++) {
        if (!dependencies.get(subset[i])!.includes(subset[j])) {
          return false;
        }
      }
    }
    return true;
  }

  function findClique(nodes: string[]) {
    const adjList = new Map();

    // Build adjacency list from dependencies
    nodes.forEach((node) => {
      adjList.set(node, new Set(dependencies.get(node) || []));
    });

    function bronKerbosch(R, P, X) {
      if (P.size === 0 && X.size === 0) {
        if (R.size > finalList.length) {
          finalList = Array.from(R);
        }
        return;
      }

      let pivot = P.size ? P.values().next().value : X.values().next().value;
      let pivotNeighbors = adjList.get(pivot) || new Set();

      for (let v of P) {
        if (!pivotNeighbors.has(v)) {
          let neighbors = adjList.get(v) || new Set();
          bronKerbosch(
            new Set(R).add(v),
            new Set([...P].filter((x) => neighbors.has(x))),
            new Set([...X].filter((x) => neighbors.has(x)))
          );
          P.delete(v);
          X.add(v);
        }
      }
    }

    bronKerbosch(new Set(), new Set(nodes), new Set());
  }

  findClique(nodes);

  const sortedList = finalList.sort();
  console.log(sortedList.join(","));
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

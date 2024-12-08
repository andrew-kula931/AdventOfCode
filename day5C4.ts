import * as fs from "fs";

function reorderPages(rules: number[][], update: number[]): number[] {
  const dependents: Record<number, number[]> = {};
  const dependencies: Record<number, number> = {};
  const inUpdate = new Set<number>(update);

  rules.forEach(([pageA, pageB]) => {
    if (!inUpdate.has(pageA) || !inUpdate.has(pageB)) return;

    if (!dependents[pageA]) dependents[pageA] = [];
    dependents[pageA].push(pageB);

    dependencies[pageB] = (dependencies[pageB] || 0) + 1;
  });

  const ordered: number[] = [];
  const queue: number[] = [];

  update.forEach((num) => {
    if (!dependencies[num]) queue.push(num);
  });

  while (queue.length > 0) {
    const page = queue.shift()!;
    ordered.push(page);

    (dependents[page] || []).forEach((dependent) => {
      dependencies[dependent]--;
      if (dependencies[dependent] === 0) queue.push(dependent);
    });
  }

  const pageSeen = new Set<number>(ordered);
  update.forEach((page) => {
    if (!pageSeen.has(page)) ordered.push(page);
  });

  return ordered;
}

function part1(rules: number[][], updates: number[][]): number {
  let middleSum = 0;

  updates.forEach((update) => {
    const pageIndex: Record<number, number> = {};
    update.forEach((num, i) => {
      pageIndex[num] = i;
    });

    let failed = false;
    rules.forEach(([pageA, pageB]) => {
      if (
        pageIndex[pageA] !== undefined &&
        pageIndex[pageB] !== undefined &&
        pageIndex[pageA] > pageIndex[pageB]
      ) {
        failed = true;
      }
    });

    if (!failed) {
      middleSum += update[Math.floor(update.length / 2)];
    }
  });

  return middleSum;
}

function part2(rules: number[][], updates: number[][]): number {
  let middleSum = 0;

  updates.forEach((update) => {
    const pageIndex: Record<number, number> = {};
    update.forEach((num, i) => {
      pageIndex[num] = i;
    });

    let failed = false;
    rules.forEach(([pageA, pageB]) => {
      if (
        pageIndex[pageA] !== undefined &&
        pageIndex[pageB] !== undefined &&
        pageIndex[pageA] > pageIndex[pageB]
      ) {
        failed = true;
      }
    });

    if (failed) {
      const fixedUpdate = reorderPages(rules, update);
      middleSum += fixedUpdate[Math.floor(fixedUpdate.length / 2)];
    }
  });

  return middleSum;
}

const filename = process.argv[2];
if (!filename) {
  console.error("Please provide a filename");
  process.exit(1);
}

const input = fs.readFileSync(filename, "utf-8");
const lines = input.split("\n").filter(Boolean);

const rules: number[][] = [];
const updates: number[][] = [];
lines.forEach((line) => {
  if (line.includes("|")) {
    const [a, b] = line.split("|").map(Number);
    rules.push([a, b]);
  } else {
    const update = line.split(",").map(Number);
    updates.push(update);
  }
});

console.log(part1(rules, updates));
console.log(part2(rules, updates));

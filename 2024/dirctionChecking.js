function checkDirections(locX, locY, grid, direction) {
  let y = locY;
  let x = locX;

  switch (direction) {
    case "N":
      y--;
      break;
    case "W":
      x--;
      break;
    case "S":
      y++;
      break;
    case "E":
      x++;
      break;
    default:
      throw new Error("Undefined direction");
  }

  if (y < 0 || y > grid.length || x < 0 || x > grid[0].length) {
    return [undefined, undefined];
  }

  return [x, y];
}


//Use when necessary
const [newX, newY] = checkDirections(0, 0, grid, "N");
if (!newX || !newY) {
  //continue;
}
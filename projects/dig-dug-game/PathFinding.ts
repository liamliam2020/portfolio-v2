
let successors = (root: any, m: any) => {
  let connectedCells = [
    [root[0] - 1, root[1]],
    [root[0], root[1] - 1],
    [root[0] + 1, root[1]],
    [root[0], root[1] + 1]
  ]

  const validCells = connectedCells.filter(
    (cell) => (
      cell[0] >= 0 && cell[0] < m.length 
      && cell[1] >= 0 && cell[1] < m[0].length)
  )

  const successors = validCells.filter(
    (cell) => (m[cell[0]][cell[1]] <= 1)
  )

  return successors
}

const buildPath = (traversalTree: any, to: any) => {
  let path = [to]
  let parent = traversalTree[to]
  while (parent) {
    path.push(parent)
    parent = traversalTree[parent]
  }
  return path.reverse()
}

export const findPath = (startLocation: Array<number>, targetLocation: Array<number>, board: Array<Array<number>>) => {  
  let queue = [];
  let visited = new Set;
  let traversalTree: any = []
  queue.push(startLocation)

  while(queue.length) {
    let subtreeRoot: any = queue.shift()
    visited.add(subtreeRoot.toString())

    if (subtreeRoot.toString() === targetLocation.toString()){
      return buildPath(traversalTree, targetLocation).at(1)
    }

    for (let child of successors(subtreeRoot, board) as any) {
      if (!visited.has(child.toString())){
        traversalTree[child] = subtreeRoot
        queue.push(child)
      }
    }
  }
};

// thanks Stackover flow for this easy implementation of BFS :) https://stackoverflow.com/questions/55239386/finding-shortest-path-in-two-dimensional-array-javascript
// adapted a solution after reading this nice article about BFS: https://levelup.gitconnected.com/finding-the-shortest-path-in-javascript-pt-1-breadth-first-search-67ae4653dbec
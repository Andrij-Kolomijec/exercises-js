function Graph() {
  return {
    chessBoard: new Map(),

    addVertices(size = 8) {
      /* uses a nested loop to create square board positions
      and initializes their neighbors as empty arrays */
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          /* keys need to be set as a string or else 
          the get() in addEdges() does not work */
          this.chessBoard.set(`${[i, j]}`, []);
        }
      }
    },

    /* connects all board squares based on 
    knight's move pattern */
    addEdges(board = this.chessBoard) {
      for (let [position] of board) {
        const arr = position.split(",");
        const x = parseInt(arr[0]);
        const y = parseInt(arr[1]);
        // keys are based on clock positions
        const direction = {
          1: [x + 1, y + 2],
          2: [x + 2, y + 1],
          4: [x + 2, y - 1],
          5: [x + 1, y - 2],
          7: [x - 1, y - 2],
          8: [x - 2, y - 1],
          10: [x - 2, y + 1],
          11: [x - 1, y + 2],
        };
        /* calculates the new position after a knight move,
        converts it to a string, and checks if 
        the new position exists on the board. */
        for (let clock in direction) {
          const move = direction[clock].toString();
          if (board.has(move) && !board.get(position).includes(move)) {
            /* adds the new positions of the next possible
            moves from the current position on the board */
            this.chessBoard.get(position).push(move);
          }
        }
      }
    },
    // uses breadth-first search algorithm
    knightMoves(start, end) {
      const paths = [];
      const visited = new Set();
      const queue = [];
      /* enqueue the starting position and its path */
      queue.push([start, [start]]);
      while (queue.length > 0) {
        /* dequeue a position and its 
        path from the front of the queue */
        let [current, path] = queue.shift();
        /* mark the current position as visited */
        visited.add(current);
        /* check if desired position is the same as current */
        if (current === end) {
          /* if yes, add the path to the list of possible paths */
          paths.push(path);
        }
        /* get the neighbors of the current 
        position from the chess board */
        const neighbors = this.chessBoard.get(current);
        /* for each neighbor, if it hasn't been 
        visited, a new path is created by appending 
        the neighbor to the current path */
        for (let position of neighbors) {
          /* check if the neighbor has not been visited */
          if (!visited.has(position)) {
            /* Enqueue the neighbor and its path 
            (path so far + the neighbor) */
            queue.push([position, [...path, position]]);
          }
        }
      }
      console.log(`Fastest Routes from ${start} to ${end}`);
      paths.forEach((element) => console.log(element));
    },
  };
}

const g = new Graph();
console.log(g);
g.addVertices();
g.addEdges();
g.knightMoves("0,0", "1,2");
g.knightMoves("3,1", "2,2");
g.knightMoves("7,7", "7,6");

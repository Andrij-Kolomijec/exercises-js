function Node(value, left = null, right = null) {
  return { value, left, right };
}

function Tree(arr) {
  // Remove duplicates and sort array
  arr = [...new Set(arr.sort((a, b) => a - b))];
  return {
    root: buildTree(arr),

    insert(value, root = this.root) {
      if (!root) {
        root = Node(value);
        return root;
      }
      if (value < root.value) {
        root.left = this.insert(value, root.left);
      } else if (value > root.value) {
        root.right = this.insert(value, root.right);
      }
      return root;
    },

    delete(value, root = this.root) {
      if (!root) return root;
      // traverse down the node tree
      if (value < root.value) {
        root.left = this.delete(value, root.left);
      } else if (value > root.value) {
        root.right = this.delete(value, root.right);
        // value matches
        // delete one child node
      } else {
        // changes the pointers
        if (!root.right) {
          return root.left;
        } else if (!root.left) {
          return root.right;
          // delete two child nodes
        } else {
          const minValue = function findNextSmallestRightValue(root) {
            let min = root.value;
            let newRoot = root;
            // search for a next smallest childless node
            while (newRoot.left) {
              min = root.left.value;
              newRoot = root.left;
            }
            return min;
          };
          root.value = minValue(root.right);
          root.right = this.delete(root.value, root.right);
        }
      }
      return root;
    },

    find(value, root = this.root) {
      if (root.value === value || !root) return root;
      if (value < root.value) return this.find(value, root.left);
      return this.find(value, root.right);
    },

    // breadth-first traversal
    levelOrder(arr = [], queue = [], root = this.root) {
      if (!root) return;
      arr.push(root.value);
      queue.push(root.left);
      queue.push(root.right);
      while (queue.length) {
        const level = queue[0];
        queue.shift();
        this.levelOrder(arr, queue, level);
      }
      return arr;
    },

    // depth-first traversal
    // left-root-right
    inOrder(arr = [], root = this.root) {
      if (!root) return;
      if (root.left) this.inOrder(arr, root.left);
      arr.push(root.value);
      if (root.right) this.inOrder(arr, root.right);
      return arr;
    },
    // root-left-right
    preOrder(arr = [], root = this.root) {
      if (!root) return;
      arr.push(root.value);
      if (root.left) this.inOrder(arr, root.left);
      if (root.right) this.inOrder(arr, root.right);
      return arr;
    },
    // left-right-root
    postOrder(arr = [], root = this.root) {
      if (!root) return;
      if (root.left) this.inOrder(arr, root.left);
      if (root.right) this.inOrder(arr, root.right);
      arr.push(root.value);
      return arr;
    },

    // performs callback function for every element in array
    // accepts traversal method as a string
    order(method, callback = null) {
      if (!callback) return this[method]();
      return this[method]().map((n) => callback(n));
    },

    height(root = this.root) {
      if (!root) return 0;
      let leftEdgeHeight = this.height(root.left);
      let rightEdgeHeight = this.height(root.right);
      if (leftEdgeHeight > rightEdgeHeight) {
        return leftEdgeHeight + 1;
      } else {
        return rightEdgeHeight + 1;
      }
    },

    depth(node, root = this.root, depth = 0) {
      node = this.find(node);
      if (!root || !node) return;
      if (node === root) return depth;
      if (node.value < root.value) {
        return this.depth(node.value, root.left, depth + 1);
      } else {
        return this.depth(node.value, root.right, depth + 1);
      }
    },

    isBalanced(root = this.root) {
      let leftEdgeHeight = this.height(root.left);
      let rightEdgeHeight = this.height(root.right);
      return Math.abs(leftEdgeHeight - rightEdgeHeight) < 2;
    },

    rebalance(root = this.root) {
      let arr = this.levelOrder([], [], root);
      arr.sort((a, b) => a - b);
      return (this.root = buildTree(arr));
    },

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        this.prettyPrint(
          node.right,
          `${prefix}${isLeft ? "│   " : "    "}`,
          false
        );
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
      if (node.left !== null) {
        this.prettyPrint(
          node.left,
          `${prefix}${isLeft ? "    " : "│   "}`,
          true
        );
      }
    },
  };
}

// buildTree returns root node at level 0
function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const root = Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  return root;
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = Tree(arr);
console.log(tree);
tree.prettyPrint();
function multiplyByTwo(n) {
  return n * 2;
}
console.log(tree.order("levelOrder", multiplyByTwo));
console.log(tree.depth(324));

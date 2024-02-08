class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // Base case: If the array is empty, return null (empty tree)
    if (array.length === 0) {
      return null;
    }

    // Remove duplicates and sort the array in ascending order
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);

    // Find the index of the middle element
    const mid = Math.floor(sortedArray.length / 2);

    // Create a new node with the middle element as the root
    const node = new Node(sortedArray[mid]);

    // Recursively build the left subtree with elements to the left of the middle
    node.left = this.buildTree(sortedArray.slice(0, mid));

    // Recursively build the right subtree with elements to the right of the middle
    node.right = this.buildTree(sortedArray.slice(mid + 1));

    return node;
  }

  insert(value, node = this.root) {
    // Base case: If the current node is null, create a new node with the given value
    if (node === null) {
      return new Node(value);
    }

    // Compare the value to the current node's data
    if (value < node.data) {
      // If the value is smaller, recursively insert into the left subtree
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      // If the value is larger, recursively insert into the right subtree
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  delete(value, node = this.root) {
    if (node === null) {
      return node;
    }

    // Search for the node to delete
    if (value < node.data) {
      node.left = this.delete(value, node.left);
    } else if (value > node.data) {
      node.right = this.delete(value, node.right);
    } else {
      // Node to be deleted found

      // Case 1: Node with only one child or no child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Case 3: Node with two children
      // Find the in-order successor (smallest node in the right subtree)
      let successor = node.right;
      while (successor.left !== null) {
        successor = successor.left;
      }

      // Replace the node's data with the in-order successor's data
      node.data = successor.data;

      // Delete the in-order successor
      node.right = this.delete(successor.data, node.right);
    }

    return node;
  }

  find(value, node = this.root) {
    // Base case: If the node is null, the value is not present in the tree
    if (node === null) {
      return null;
    }

    // Compare the value to the current node's data
    if (value === node.data) {
      return node;
    } else if (value < node.data) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }

  levelOrder(callback) {
    // Base case: If the tree is empty, return an empty array
    if (!this.root) {
      return [];
    }

    const queue = [this.root]; // Initialize a queue with the root node
    const results = []; // Array to store the nodes at each level

    while (queue.length) {
      let level = []; // Array to store nodes at the current level
      let size = queue.length;

      // Process nodes at the current level
      for (let i = 0; i < size; i++) {
        const node = queue.shift(); // Dequeue a node from the front of the queue
        level.push(node.data); // Collect node values at the current level

        // Enqueue left and right children if they exist
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }

        // Invoke the callback function if provided
        if (callback) {
          callback(node);
        }
      }

      // Store nodes at the current level in the results array
      results.push(level);
    }

    // If no callback is provided, return an array of node values at each level
    if (!callback) {
      return results;
    }
  }

  // left root right
  inOrder(callback) {
    // Base case: If the tree is empty, return an empty array
    if (!this.root) {
      return [];
    }

    const results = [];

    // Recursive function to traverse the tree in in-order
    const traverse = (node) => {
      // Recursively traverse the left subtree
      if (node.left) {
        traverse(node.left);
      }

      // Process the current node
      results.push(node.data);

      // Recursively traverse the right subtree
      if (node.right) {
        traverse(node.right);
      }
    };

    // Start the traversal from the root
    traverse(this.root);

    if (!callback) {
      return results;
    }

    // Invoke the callback on each visited node
    results.forEach(callback);

    return [];
  }

  // root left right
  preOrder(callback) {
    // Base case: If the tree is empty, return an empty array
    if (!this.root) {
      return [];
    }

    const stack = [this.root];
    const results = [];

    while (stack.length) {
      const node = stack.pop();

      // Process the current node
      results.push(node.data);

      // Push right child onto stack first to ensure left child is processed first
      if (node.right) {
        stack.push(node.right);
      }
      if (node.left) {
        stack.push(node.left);
      }

      if (callback) {
        callback(node);
      }
    }

    if (!callback) {
      return results;
    }
  }

  // left right root
  postOrder(callback) {
    // Base case: If the tree is empty, return an empty array
    if (!this.root) {
      return [];
    }

    const stack = [this.root];
    const results = [];

    while (stack.length) {
      const node = stack.pop();

      // Push the current node's value to the results array
      results.push(node.data);

      // Push left child onto stack first to ensure right child is processed first
      if (node.left) {
        stack.push(node.left);
      }
      if (node.right) {
        stack.push(node.right);
      }

      if (callback) {
        callback(node);
      }
    }

    if (!callback) {
      return results.reverse();
    }
  }

  // Height is defined as the number of edges in longest path from a given node to a leaf node
  height(node = this.root) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Depth of a node is the number of edges from the node to the tree's root node
  depth(node, root = this.root, level = 0) {
    if (!node) return null;
    if (root === null) return 0;
    if (root.data === node.data) return level;

    let count = this.depth(node, root.left, level + 1);
    if (count !== 0) return count;

    return this.depth(node, root.right, level + 1);
  }

  isBalanced(node = this.root) {
    if (node === null) return true;
    const heightDiff = Math.abs(
      this.height(node.left) - this.height(node.right)
    );
    return (
      heightDiff <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    if (this.root === null) return;
    const sorted = [...new Set(this.inorder().sort((a, b) => a - b))];
    this.root = this.buildTree(sorted);
  }

  prettyPrint() {
    prettyPrint(this.root);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const divider = () => {
  console.log("\n", "------------------------------------", "\n");
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const balancedTree = new Tree(array);

console.log("Printing tree");
balancedTree.prettyPrint();
divider();

balancedTree.insert(10);

console.log("Inserting 10 to tree");
balancedTree.prettyPrint();
divider();

balancedTree.delete(67);

console.log("Deleting 23 from tree");
balancedTree.prettyPrint();
divider();

balancedTree.delete(1);

console.log("Deleting 1 from tree");
balancedTree.prettyPrint();
divider();

console.log(`Finding 7: ${balancedTree.find(7)}`);
console.log(`Finding 12121212: ${balancedTree.find(12121212)}`);

console.log(`Level order: ${balancedTree.levelOrder()}`);

console.log(`In order: ${balancedTree.inOrder()}`);

console.log(`Pre order: ${balancedTree.preOrder()}`);

console.log(`Post order: ${balancedTree.postOrder()}`);

const targetNode = balancedTree.find(9);

console.log(`Height of tree: ${balancedTree.height(balancedTree.find(23))}`);

console.log(`Depth of tree: ${balancedTree.depth(balancedTree.find(5))}`);

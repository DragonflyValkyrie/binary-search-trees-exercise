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

  levelOrder(callback) {}

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}

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

console.log(balancedTree.find(7));
console.log(balancedTree.find(12121212));

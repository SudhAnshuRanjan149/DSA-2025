/****************************************************************************************
 * TREE — COMPLETE NOTES (BEGINNER → ADVANCED)
 ****************************************************************************************/


/* --------------------------------------------------------------------------------------
   1. WHAT IS A TREE?
   --------------------------------------------------------------------------------------
   - A **Tree** is a non-linear hierarchical data structure.
   - Unlike arrays, stacks, queues, and linked lists, which are linear → trees branch.
   - A tree is a collection of nodes connected by edges, with exactly one root node.

   BASIC TERMS:
   - Root: topmost node
   - Parent: node that has children
   - Child: node under a parent
   - Sibling: children of the same parent
   - Leaf (external node): node with no children
   - Internal node: node with >= 1 child
   - Height: longest path from node → leaf
   - Depth: distance from node → root
   - Subtree: any node + all its descendants

   GENERAL PROPERTIES:
   - A tree with N nodes always has N−1 edges.
-----------------------------------------------------------------------------------------*/


/****************************************************************************************
 * 2. TYPES OF TREES
 ****************************************************************************************

   (A) **Binary Tree**
       Each node has ≤ 2 children:
       left and right.

   (B) **Binary Search Tree (BST)**
       A binary tree with ordered property:
       - Left subtree contains values < node value
       - Right subtree contains values > node value

   (C) **AVL Tree** - (Adelson-Velsky and Landis Tree)
       Self-balancing BST:
       |height(left) – height(right)| ≤ 1 for every node.

   (D) **Red-Black Tree**
       Self-balancing BST with color rules:
       - Every node is red or black
       - No two red neighbors
       - Ensures height is O(log n)

   (E) **Heap (Binary Heap)**
       Complete binary tree:
       - Max heap → parent ≥ children
       - Min heap → parent ≤ children

   (F) **Trie (Prefix Tree)**
       Used for string/dictionary operations.

   (G) **Segment Tree**
       Used for range queries and updates.

****************************************************************************************/


/****************************************************************************************
 * 3. BINARY TREE NODE STRUCTURE (JavaScript)
 ****************************************************************************************/

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}


/****************************************************************************************
 * 4. BINARY TREE TRAVERSALS
 ****************************************************************************************
 *
 * A. Depth-First Search (DFS)
 *    1. Preorder   → root, left, right
 *    2. Inorder    → left, root, right
 *    3. Postorder  → left, right, root
 *
 * B. Breadth-First Search (BFS)
 *    Level-order traversal using a queue.
 ****************************************************************************************/


/* --------------------------------------------------------------------------------------
   4.1 PREORDER TRAVERSAL (DFS)
-----------------------------------------------------------------------------------------*/

function preorder(root) {
  if (!root) return;
  console.log(root.value);
  preorder(root.left);
  preorder(root.right);
}


/* --------------------------------------------------------------------------------------
   4.2 INORDER TRAVERSAL (DFS) → used heavily in BSTs
-----------------------------------------------------------------------------------------*/

function inorder(root) {
  if (!root) return;
  inorder(root.left);
  console.log(root.value);
  inorder(root.right);
}


/* --------------------------------------------------------------------------------------
   4.3 POSTORDER TRAVERSAL (DFS)
-----------------------------------------------------------------------------------------*/

function postorder(root) {
  if (!root) return;
  postorder(root.left);
  postorder(root.right);
  console.log(root.value);
}


/* --------------------------------------------------------------------------------------
   4.4 LEVEL-ORDER TRAVERSAL (BFS)
-----------------------------------------------------------------------------------------*/

function levelOrder(root) {
  if (!root) return;

  const queue = [root];

  while (queue.length) {
    const node = queue.shift();
    console.log(node.value);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}


/****************************************************************************************
 * 5. BINARY SEARCH TREE (BST) — IMPLEMENTATION
 ****************************************************************************************/

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new TreeNode(value);

    if (!this.root) {
      this.root = node;
      return;
    }

    let curr = this.root;

    while (true) {
      if (value < curr.value) {
        if (!curr.left) {
          curr.left = node;
          break;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = node;
          break;
        }
        curr = curr.right;
      }
    }
  }

  search(value) {
    let curr = this.root;

    while (curr) {
      if (value === curr.value) return true;
      curr = value < curr.value ? curr.left : curr.right;
    }
    return false;
  }
}


/****************************************************************************************
 * 6. BST DELETE OPERATION (Important Interview Concept)
 *    - Three cases:
 *      Case 1: Node to delete is a leaf
 *      Case 2: Node has one child
 *      Case 3: Node has two children → replace with inorder successor
 ****************************************************************************************/

function deleteNode(root, key) {
  if (!root) return null;

  if (key < root.value) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.value) {
    root.right = deleteNode(root.right, key);
  } else {
    // Case 1: Leaf
    if (!root.left && !root.right) return null;

    // Case 2: One child
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Case 3: Two children → find inorder successor
    let successor = root.right;
    while (successor.left) successor = successor.left;

    root.value = successor.value;
    root.right = deleteNode(root.right, successor.value);
  }

  return root;
}


/****************************************************************************************
 * 7. HEIGHT & DEPTH
 ****************************************************************************************/

// Height of tree
function height(root) {
  if (!root) return 0;
  return 1 + Math.max(height(root.left), height(root.right));
}

// Minimum depth
function minDepth(root) {
  if (!root) return 0;
  let left = minDepth(root.left);
  let right = minDepth(root.right);

  if (!left) return right + 1;
  if (!right) return left + 1;
  return Math.min(left, right) + 1;
}


/****************************************************************************************
 * 8. BALANCED BINARY TREE (Check if balanced)
 ****************************************************************************************/

function isBalanced(root) {
  function check(node) {
    if (!node) return 0;

    let left = check(node.left);
    if (left === -1) return -1;

    let right = check(node.right);
    if (right === -1) return -1;

    if (Math.abs(left - right) > 1) return -1;

    return 1 + Math.max(left, right);
  }

  return check(root) !== -1;
}


/****************************************************************************************
 * 9. BINARY HEAP (Min Heap Implementation)
 *    - A complete tree stored in array
 *    - Parent index = Math.floor((i - 1) / 2)
 *    - Left child = 2i + 1
 *    - Right child = 2i + 2
 ****************************************************************************************/

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let i = this.heap.length - 1;

    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);

      if (this.heap[i] >= this.heap[parent]) break;

      [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
      i = parent;
    }
  }

  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return min;
  }

  bubbleDown() {
    let i = 0;
    let length = this.heap.length;

    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;

      if (smallest === i) break;

      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}


/****************************************************************************************
 * 10. TRIE (Prefix Tree) IMPLEMENTATION
 ****************************************************************************************/

class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let curr = this.root;
    for (let ch of word) {
      if (!curr.children[ch]) curr.children[ch] = new TrieNode();
      curr = curr.children[ch];
    }
    curr.isEnd = true;
  }

  search(word) {
    let curr = this.root;
    for (let ch of word) {
      if (!curr.children[ch]) return false;
      curr = curr.children[ch];
    }
    return curr.isEnd;
  }

  startsWith(prefix) {
    let curr = this.root;
    for (let ch of prefix) {
      if (!curr.children[ch]) return false;
      curr = curr.children[ch];
    }
    return true;
  }
}


/****************************************************************************************
 * 11. CLASSIC TREE INTERVIEW PROBLEMS
 ****************************************************************************************

   1. Find maximum depth
   2. Check if tree is symmetric
   3. Path-sum problems
   4. Lowest Common Ancestor (LCA)
   5. Diameter of tree
   6. Convert sorted array → BST
   7. Validate BST correctness
   8. Count nodes in complete tree

****************************************************************************************/


/* --------------------------------------------------------------------------------------
   11.1 LOWEST COMMON ANCESTOR (LCA) — BST version
-----------------------------------------------------------------------------------------*/

function lowestCommonAncestor(root, p, q) {
  while (root) {
    if (p.value < root.value && q.value < root.value) root = root.left;
    else if (p.value > root.value && q.value > root.value) root = root.right;
    else return root;
  }
}


/* --------------------------------------------------------------------------------------
   11.2 DIAMETER OF BINARY TREE — longest path between any two nodes
-----------------------------------------------------------------------------------------*/

function diameter(root) {
  let max = 0;

  function depth(node) {
    if (!node) return 0;

    let left = depth(node.left);
    let right = depth(node.right);

    max = Math.max(max, left + right);

    return 1 + Math.max(left, right);
  }

  depth(root);
  return max;
}


/****************************************************************************************
 * END OF TREE NOTES
 * Ask for the next DSA topic such as Graphs, Hashing, DP, or Advanced Trees (AVL/RB).
 ****************************************************************************************/

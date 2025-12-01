/****************************************************************************************
 * HEAP — COMPLETE NOTES (BEGINNER → ADVANCED)
 * Entire explanation is inside this JavaScript code block using comments only.
 ****************************************************************************************/


/*========================================================================================
 1. WHAT IS A HEAP?
========================================================================================*/
//
// A **Heap** is a complete binary tree (all levels filled left → right).
// It is mainly used to efficiently fetch the **min** or **max** element.
//
// TWO TYPES:
// ----------
// • Min-Heap → smallest element at root
// • Max-Heap → largest element at root
//
// KEY PROPERTY:
// -------------
// For Min-Heap:
//      parent <= children
//
// For Max-Heap:
//      parent >= children
//
// NOT SORTED — only top element follows heap rule.
//
// STORAGE:
// --------
// Usually stored as an array, NOT nodes.
//
// INDEX RELATIONS (0-based):
// --------------------------
// parent(i)      = Math.floor((i - 1) / 2)
// leftChild(i)   = 2*i + 1
// rightChild(i)  = 2*i + 2
//
// TIME COMPLEXITY:
// ----------------
// Insert     → O(log n)
// Delete top → O(log n)
// Peek       → O(1)
// Build heap → O(n)
//
// USE CASES:
// ----------
// ✔ Priority Queue  
// ✔ Dijkstra’s algorithm  
// ✔ Top-K problems  
// ✔ Scheduling  
// ✔ Heap sort  
// ✔ Streaming median  
// ✔ Merging sorted lists  
// ✔ Frequency counting  
//



/*========================================================================================
 2. MIN-HEAP IMPLEMENTATION (ARRAY-BASED)
========================================================================================*/

class MinHeap {
  constructor() {
    this.data = [];
  }

  // GET INDEX HELPERS
  parent(i) { return Math.floor((i - 1) / 2); }
  left(i)   { return 2 * i + 1; }
  right(i)  { return 2 * i + 2; }

  // SWAP
  swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }


  /*------------------------------------------------------------------------------
    INSERT(value)
    Steps:
      1. Push value at end
      2. Bubble up until parent is smaller
  ------------------------------------------------------------------------------*/
  insert(value) {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  bubbleUp(i) {
    while (i > 0 && this.data[this.parent(i)] > this.data[i]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }


  /*------------------------------------------------------------------------------
    REMOVE MIN (extractMin)
    Steps:
      1. Swap root with last element
      2. Pop last
      3. Bubble down the new root
  ------------------------------------------------------------------------------*/
  extractMin() {
    if (this.data.length === 0) return null;
    if (this.data.length === 1) return this.data.pop();

    const min = this.data[0];
    this.data[0] = this.data.pop();
    this.bubbleDown(0);

    return min;
  }

  bubbleDown(i) {
    let smallest = i;
    let left = this.left(i);
    let right = this.right(i);

    if (left < this.data.length && this.data[left] < this.data[smallest]) {
      smallest = left;
    }
    if (right < this.data.length && this.data[right] < this.data[smallest]) {
      smallest = right;
    }

    if (smallest !== i) {
      this.swap(i, smallest);
      this.bubbleDown(smallest);
    }
  }

  // Peek minimum element
  peek() {
    return this.data[0] ?? null;
  }
}



/*========================================================================================
 3. MAX-HEAP IMPLEMENTATION (Array-based)
========================================================================================*/

class MaxHeap {
  constructor() {
    this.data = [];
  }

  parent(i) { return Math.floor((i - 1) / 2); }
  left(i)   { return 2 * i + 1; }
  right(i)  { return 2 * i + 2; }

  swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  insert(value) {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  bubbleUp(i) {
    while (i > 0 && this.data[this.parent(i)] < this.data[i]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  extractMax() {
    if (this.data.length === 0) return null;
    if (this.data.length === 1) return this.data.pop();

    const max = this.data[0];
    this.data[0] = this.data.pop();
    this.bubbleDown(0);

    return max;
  }

  bubbleDown(i) {
    let largest = i;
    let left = this.left(i);
    let right = this.right(i);

    if (left < this.data.length && this.data[left] > this.data[largest]) {
      largest = left;
    }
    if (right < this.data.length && this.data[right] > this.data[largest]) {
      largest = right;
    }

    if (largest !== i) {
      this.swap(i, largest);
      this.bubbleDown(largest);
    }
  }

  peek() {
    return this.data[0] ?? null;
  }
}



/*========================================================================================
 4. HEAPIFY (Convert array → heap in O(n))
========================================================================================*/
//
// A fast method to turn an array into a heap.
// Start from last non-leaf node, bubble down each.
//
function heapify(arr) {
  const heap = new MinHeap();
  heap.data = arr.slice();

  let start = Math.floor(arr.length / 2) - 1;

  for (let i = start; i >= 0; i--) {
    heap.bubbleDown(i);
  }

  return heap;
}



/*========================================================================================
 5. PRIORITY QUEUE USING HEAP
========================================================================================*/

class PriorityQueue {
  constructor() {
    this.heap = new MinHeap();
  }

  enqueue(value) {
    this.heap.insert(value);
  }

  dequeue() {
    return this.heap.extractMin();
  }

  peek() {
    return this.heap.peek();
  }

  isEmpty() {
    return this.heap.data.length === 0;
  }
}



/*========================================================================================
 6. HEAP SORT (Using MinHeap or MaxHeap)
========================================================================================*/
//
// For ascending sort → use MinHeap
//
function heapSortAsc(arr) {
  const heap = heapify(arr);
  const result = [];

  while (heap.data.length) {
    result.push(heap.extractMin());
  }

  return result;
}



///////////////////////////////////////////////////////////////////////////////////////////
//                               HEAP INTERVIEW PATTERNS
///////////////////////////////////////////////////////////////////////////////////////////


/*========================================================================================
 7. TOP-K PATTERN (Very important)
========================================================================================*/
//
// Use a MIN-HEAP of size K to maintain top K largest elements.
//
// LEETCODE QUESTIONS:
// --------------------
// 1. LC 215 — Kth Largest Element in Array
// 2. LC 347 — Top K Frequent Elements
// 3. LC 973 — K Closest Points to Origin



/*========================================================================================
 8. MERGING SORTED STRUCTURES
========================================================================================*/
//
// Use a MIN-HEAP to always extract the smallest among many lists.
//
// LEETCODE QUESTIONS:
// --------------------
// 1. LC 23 — Merge K Sorted Lists
// 2. LC 378 — Kth Smallest in Sorted Matrix
// 3. LC 1439 — Kth Smallest Sum of a Matrix With Sorted Rows



/*========================================================================================
 9. DIJKSTRA'S SHORTEST PATH (Graph + Priority Queue)
========================================================================================*/
//
// The priority queue picks minimal distance node first.
//
// LEETCODE QUESTIONS:
// --------------------
// 1. LC 743 — Network Delay Time
// 2. LC 1631 — Path with Minimum Effort
// 3. LC 787 — Cheapest Flights Within K Stops



/*========================================================================================
 10. STREAMING DATA (Running Median)
========================================================================================*/
//
// Use TWO HEAPS:
//    • max-heap → smaller half
//    • min-heap → larger half
//
// LEETCODE QUESTIONS:
// --------------------
// 1. LC 295 — Find Median from Data Stream
// 2. LC 480 — Sliding Window Median
// 3. LC 703 — Kth Largest in a Stream



/*========================================================================================
 11. FREQUENCY & GREEDY PATTERNS
========================================================================================*/
//
// Use heap to pick max/min frequency item.
//
// LEETCODE QUESTIONS:
// --------------------
// 1. LC 621 — Task Scheduler
// 2. LC 767 — Reorganize String
// 3. LC 1405 — Longest Happy String



/*========================================================================================
 12. HEAP VS OTHER STRUCTURES (Quick Comparison)
========================================================================================*/
//
// STRUCTURE     INSERT   DELETE   SEARCH   GET-MIN/MAX   ORDERED?
// -------------------------------------------------------------------
// Heap          O(log n) O(log n) O(n)     O(1)           No
// BST           O(log n) O(log n) O(log n) O(log n)       Yes
// Sorted array  O(n)     O(n)     O(log n) O(1 or n)      Yes
// Unsorted arr  O(1)     O(n)     O(n)     O(n)           No



/****************************************************************************************
 * END OF HEAP NOTES
 * Next topic? (Priority Queue, Graph patterns, AVL Tree, DP, Backtracking, etc.)
 ****************************************************************************************/

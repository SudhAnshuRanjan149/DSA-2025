/****************************************************************************************
 * QUEUE — COMPLETE NOTES (BEGINNER → ADVANCED)
 ****************************************************************************************/


/* --------------------------------------------------------------------------------------
   1. WHAT IS A QUEUE?
   --------------------------------------------------------------------------------------
   - A Queue is a linear data structure based on **FIFO (First In, First Out)**.
   - Example: People standing in a line.
       • Enqueue → Add at the BACK
       • Dequeue → Remove from the FRONT
       • Only the front element is removed first.

   MAIN OPERATIONS:
   - enqueue(x)  → insert element at end
   - dequeue()   → remove element from front
   - peek()      → view first element
   - isEmpty()
   - size()

   TIME COMPLEXITY:
   - Enqueue: O(1)
   - Dequeue: O(1)
   - Peek:    O(1)
-----------------------------------------------------------------------------------------*/


/****************************************************************************************
 * 2. QUEUE USING ARRAY (Simple Implementation)
 ****************************************************************************************/

class QueueArray {
  constructor() {
    // Using array but note: shift() is O(n), so this is not optimal.
    this.queue = [];
  }

  enqueue(value) {
    this.queue.push(value); // O(1)
  }

  dequeue() {
    return this.queue.shift(); // O(n) → not ideal for large data
  }

  peek() {
    return this.queue[0];
  }

  size() {
    return this.queue.length;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}


/****************************************************************************************
 * 3. OPTIMIZED QUEUE USING OBJECT (Avoid O(n) shift cost)
 ****************************************************************************************/

class QueueOptimal {
  constructor() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.items[this.rear] = value;
    this.rear++;
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const val = this.items[this.front];
    delete this.items[this.front];
    this.front++;
    return val;
  }

  peek() {
    return this.items[this.front];
  }

  size() {
    return this.rear - this.front;
  }

  isEmpty() {
    return this.size() === 0;
  }
}


/****************************************************************************************
 * 4. QUEUE USING LINKED LIST (Most Optimal Structural Implementation)
 ****************************************************************************************/

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class QueueLL {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }

  // Add at end — O(1)
  enqueue(value) {
    const node = new Node(value);
    if (this.rear) this.rear.next = node;
    this.rear = node;
    if (!this.front) this.front = node;
    this.length++;
  }

  // Remove from front — O(1)
  dequeue() {
    if (!this.front) return null;

    const val = this.front.value;
    this.front = this.front.next;

    if (!this.front) this.rear = null; // queue became empty
    this.length--;

    return val;
  }

  peek() {
    return this.front ? this.front.value : null;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }
}


/****************************************************************************************
 * 5. TYPES OF QUEUES
 ****************************************************************************************
 *
 * A. Simple Queue
 *    FIFO queue → normal queue.
 *
 * B. Circular Queue
 *    Uses a fixed-size array but wraps around (modulo indexing).
 *    Prevents wasted space after dequeue operations.
 *
 * C. Priority Queue
 *    Highest priority element is removed first (not FIFO).
 *
 * D. Double Ended Queue (Deque)
 *    Insert/remove elements from BOTH ends.
 *
 ****************************************************************************************/


/****************************************************************************************
 * 6. CIRCULAR QUEUE IMPLEMENTATION (Very Important for Interviews)
 ****************************************************************************************/

class CircularQueue {
  constructor(capacity) {
    this.queue = new Array(capacity);
    this.capacity = capacity;
    this.front = -1;
    this.rear = -1;
  }

  isEmpty() {
    return this.front === -1;
  }

  isFull() {
    return (this.rear + 1) % this.capacity === this.front;
  }

  enqueue(value) {
    if (this.isFull()) return "Queue is full";

    if (this.isEmpty()) this.front = 0;

    this.rear = (this.rear + 1) % this.capacity;
    this.queue[this.rear] = value;
  }

  dequeue() {
    if (this.isEmpty()) return "Queue is empty";

    const val = this.queue[this.front];

    if (this.front === this.rear) {
      // only one element left
      this.front = this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.capacity;
    }

    return val;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.queue[this.front];
  }
}


/****************************************************************************************
 * 7. PRIORITY QUEUE (Using Min-Heap Concept)
 *    - remove() gives smallest element first
 *    - Often implemented using heaps (O(log n))
 ****************************************************************************************/

class PriorityQueue {
  constructor() {
    this.data = [];
  }

  // Insert element and sort → O(n log n) simple implementation
  enqueue(value) {
    this.data.push(value);
    this.data.sort((a, b) => a - b);
  }

  // Smallest element removed first
  dequeue() {
    return this.data.shift();
  }

  peek() {
    return this.data[0];
  }

  isEmpty() {
    return this.data.length === 0;
  }
}


/****************************************************************************************
 * 8. DEQUE (Double Ended Queue)
 *    - Insert/remove from BOTH front and back
 *    - Used in sliding window problems
 ****************************************************************************************/

class Deque {
  constructor() {
    this.items = [];
  }

  addFront(value) {
    this.items.unshift(value);
  }

  addBack(value) {
    this.items.push(value);
  }

  removeFront() {
    return this.items.shift();
  }

  removeBack() {
    return this.items.pop();
  }

  peekFront() {
    return this.items[0];
  }

  peekBack() {
    return this.items[this.items.length - 1];
  }
}


/****************************************************************************************
 * 9. QUEUE USE CASES (Where Queues Are Needed)
 ****************************************************************************************
 * ✔ Task scheduling
 * ✔ CPU scheduling (round-robin)
 * ✔ Graph BFS traversal
 * ✔ Handling requests in servers
 * ✔ Print queue
 * ✔ Call center systems
 * ✔ Reversing first K elements
 ****************************************************************************************/


/****************************************************************************************
 * 10. CLASSIC QUEUE INTERVIEW PROBLEMS (with solutions)
 ****************************************************************************************/


/* --------------------------------------------------------------------------------------
   10.1 IMPLEMENT STACK USING QUEUES (2 queues)
-----------------------------------------------------------------------------------------*/

class StackUsingQueues {
  constructor() {
    this.q1 = [];
    this.q2 = [];
  }

  push(x) {
    this.q1.push(x);
  }

  pop() {
    if (this.q1.length === 0) return null;

    while (this.q1.length > 1) {
      this.q2.push(this.q1.shift());
    }

    const val = this.q1.shift();

    // swap queues
    [this.q1, this.q2] = [this.q2, this.q1];

    return val;
  }

  peek() {
    if (this.q1.length === 0) return null;

    while (this.q1.length > 1) {
      this.q2.push(this.q1.shift());
    }

    const val = this.q1[0];
    this.q2.push(this.q1.shift());

    [this.q1, this.q2] = [this.q2, this.q1];

    return val;
  }
}


/* --------------------------------------------------------------------------------------
   10.2 BFS (Breadth-First Search) uses Queue
-----------------------------------------------------------------------------------------*/

function bfs(graph, start) {
  const queue = [start];
  const visited = new Set();

  while (queue.length) {
    const node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      console.log(node);

      for (let neighbor of graph[node]) {
        queue.push(neighbor);
      }
    }
  }
}


/* --------------------------------------------------------------------------------------
   10.3 SLIDING WINDOW MAXIMUM (Uses Deque Optimally)
-----------------------------------------------------------------------------------------*/

function maxSlidingWindow(nums, k) {
  const deque = []; // store indexes
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    if (deque.length && deque[0] === i - k) deque.shift();

    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) result.push(nums[deque[0]]);
  }

  return result;
}


/****************************************************************************************
 * 11. QUEUE VS STACK (Quick Comparison)
 ****************************************************************************************
 *
 * STACK → LIFO
 * QUEUE → FIFO
 *
 * STACK uses:
 *    call stacks, DFS, undo operations
 *
 * QUEUE uses:
 *    BFS, job scheduling, buffering, async tasks
 ****************************************************************************************/


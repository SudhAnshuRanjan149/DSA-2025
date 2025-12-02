/****************************************************************************************
 * STACK — COMPLETE NOTES (BEGINNER → ADVANCED)
 ****************************************************************************************/


/*========================================================================================
 1. WHAT IS A STACK?
 ========================================================================================
 - A **Stack** is a linear data structure that follows **LIFO (Last In, First Out)**.
 - Think of stacking plates:
      • Add plate → goes on top (push)
      • Remove plate → taken from top (pop)
 - Only the top element is accessible at any moment.

 MAIN OPERATIONS:
 ----------------
 • push(x)   → Insert item at top  
 • pop()     → Remove top item  
 • peek()    → View top item  
 • isEmpty() → Check if stack is empty  
 • size()    → Number of items  

 TIME COMPLEXITY:
 ----------------
 • push:  O(1)  
 • pop:   O(1)  
 • peek:  O(1)  
 • search: O(n)  

 COMMON USE CASES:
 -----------------
 ✔ Undo/Redo  
 ✔ Recursion (call stack)  
 ✔ Balanced parentheses  
 ✔ Browser back/forward navigation  
 ✔ DFS (Depth First Search)  
✔ Expression evaluation (prefix/postfix)  

****************************************************************************************/


/*========================================================================================
 2. STACK IMPLEMENTATION USING ARRAY (Simple & Fast)
 ========================================================================================*/

class StackArray {
  constructor() {
    this.stack = [];
  }

  // Insert at top
  push(value) {
    this.stack.push(value);
  }

  // Remove top
  pop() {
    return this.stack.pop() ?? null;
  }

  // View top
  peek() {
    return this.stack[this.stack.length - 1] ?? null;
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length;
  }
}


/*========================================================================================
 3. STACK USING LINKED LIST (More efficient memory control)
 ========================================================================================*/

class LLNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class StackLL {
  constructor() {
    this.top = null; // head pointer
    this.length = 0;
  }

  push(value) {
    const node = new LLNode(value);
    node.next = this.top;
    this.top = node;
    this.length++;
  }

  pop() {
    if (!this.top) return null;

    const removed = this.top.value;
    this.top = this.top.next;
    this.length--;
    return removed;
  }

  peek() {
    return this.top ? this.top.value : null;
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }
}


/*========================================================================================
 4. INTERNAL WORKING OF STACK
 ========================================================================================

 - Stack uses top pointer to keep track of last inserted element.
 - When push() → top increases  
 - When pop()  → top decreases  
 - Stack overflow:
      when pushing beyond capacity (in fixed-size stacks)
 - Stack underflow:
      when popping from empty stack  

****************************************************************************************/


/*========================================================================================
 5. TYPES OF STACKS
 ========================================================================================

 (A) **Static Stack**
     - Fixed size (array with fixed capacity)

 (B) **Dynamic Stack**
     - Auto-resizes (JavaScript array)

 (C) **Two Stacks in One Array**
     - One grows from left, one from right
     - Efficient space utilization

 (D) **Min Stack**
     - Stack that can return minimum in O(1)

****************************************************************************************/


/*========================================================================================
 6. MIN STACK IMPLEMENTATION (Get min in O(1))
 ========================================================================================*/

class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = []; // stores running minimums
  }

  push(value) {
    this.stack.push(value);
    if (
      this.minStack.length === 0 ||
      value <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(value);
    }
  }

  pop() {
    const removed = this.stack.pop();
    if (removed === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
    return removed;
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}


/*========================================================================================
 7. CLASSIC STACK INTERVIEW PROBLEMS
 ========================================================================================*/


/*----------------------------------------------------------------------------------------
 7.1 VALID PARENTHESES — O(n)
 ----------------------------------------------------------------------------------------*/

function isValidParentheses(s) {
  const stack = [];
  const map = { ")": "(", "]": "[", "}": "{" };

  for (let ch of s) {
    if (ch in map) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}


/*----------------------------------------------------------------------------------------
 7.2 NEXT GREATER ELEMENT — O(n)
 ----------------------------------------------------------------------------------------*/

function nextGreaterElement(arr) {
  const stack = [];
  const result = new Array(arr.length).fill(-1);

  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = arr[i];
    }
    stack.push(i);
  }

  return result;
}


/*----------------------------------------------------------------------------------------
 7.3 REMOVE ADJACENT DUPLICATES — O(n)
 ----------------------------------------------------------------------------------------*/

function removeDuplicates(s) {
  const stack = [];

  for (let ch of s) {
    if (stack.length && stack[stack.length - 1] === ch) stack.pop();
    else stack.push(ch);
  }

  return stack.join("");
}


/*----------------------------------------------------------------------------------------
 7.4 EVALUATE POSTFIX (RPN) — O(n)
 ----------------------------------------------------------------------------------------*/

function evalRPN(tokens) {
  const stack = [];

  for (let token of tokens) {
    if (!isNaN(token)) {
      stack.push(Number(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case "+": stack.push(a + b); break;
        case "-": stack.push(a - b); break;
        case "*": stack.push(a * b); break;
        case "/": stack.push(Math.trunc(a / b)); break;
      }
    }
  }

  return stack.pop();
}


/*----------------------------------------------------------------------------------------
 7.5 IMPLEMENT QUEUE USING STACKS
 ----------------------------------------------------------------------------------------*/

class QueueUsingStacks {
  constructor() {
    this.s1 = [];
    this.s2 = [];
  }

  enqueue(x) {
    this.s1.push(x);
  }

  dequeue() {
    if (!this.s2.length) {
      while (this.s1.length) {
        this.s2.push(this.s1.pop());
      } 
    }
    return this.s2.pop() || null;
  }
}


/*----------------------------------------------------------------------------------------
 7.6 DAILY TEMPERATURES — O(n) using monotonic stack
 ----------------------------------------------------------------------------------------*/

function dailyTemperatures(temps) {
  const stack = [];
  const result = new Array(temps.length).fill(0);

  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = i - idx;
    }
    stack.push(i);
  }

  return result;
}


/*========================================================================================
 8. STACK VS QUEUE (Quick Comparison)
 ========================================================================================

 STRUCTURE   | ORDER | USE CASE
-------------|--------|-------------------------
 Stack       | LIFO   | Recursion, undo, DFS
 Queue       | FIFO   | BFS, scheduling, buffers

****************************************************************************************/

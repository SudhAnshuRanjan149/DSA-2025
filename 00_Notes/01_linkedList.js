/****************************************************************************************
 * LINKED LIST — COMPLETE NOTES (BEGINNER → ADVANCED)
 ****************************************************************************************/


/* --------------------------------------------------------------------------------------
   1. WHAT IS A LINKED LIST?
   --------------------------------------------------------------------------------------
   - A Linked List is a linear data structure where each element (node) contains:
       1. value  → actual data
       2. next   → pointer to next node in the list

   - Nodes are NOT stored in contiguous memory (unlike arrays).

   ADVANTAGES:
   - Dynamic size
   - Easy insertion/deletion at the beginning or middle (O(1) if you have the reference)

   DISADVANTAGES:
   - Slow access (O(n))
   - Extra memory for pointers
   - Hard to reverse/traverse compared to arrays
-----------------------------------------------------------------------------------------*/


/****************************************************************************************
 * 2. TYPES OF LINKED LISTS
 *
 *  A. Singly Linked List       A → B → C → null
 *  B. Doubly Linked List       null ← A ↔ B ↔ C → null
 *  C. Circular Linked List     A → B → C → (back to A)
 ****************************************************************************************/


/* --------------------------------------------------------------------------------------
   3. NODE STRUCTURES
-----------------------------------------------------------------------------------------*/

// Singly linked list node
class Node {
  constructor(value) {
    this.value = value;   // data stored
    this.next = null;     // pointer to next node
  }
}

// Doubly linked list node
class DoublyNode {
  constructor(value) {
    this.value = value;
    this.prev = null;     // pointer to previous node
    this.next = null;     // pointer to next node
  }
}


/****************************************************************************************
 * 4. SINGLY LINKED LIST IMPLEMENTATION
 ****************************************************************************************/

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;   // track size
  }

  /* INSERTION METHODS */

  // Insert at beginning — O(1)
  prepend(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.length++;
  }

  // Insert at end — O(n) (can be made O(1) if we store a tail pointer)
  append(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
    } else {
      let curr = this.head;
      while (curr.next) curr = curr.next;
      curr.next = node;
    }
    this.length++;
  }

  // Insert at a specific index — O(n)
  insertAt(index, value) {
    if (index < 0 || index > this.length) return;

    if (index === 0) return this.prepend(value);

    const node = new Node(value);
    let prev = this.head;

    for (let i = 0; i < index - 1; i++) {
      prev = prev.next;
    }

    node.next = prev.next;
    prev.next = node;
    this.length++;
  }

  /* DELETION METHODS */

  // Remove head — O(1)
  removeHead() {
    if (!this.head) return null;

    const removedVal = this.head.value;
    this.head = this.head.next;
    this.length--;
    return removedVal;
  }

  // Remove tail — O(n)
  removeTail() {
    if (!this.head) return null;
    if (!this.head.next) {
      const val = this.head.value;
      this.head = null;
      this.length--;
      return val;
    }

    let prev = null;
    let curr = this.head;

    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }

    prev.next = null;
    this.length--;
    return curr.value;
  }

  // Remove at index — O(n)
  removeAt(index) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.removeHead();

    let prev = this.head;
    for (let i = 0; i < index - 1; i++) prev = prev.next;

    const removed = prev.next;
    prev.next = removed.next;
    this.length--;
    return removed.value;
  }

  /* SEARCH METHODS */

  // Find value — O(n)
  find(value) {
    let curr = this.head;
    while (curr) {
      if (curr.value === value) return curr;
      curr = curr.next;
    }
    return null;
  }

  // Get node by index — O(n)
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let curr = this.head;
    for (let i = 0; i < index; i++) curr = curr.next;
    return curr;
  }

  /* UTILITY METHODS */

  // Print values
  print() {
    let curr = this.head;
    let arr = [];
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    console.log(arr.join(" → "));
  }

  // Reverse linked list — O(n)
  reverse() {
    let prev = null;
    let curr = this.head;

    while (curr) {
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    this.head = prev;
  }
}


/****************************************************************************************
 * 5. DOUBLY LINKED LIST IMPLEMENTATION
 *    - Allows backward traversal
 *    - Insert/delete at both ends in O(1)
 ****************************************************************************************/

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Insert at beginning — O(1)
  prepend(value) {
    const node = new DoublyNode(value);

    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }

    this.length++;
  }

  // Insert at end — O(1)
  append(value) {
    const node = new DoublyNode(value);

    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.length++;
  }

  // Remove head — O(1)
  removeHead() {
    if (!this.head) return null;

    const val = this.head.value;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.length--;
    return val;
  }

  // Remove tail — O(1)
  removeTail() {
    if (!this.tail) return null;

    const val = this.tail.value;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.length--;
    return val;
  }
}


/****************************************************************************************
 * 6. CIRCULAR LINKED LIST BASICS
 ****************************************************************************************/

class CircularLinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      node.next = node; // points to itself
    } else {
      let curr = this.head;
      while (curr.next !== this.head) curr = curr.next;
      curr.next = node;
      node.next = this.head;
    }
  }
}


/****************************************************************************************
 * 7. TIME COMPLEXITY SUMMARY
 *
 * ACCESS:        O(n)
 * SEARCH:        O(n)
 * INSERT HEAD:   O(1)
 * INSERT TAIL:   O(n) (or O(1) if tail pointer exists)
 * DELETE HEAD:   O(1)
 * DELETE TAIL:   O(n) (or O(1) in doubly LL)
 * REVERSE:       O(n)
 ****************************************************************************************/


/****************************************************************************************
 * 8. CLASSIC LINKED LIST INTERVIEW PROBLEMS (with solutions)
 ****************************************************************************************/


/* --------------------------------------------------------------------------------------
   8.1 Reverse a Linked List — O(n)
-----------------------------------------------------------------------------------------*/

function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev; // new head
}


/* --------------------------------------------------------------------------------------
   8.2 Detect Cycle in Linked List (Floyd's Algorithm) — O(n)
-----------------------------------------------------------------------------------------*/

function hasCycle(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true;
  }

  return false;
}


/* --------------------------------------------------------------------------------------
   8.3 Remove N-th Node From End (Two pointers) — O(n)
-----------------------------------------------------------------------------------------*/

function removeNthFromEnd(head, n) {
  let dummy = new Node(0);
  dummy.next = head;

  let fast = dummy, slow = dummy;

  while (n--) fast = fast.next;     // move fast n steps ahead
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;       // delete node
  return dummy.next;
}


/* --------------------------------------------------------------------------------------
   8.4 Merge Two Sorted Linked Lists — O(n)
-----------------------------------------------------------------------------------------*/

function mergeLists(l1, l2) {
  let dummy = new Node(0);
  let curr = dummy;

  while (l1 && l2) {
    if (l1.value < l2.value) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  curr.next = l1 || l2;
  return dummy.next;
}

//****************************************************************************************
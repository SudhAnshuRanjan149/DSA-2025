/****************************************************************************************
 * ALL DATA STRUCTURES (BASIC → ADVANCED) WITH CRUD OPERATIONS
 ****************************************************************************************/


/*========================================================================================
 1. ARRAY  (Built-in DS)
========================================================================================*/
//
// CRUD OPERATIONS:
// ----------------
// C → Insert:
//       • push(value)               // insert at end
//       • unshift(value)            // insert at beginning
//       • splice(i, 0, value)       // insert at index
//
// R → Read:
//       • arr[i]                    // access by index
//       • for loop / for-of         // traverse
//
// U → Update:
//       • arr[i] = newValue
//
// D → Delete:
//       • pop()                     // remove end
//       • shift()                   // remove beginning
//       • splice(i, 1)              // delete at index



/*========================================================================================
 2. STRING  (Immutable DS)
========================================================================================*/
//
// CRUD-LIKE operations (Strings are immutable):
//
// C → Create new string:
//       • concatenation (str + 'x')
//       • substring / slice
//
// R → Read:
//       • str[i]
//       • charAt(i)
//       • for-of loop
//
// U → "Update" means create modified string:
//       • replace()
//       • substring operations
//
// D → Delete (not direct):
//       • remove chars using slicing:  str.slice(0, i) + str.slice(i+1)



/*========================================================================================
 3. LINKED LIST  (Singly / Doubly)
========================================================================================*/
//
// CRUD OPERATIONS:
// ----------------
// C → Insert:
//       • insertAtHead(value)
//       • insertAtTail(value)
//       • insertAt(index, value)
//
// R → Read:
//       • traverse with pointer
//       • search(value)
//
// U → Update:
//       • find node → change node.value
//
// D → Delete:
//       • deleteHead()
//       • deleteTail()
//       • deleteAt(index)
//       • remove(value)



/*========================================================================================
 4. STACK  (LIFO)
========================================================================================*/
//
// CRUD OPERATIONS:
// ----------------
// C → Push:
//       • push(value)
//
// R → Read:
//       • peek()               // view top
//
// U → Update:
//       • pop() then push(newValue)  // indirect
//
// D → Delete:
//       • pop()                // remove top



/*========================================================================================
 5. QUEUE  (FIFO)
========================================================================================*/
//
// CRUD OPERATIONS:
// ----------------
// C → Enqueue:
//       • enqueue(value)
//
// R → Read:
//       • front() / peek()
//
// U → Update:
//       • dequeue + enqueue (indirect)
//
// D → Delete:
//       • dequeue()            // remove from front



/*========================================================================================
 6. DEQUE (Double Ended Queue)
========================================================================================*/
//
// CRUD OPERATIONS:
// ----------------
// C → Insert:
//       • addFront(value)
//       • addRear(value)
//
// R → Read:
//       • peekFront()
//       • peekRear()
//
// U → Update:
//       • remove + add (indirect)
//
// D → Delete:
//       • removeFront()
//       • removeRear()



/*========================================================================================
 7. HASH TABLE / HASH MAP
========================================================================================*/
//
// CRUD OPERATIONS:
// ----------------
// C → Insert:
//       • set(key, value)
//
// R → Read:
//       • get(key)
//
// U → Update:
//       • set(key, newValue)
//
// D → Delete:
//       • delete(key)



/*========================================================================================
 8. SET (Unique values)
========================================================================================*/
//
// CRUD OPERATIONS:
// ----------------
// C → Insert:
//       • add(value)
//
// R → Read:
//       • has(value)
//
// U → Update:
//       • remove + add
//
// D → Delete:
//       • delete(value)



/*========================================================================================
 9. TREE (Binary Tree / BST)
========================================================================================*/
//
// CRUD OPERATIONS:
// ----------------
// C → Insert:
//       • insert(value)             // BST insert rules
//
// R → Read:
//       • traversals: inorder, preorder, postorder, level-order
//       • search(value)
//
// U → Update:
//       • find node → node.value = newVal
//
// D → Delete:
//       • delete(value)             // three cases (0, 1, 2 children)



/*========================================================================================
 10. TRIE (Prefix Tree)
========================================================================================*/
//
// CRUD OPERATIONS:
// ----------------
// C → Insert:
//       • insert(word)
//
// R → Read:
//       • search(word)
//       • startsWith(prefix)
//
// U → Update:
//       • delete + insert (indirect)
//
// D → Delete:
//       • delete(word)              // recursively remove child nodes



/*-----------------------------------------------------------------------------------------
 11. GRAPH  (Adjacency List / Matrix)
-----------------------------------------------------------------------------------------*/
//
// CRUD OPERATIONS:
// ----------------
// C → Insert:
//       • addVertex(node)
//       • addEdge(u, v)
//
// R → Read:
//       • neighbors of node
//       • BFS/DFS traversal
//
// U → Update:
//       • update weight (weighted graph)
//
// D → Delete:
//       • removeEdge(u, v)
//       • removeVertex(node)



/*========================================================================================
 12. HEAP (Min-Heap / Max-Heap)
========================================================================================*/
//
// CRUD OPERATIONS:
// ----------------
// C → Insert:
//       • push(value) → heapifyUp
//
// R → Read:
//       • peek()                 // get min/max
//
// U → Update:
//       • remove element + insert (indirect)
//
// D → Delete:
//       • pop()                  // remove min/max



/*========================================================================================
 13. PRIORITY QUEUE
========================================================================================*/
//
// CRUD OPERATIONS:
// ----------------
// C → Insert:
//       • enqueue(value, priority)
//
// R → Read:
//       • peek()                 // highest-priority item
//
// U → Update:
//       • changePriority(node, newPriority)
//
// D → Delete:
//       • dequeue()              // remove highest priority



/*========================================================================================
 14. SEGMENT TREE
========================================================================================*/
//
// CRUD OPERATIONS:
// ----------------
// C → Build Tree:
//       • build(arr)
//
// R → Query:
//       • query(L, R)            // range query
//
// U → Update:
//       • update(index, value)
//
// D → Delete:
//       • not typical (range-tree)



/*========================================================================================
 15. FENWICK TREE (Binary Indexed Tree)
========================================================================================*/
//
// CRUD OPERATIONS:
// ----------------
// C → Build:
//       • construct using prefix sums
//
// R → Query:
//       • sum(i)                 // prefix sum
//
// U → Update:
//       • update(i, delta)
//
// D → Delete:
//       • update(i, -value)



/****************************************************************************************
 * END OF LIST OF ALL DATA STRUCTURES WITH CRUD METHODS
 ****************************************************************************************/



















/****************************************************************************************
 * IMPORTANT DSA PATTERNS (BEGINNER → ADVANCED)
 * Each pattern includes 3 MUST-DO LeetCode questions for practice.
 ****************************************************************************************/


/*========================================================================================
 1. TWO POINTERS (Array/String Pointer Movement)
========================================================================================*/
//
// USE CASES:
// ----------
// • Sorted arrays
// • Opposite pointer movement
// • Removing duplicates
// • Checking palindrome
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 167 — Two Sum II (Input: Sorted Array)
// 2. LC 125 — Valid Palindrome
// 3. LC 15  — 3Sum



/*========================================================================================
 2. SLIDING WINDOW (Fixed + Dynamic Window)
========================================================================================*/
//
// USE CASES:
// ----------
// • Substring/subarray problems
// • Longest/shortest window
// • Character frequency in window
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 3   — Longest Substring Without Repeating Characters
// 2. LC 76  — Minimum Window Substring
// 3. LC 209 — Minimum Size Subarray Sum



/*========================================================================================
 3. FAST & SLOW POINTERS (Tortoise & Hare)
========================================================================================*/
//
// USE CASES:
// ----------
// • Detect cycle
// • Find middle of list
// • Determine cycle length
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 141 — Linked List Cycle
// 2. LC 876 — Middle of Linked List
// 3. LC 142 — Linked List Cycle II



/*========================================================================================
 4. MERGE INTERVALS PATTERN
========================================================================================*/
//
// USE CASES:
// ----------
// • Interval scheduling
// • Merging overlapping intervals
// • Insert intervals
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 56  — Merge Intervals
// 2. LC 57  — Insert Interval
// 3. LC 252 — Meeting Rooms



/*========================================================================================
 5. BINARY SEARCH (Arrays + Search Space)
========================================================================================*/
//
// USE CASES:
// ----------
// • Sorted arrays
// • Find boundaries
// • Searching in monotonic functions
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 704 — Binary Search
// 2. LC 69  — Sqrt(x)
// 3. LC 875 — Koko Eating Bananas



/*========================================================================================
 6. PREFIX SUM / DIFFERENCE ARRAY
========================================================================================*/
//
// USE CASES:
// ----------
// • Range sum queries
// • Fast difference updates
// • Subarray sum equals K
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 560 — Subarray Sum Equals K
// 2. LC 238 — Product of Array Except Self (variation)
// 3. LC 525 — Contiguous Array



/*========================================================================================
 7. HASHING / FREQUENCY MAP PATTERN
========================================================================================*/
//
// USE CASES:
// ----------
// • Counting characters
// • Grouping anagrams
// • Checking duplicates
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 1   — Two Sum
// 2. LC 49  — Group Anagrams
// 3. LC 219 — Contains Duplicate II



/*========================================================================================
 8. STACK-BASED PATTERN (Monotonic Stack)
========================================================================================*/
//
// USE CASES:
// ----------
// • Next greater element
// • Histogram problems
// • Stock span problems
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 20  — Valid Parentheses
// 2. LC 739 — Daily Temperatures
// 3. LC 84  — Largest Rectangle in Histogram



/*========================================================================================
 9. BACKTRACKING (Recursion + Choices + Undo)
========================================================================================*/
//
// USE CASES:
// ----------
// • Permutations
// • Subsets
// • Solve puzzles (N-Queens)
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 46  — Permutations
// 2. LC 78  — Subsets
// 3. LC 51  — N-Queens



/*========================================================================================
 10. GREEDY ALGORITHMS
========================================================================================*/
//
// USE CASES:
// ----------
// • Scheduling
// • Minimizing/maximizing values
// • Choosing optimal local step
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 55  — Jump Game
// 2. LC 435 — Non-overlapping Intervals
// 3. LC 402 — Remove K Digits



/*========================================================================================
 11. BFS (Breadth-First Search)
========================================================================================*/
//
// USE CASES:
// ----------
// • Shortest path in unweighted graph
// • Multi-source BFS
// • Level-order traversal of trees
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 102 — Binary Tree Level Order Traversal
// 2. LC 200 — Number of Islands
// 3. LC 994 — Rotting Oranges



/*========================================================================================
 12. DFS (Depth-First Search)
========================================================================================*/
//
// USE CASES:
// ----------
// • Graph traversal
// • Backtracking
// • Tree recursion
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 110 — Balanced Binary Tree
// 2. LC 543 — Diameter of Binary Tree
// 3. LC 133 — Clone Graph



/*========================================================================================
 13. DYNAMIC PROGRAMMING (DP)
========================================================================================*/
//
// SUB-PATTERNS:
// --------------
// • 1D DP
// • 2D DP
// • Knapsack
// • DP on trees
// • DP on strings
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 70  — Climbing Stairs
// 2. LC 322 — Coin Change
// 3. LC 72  — Edit Distance (advanced)



/*========================================================================================
 14. BINARY TREE PATTERNS
========================================================================================*/
//
// USE CASES:
// ----------
// • Traversals
// • Balanced check
// • LCA
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 104 — Maximum Depth of Binary Tree
// 2. LC 226 — Invert Binary Tree
// 3. LC 236 — Lowest Common Ancestor



/*========================================================================================
 15. BINARY SEARCH TREE (BST) PATTERN
========================================================================================*/
//
// USE CASES:
// ----------
// • Searching
// • Insert/delete
// • Inorder traversal sorted output
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 700 — Search in BST
// 2. LC 701 — Insert into BST
// 3. LC 450 — Delete Node in BST



/*========================================================================================
 16. GRAPH ALGORITHMIC PATTERNS
========================================================================================*/
//
// USE CASES:
// ----------
// • BFS/DFS
// • Cycle detection
// • Connected components
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 547 — Number of Provinces
// 2. LC 207 — Course Schedule (cycle detection)
// 3. LC 417 — Pacific Atlantic Water Flow



/*========================================================================================
 17. DIJKSTRA / SHORTEST PATH PATTERN
========================================================================================*/
//
// USE CASES:
// ----------
// • Weighted graph shortest paths
// • Routing algorithms
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 743 — Network Delay Time
// 2. LC 787 — Cheapest Flights Within K Stops
// 3. LC 1631 — Path With Minimum Effort



/*========================================================================================
 18. TOPOLOGICAL SORT (DAG)
========================================================================================*/
//
// USE CASES:
// ----------
// • Course scheduling
// • Dependency resolution
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 210 — Course Schedule II
// 2. LC 802 — Find Eventual Safe States
// 3. LC 269 — Alien Dictionary



/*========================================================================================
 19. HEAP / PRIORITY QUEUE PATTERN
========================================================================================*/
//
// USE CASES:
// ----------
// • Top K elements
// • Merging sorted streams
// • Scheduling tasks
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 215 — Kth Largest Element in an Array
// 2. LC 23  — Merge K Sorted Lists
// 3. LC 347 — Top K Frequent Elements



/*========================================================================================
 20. TRIE / PREFIX TREE PATTERN
========================================================================================*/
//
// USE CASES:
// ----------
// • Prefix matching
// • Word search
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 208 — Implement Trie
// 2. LC 211 — Design Add & Search Word DS
// 3. LC 648 — Replace Words



/*========================================================================================
 21. MATRIX / GRID TRAVERSAL PATTERN
========================================================================================*/
//
// USE CASES:
// ----------
// • DFS/BFS on grid
// • Flood fill
// • Island counting
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 200 — Number of Islands
// 2. LC 733 — Flood Fill
// 3. LC 130 — Surrounded Regions



/*========================================================================================
 22. BIT MANIPULATION PATTERN
========================================================================================*/
//
// USE CASES:
// ----------
// • XOR tricks
// • Counting bits
// • Subsets via bitmask
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 136 — Single Number
// 2. LC 191 — Number of 1 Bits
// 3. LC 78  — Subsets (bitmask version)



/*========================================================================================
 23. SEGMENT TREE / FENWICK TREE PATTERNS
========================================================================================*/
//
// USE CASES:
// ----------
// • Range queries
// • Range updates
//
// LEETCODE PRACTICE:
// ------------------
// 1. LC 307 — Range Sum Query – Mutable
// 2. LC 308 — Range Sum Query 2D
// 3. LC 315 — Count Smaller Numbers After Self



/****************************************************************************************
 * END OF IMPORTANT DSA PATTERN LIST
 ****************************************************************************************/

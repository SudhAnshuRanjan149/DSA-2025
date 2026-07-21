# Fast & Slow Pointer Pattern DSA Notes

## Day 7: Fast & Slow Pointers Theory (Hare & Tortoise Algorithm)
* **Lecture Video**: <a href="https://www.youtube.com/watch?v=FguUjuCzhj0&list=PLVItHqpXY_DDFNeS6NUUoRsloyaPRdl1l&index=13" target="_blank">Watch on YouTube</a>

The **Fast & Slow Pointers** pattern (also known as the **Hare & Tortoise Algorithm**) is a pointer traversal technique that uses two pointers moving through an array, string, or linked list at different speeds. Typically, the **slow** pointer moves one step at a time, while the **fast** pointer moves two steps at a time.

### 1. Intuition & Motivation
In linear data structures (specifically Linked Lists), detecting structures like cycles or finding midpoints would traditionally require:
* **Auxiliary space** ($O(N)$) using a Hash Set to track visited nodes.
* **Multiple passes** (e.g., finding the length of the list, then traversing $L/2$ nodes).

The Fast & Slow pointer pattern allows us to solve these problems in a **single pass** with **$O(1)$ auxiliary space**. 

---

### 2. Core Concepts & Mathematical Proofs

#### A. Cycle Detection (LeetCode 141)
* **Problem Link**: <a href="https://leetcode.com/problems/linked-list-cycle/" target="_blank">LeetCode</a>
* **Intuition**: 
  If there is no cycle, the `fast` pointer will reach the end of the list (`null`) first. 
  If a cycle exists, the `fast` pointer will enter the cycle first and loop around indefinitely. Once the `slow` pointer enters the cycle, the distance (gap) between the two pointers decreases by exactly 1 step in each iteration. Since the gap decreases by 1 step at a time, it is mathematically guaranteed that the gap will eventually become 0, meaning the pointers will collide.
* **Mathematical Proof**:
  - Suppose `slow` and `fast` are both in a cycle of length $C$, and `fast` is $D$ steps behind `slow`.
  - In each iteration:
    - `slow` moves 1 step forward.
    - `fast` moves 2 steps forward.
  - The relative speed of `fast` compared to `slow` is $2 - 1 = 1$ step/iteration.
  - The gap $D$ decreases by 1 in each step.
  - After $D$ iterations, the gap becomes 0, and they meet.
* **Code Implementation**:
##### Python
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def hasCycle(head: ListNode) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```
##### JavaScript
```javascript
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

function hasCycle(head) {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
    }
    return false;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ where $N$ is the number of nodes. If no cycle exists, $O(N)$. If a cycle exists, $O(N + C) \approx O(N)$.
  * **Space Complexity**: $O(1)$ auxiliary space.

---

#### B. Finding the Middle of a Linked List (LeetCode 876)
* **Problem Link**: <a href="https://leetcode.com/problems/middle-of-the-linked-list/" target="_blank">LeetCode</a>
* **Intuition**: 
  Since the `fast` pointer moves twice as fast as the `slow` pointer, by the time the `fast` pointer reaches the end of the list, the `slow` pointer will have traveled exactly half the distance.
  - For a list of odd length (e.g., $1 \to 2 \to 3$), `fast` stops at the last node, and `slow` is exactly at $2$ (the middle).
  - For a list of even length (e.g., $1 \to 2 \to 3 \to 4$), `fast` stops at `null` (beyond the end), and `slow` lands on the second middle node $3$.
* **Code Implementation**:
##### Python
```python
def middleNode(head: ListNode) -> ListNode:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```
##### JavaScript
```javascript
function middleNode(head) {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ single pass.
  * **Space Complexity**: $O(1)$ auxiliary space.

---

#### C. Finding the Start of a Cycle (LeetCode 142)
* **Problem Link**: <a href="https://leetcode.com/problems/linked-list-cycle-ii/" target="_blank">LeetCode</a>
* **Intuition & Mathematical Proof**:
  Let's define the distances:
  - $X$: Distance from the head of the list to the entry point (start) of the cycle.
  - $Y$: Distance from the entry point of the cycle to the meeting point of `slow` and `fast`.
  - $C$: Total length of the cycle.
  
  When the pointers meet at the meeting point:
  - Distance traveled by `slow` = $X + Y$ (since it hasn't completed a full cycle yet).
  - Distance traveled by `fast` = $X + Y + k \cdot C$ (where $k$ is the integer number of complete loops `fast` made in the cycle).
  
  Since `fast` travels at twice the speed of `slow`:
  $$2 \cdot \text{Distance}(\text{slow}) = \text{Distance}(\text{fast})$$
  $$2(X + Y) = X + Y + k \cdot C$$
  $$X + Y = k \cdot C$$
  $$X = k \cdot C - Y$$
  $$X = (k - 1) \cdot C + (C - Y)$$
  
  Note that $(C - Y)$ is the remaining distance from the meeting point back to the entry point of the cycle. 
  The formula tells us that traversing from the head to the cycle start ($X$) is equal to traversing from the meeting point to the cycle start (plus some number of full cycle loops).
  
  Therefore:
  1. Once `slow` and `fast` meet, leave one pointer (e.g., `slow`) at the meeting point.
  2. Reset the other pointer (e.g., `fast`) back to the `head` of the list.
  3. Move both pointers at a speed of 1 step per iteration.
  4. The point where they meet again will be the **start of the cycle**.
* **Code Implementation**:
##### Python
```python
def detectCycle(head: ListNode) -> ListNode:
    slow = fast = head
    
    # Step 1: Detect if a cycle exists
    has_cycle = False
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            has_cycle = True
            break
            
    if not has_cycle:
        return None
        
    # Step 2: Find the entry point of the cycle
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
        
    return slow
```
##### JavaScript
```javascript
function detectCycle(head) {
    let slow = head;
    let fast = head;
    let hasCycle = false;
    
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            hasCycle = true;
            break;
        }
    }
    
    if (!hasCycle) {
        return null;
    }
    
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ because the first step takes $O(N)$ time and the second step takes $O(N)$ time.
  * **Space Complexity**: $O(1)$ auxiliary space.

---

### 3. When to Use Fast & Slow Pointers?
1. The problem involves **Linked Lists** or cyclic sequences (like cyclic arrays).
2. You need to **detect cycles** (loops) or find the **midpoint** of a list in a single pass.
3. You need to find the **starting point** or **length** of a cycle.
4. You want to avoid using $O(N)$ extra space (like storing nodes in a Set or Map).

---

## Day 8: Fast & Slow Pointers Practice (5 Popular Questions)
* **Lecture Video**: <a href="https://www.youtube.com/watch?v=eIItwq8UTmU&list=PLVItHqpXY_DDFNeS6NUUoRsloyaPRdl1l&index=14" target="_blank">Watch on YouTube</a>

On Day 8, we implement solutions to the 5 most popular interview questions leveraging the Fast & Slow Pointer pattern.

---

### 1. 876. Middle of the Linked List
* **Problem Link**: <a href="https://leetcode.com/problems/middle-of-the-linked-list/description/" target="_blank">LeetCode</a>
* **Difficulty**: Easy
* **Pattern**: Fast & Slow Pointers (Midpoint Detection)

#### Problem Description
Given the `head` of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.

#### Solution
* **Intuition**: Move `slow` by 1 step and `fast` by 2 steps. When `fast` or `fast.next` is null, `slow` will point to the middle of the list.
* **Python Implementation**:
```python
def middleNode(head: ListNode) -> ListNode:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```
* **JavaScript Implementation**:
```javascript
function middleNode(head) {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$
  * **Space Complexity**: $O(1)$
* **Dry Run**:
  * Input: `1 -> 2 -> 3 -> 4 -> 5`
  * Initial: `slow = 1`, `fast = 1`
  * Step 1: `slow = 2`, `fast = 3`
  * Step 2: `slow = 3`, `fast = 5`
  * Terminate since `fast.next` is null.
  * Return `slow` (node `3`).

---

### 2. 141. Linked List Cycle
* **Problem Link**: <a href="https://leetcode.com/problems/linked-list-cycle/description/" target="_blank">LeetCode</a>
* **Difficulty**: Easy
* **Pattern**: Fast & Slow Pointers (Cycle Detection)

#### Problem Description
Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

#### Solution
* **Intuition**: Standard Floyd's Cycle Finding algorithm. If there is a cycle, the `slow` and `fast` pointers will meet at some point inside the cycle.
* **Python Implementation**:
```python
def hasCycle(head: ListNode) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```
* **JavaScript Implementation**:
```javascript
function hasCycle(head) {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
    }
    return false;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$
  * **Space Complexity**: $O(1)$

---

### 3. 142. Linked List Cycle II
* **Problem Link**: <a href="https://leetcode.com/problems/linked-list-cycle-ii/description/" target="_blank">LeetCode</a>
* **Difficulty**: Medium
* **Pattern**: Fast & Slow Pointers (Cycle Entry Detection)

#### Problem Description
Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.

#### Solution
* **Intuition**: Use Phase 1 to detect collision. If they collide, reset `slow` to the `head` and move both pointers one step at a time until they collide again. The meeting point is the entry of the cycle.
* **Python Implementation**:
```python
def detectCycle(head: ListNode) -> ListNode:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            # Cycle detected, find the start
            slow = head
            while slow != fast:
                slow = slow.next
                fast = fast.next
            return slow
    return None
```
* **JavaScript Implementation**:
```javascript
function detectCycle(head) {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    return null;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$
  * **Space Complexity**: $O(1)$

---

### 4. Find Length of Loop in Linked List
* **Problem Link**: <a href="https://www.geeksforgeeks.org/problems/find-length-of-loop/1" target="_blank">GeeksforGeeks</a>
* **Difficulty**: Easy / Medium
* **Pattern**: Fast & Slow Pointers (Cycle Length Calculation)

#### Problem Description
Given the head of a Linked List, check whether the list contains a loop. If a loop is present, return the number of nodes in the loop, otherwise return `0`.

#### Solution
* **Intuition**: 
  1. Detect cycle using the `slow` and `fast` pointers.
  2. Once they meet at node `P`, hold one pointer static.
  3. Move the other pointer around the loop, counting steps, until it reaches `P` again.
  4. The step count is the length of the loop.
* **Python Implementation**:
```python
def countNodesInLoop(head: ListNode) -> int:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            # Cycle detected, calculate length
            count = 1
            temp = slow.next
            while temp != slow:
                count += 1
                temp = temp.next
            return count
    return 0
```
* **JavaScript Implementation**:
```javascript
function countNodesInLoop(head) {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            let count = 1;
            let temp = slow.next;
            while (temp !== slow) {
                count++;
                temp = temp.next;
            }
            return count;
        }
    }
    return 0;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$
  * **Space Complexity**: $O(1)$
* **Dry Run**:
  * Input: `1 -> 2 -> 3 -> 4 -> 5 -> 3` (loop at 3: `3 -> 4 -> 5 -> 3`)
  * `slow` and `fast` meet at node `5`.
  * Keep `slow` at `5`, initialize `temp = slow.next` (node `3`), `count = 1`.
  * Move `temp` to `4`, `count = 2`.
  * Move `temp` to `5`, `temp == slow`. Loop ends.
  * Return `3` (loop length is 3).

---

### 5. 202. Happy Number
* **Problem Link**: <a href="https://leetcode.com/problems/happy-number/description/" target="_blank">LeetCode</a>
* **Difficulty**: Easy
* **Pattern**: Fast & Slow Pointers (Implicit Cycle Detection)

#### Problem Description
Write an algorithm to determine if a number `n` is happy.
A happy number is a number defined by the following process:
* Starting with any positive integer, replace the number by the sum of the squares of its digits.
* Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
* Those numbers for which this process ends in 1 are happy.
Return `true` if `n` is a happy number, and `false` if not.

#### Solution
* **Intuition**: 
  Instead of detecting a cycle in a linked list, we detect a cycle in a sequence of numbers generated by the digit-square-sum function.
  - The sequence generator behaves like `node.next`.
  - Let `slow` perform the function once per step, and `fast` perform it twice.
  - If there is a cycle, they will meet. If they meet at `1`, the number is a happy number. If they meet at any other number, it's a cycle that doesn't reach `1`, meaning the number is not happy.
* **Python Implementation**:
```python
def isHappy(n: int) -> bool:
    def get_next(number: int) -> int:
        total_sum = 0
        while number > 0:
            digit = number % 10
            total_sum += digit * digit
            number = number // 10
        return total_sum
        
    slow = n
    fast = get_next(n)
    
    while fast != 1 and slow != fast:
        slow = get_next(slow)
        fast = get_next(get_next(fast))
        
    return fast == 1
```
* **JavaScript Implementation**:
```javascript
function isHappy(n) {
    const getNext = (num) => {
        let totalSum = 0;
        while (num > 0) {
            const digit = num % 10;
            totalSum += digit * digit;
            num = Math.floor(num / 10);
        }
        return totalSum;
    };
    
    let slow = n;
    let fast = getNext(n);
    
    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }
    
    return fast === 1;
}
```
* **Complexity**:
  * **Time Complexity**: $O(\log n)$ because the number of digits in $n$ is $\log_{10} n$. The numbers shrink very fast.
  * **Space Complexity**: $O(1)$ auxiliary space.
* **Dry Run**:
  * Input: `n = 19`
  * `slow = 19`, `fast = get_next(19) = 1^2 + 9^2 = 82`
  * Iteration 1:
    - `slow = get_next(19) = 82`
    - `fast = get_next(get_next(82)) = get_next(8^2 + 2^2) = get_next(68) = 6^2 + 8^2 = 100`
  * Iteration 2:
    - `slow = get_next(82) = 68`
    - `fast = get_next(get_next(100)) = get_next(1^2 + 0^2 + 0^2) = get_next(1) = 1`
  * `fast` becomes `1`. Loop terminates.
  * Return `True`.

---

## Day 9: Fast & Slow Pointers — 3 Popular Interview Questions
* **Lecture Video**: <a href="https://www.youtube.com/watch?v=E85jp_rHivc&list=PLVItHqpXY_DDFNeS6NUUoRsloyaPRdl1l&index=16&t=2975s" target="_blank">Watch on YouTube</a>

On Day 9, we solve 3 classic interview problems using the Fast & Slow Pointer (Floyd's Cycle Detection / Hare & Tortoise) pattern. Each problem demonstrates a novel application of the same core technique.

---

### 1. Split a Circular Linked List into Two Halves
* **Problem Link**: <a href="https://www.geeksforgeeks.org/problems/split-a-circular-linked-list-into-two-halves/1" target="_blank">GeeksforGeeks</a>
* **Difficulty**: Medium
* **Pattern**: Fast & Slow Pointers (Midpoint Detection on Circular List)

#### Problem Description
Given a Circular Linked List of size $N$, split it into two circular linked lists. The first circular linked list should contain the first half of the nodes (i.e., ceil(N/2) nodes), and the second should contain the rest.

#### Solution

**Key Insight**: In a circular linked list, the `fast` pointer's termination condition is different. Instead of checking `fast.next == null`, we stop when `fast.next == head` (odd length) or `fast.next.next == head` (even length). The `slow` pointer will then be at the last node of the first half.

* **Intuition**:
  1. Use `slow` (1 step) and `fast` (2 steps) to find the midpoint.
  2. Once `slow` reaches the midpoint, `slow.next` is the head of the second half.
  3. Set `slow.next = head` to close the first half into a circle.
  4. Traverse the second half to find its last node and point it back to `slow.next` (the original second head) to close the second circle.

* **Python Implementation**:
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def splitCircularList(head):
    # Edge case: 0 or 1 nodes
    if not head or head.next == head:
        return head, None

    slow = head
    fast = head

    # Move fast by 2 and slow by 1 until fast reaches the last node
    # For odd N: fast.next == head
    # For even N: fast.next.next == head
    while fast.next != head and fast.next.next != head:
        slow = slow.next
        fast = fast.next.next

    # If even number of nodes, advance fast by one more step
    if fast.next.next == head:
        fast = fast.next

    # head2 is the start of the second half
    head2 = slow.next

    # Close the first half into a circle
    slow.next = head

    # Close the second half into a circle: find the tail of second half
    # fast is already at the last node of the full list
    fast.next = head2

    return head, head2
```

* **JavaScript Implementation**:
```javascript
function splitCircularList(head) {
    // Edge case: 0 or 1 nodes
    if (!head || head.next === head) {
        return [head, null];
    }

    let slow = head;
    let fast = head;

    // Advance until fast is at the last or second-to-last node
    while (fast.next !== head && fast.next.next !== head) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // If even number of nodes, advance fast by one more step
    if (fast.next.next === head) {
        fast = fast.next;
    }

    // head2 is the start of the second half
    const head2 = slow.next;

    // Close the first half into a circle
    slow.next = head;

    // Close the second half into a circle
    fast.next = head2;

    return [head, head2];
}
```

* **Complexity**:
  * **Time Complexity**: $O(N)$ — single traversal of the list.
  * **Space Complexity**: $O(1)$ — no extra space used.

* **Dry Run**:
  * Input: `1 → 2 → 3 → 4 → 5 → (back to 1)` (circular)
  * Initial: `slow = 1`, `fast = 1`
  * Step 1: `slow = 2`, `fast = 3`
  * Step 2: `slow = 3`, `fast = 5`
  * `fast.next == head (1)` → stop (odd length case).
  * `head2 = slow.next = 4`
  * `slow.next = head (1)` → First half: `1 → 2 → 3 → (back to 1)` ✓
  * `fast.next = head2 (4)` → Second half: `4 → 5 → (back to 4)` ✓

---

### 2. 287. Find the Duplicate Number
* **Problem Link**: <a href="https://leetcode.com/problems/find-the-duplicate-number/description/" target="_blank">LeetCode</a>
* **Difficulty**: Medium
* **Pattern**: Approach 1 — Sorting; Approach 2 — Fast & Slow Pointers (Implicit Cycle Detection)

#### Problem Description
Given an array `nums` containing $N + 1$ integers where each integer is in the range $[1, N]$ (inclusive), there is exactly one repeated number in `nums`. Return this repeated number **without modifying the array** and using **only constant extra space**.

---

#### Approach 1: Sorting
* **Intuition**: Sort the array. Since integers are in $[1, N]$ and one is duplicated, any duplicate will appear in adjacent positions after sorting.
* **Note**: This approach **modifies** the array, so it does not satisfy the full problem constraints. Presented as a baseline.

* **Python Implementation**:
```python
def findDuplicate_sort(nums: list[int]) -> int:
    nums.sort()
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:
            return nums[i]
    return -1
```

* **JavaScript Implementation**:
```javascript
function findDuplicate_sort(nums) {
    nums.sort((a, b) => a - b);
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            return nums[i];
        }
    }
    return -1;
}
```

* **Complexity**:
  * **Time Complexity**: $O(N \log N)$ for sorting.
  * **Space Complexity**: $O(1)$ or $O(\log N)$ depending on sort implementation. Modifies input.

---

#### Approach 2: Floyd's Cycle Detection (Optimal ✅)
* **Core Insight — Array as a Linked List**:
  Imagine each index $i$ points to `nums[i]` as its "next node". Since all values are in $[1, N]$ and the array has $N + 1$ elements, the value `0` at index `0` is the guaranteed starting point (never pointed to by others, since values are $\geq 1$). Because one value is duplicated, **two indices point to the same "next" node**, creating a cycle.

* **Mapping**:
  - Index → Node
  - `nums[i]` → `node.next`
  - Starting at index `0` (value `nums[0]`) is the "head".

* **Intuition (Two Phases)**:
  - **Phase 1 (Collision)**: Move `slow` one step at a time (`slow = nums[slow]`) and `fast` two steps at a time (`fast = nums[nums[fast]]`). They will meet inside the cycle.
  - **Phase 2 (Finding Entry)**: Reset one pointer to the start (`0`). Move both pointers one step at a time. Where they meet is the entry point of the cycle — which is the **duplicate number**.

* **Why this works — Mathematical Proof**:
  - Let $X$ = distance from start to cycle entry (the duplicate index).
  - Let $Y$ = distance from cycle entry to meeting point inside cycle.
  - Let $C$ = length of the cycle.
  - At meeting point: $\text{dist}(\text{fast}) = 2 \cdot \text{dist}(\text{slow})$
  - $\Rightarrow X + Y + kC = 2(X + Y)$ for some integer $k$
  - $\Rightarrow X = kC - Y = (k-1)C + (C - Y)$
  - $(C - Y)$ is the remaining distance from meeting point to cycle entry.
  - So: distance from `0` to cycle entry ($X$) = distance from meeting point to cycle entry.
  - Resetting one pointer to `0` and advancing both at speed 1 will make them meet at the cycle entry = duplicate number. ✅

* **Python Implementation**:
```python
def findDuplicate(nums: list[int]) -> int:
    # Phase 1: Find the collision point
    slow = nums[0]
    fast = nums[0]

    while True:
        slow = nums[slow]          # 1 step
        fast = nums[nums[fast]]    # 2 steps
        if slow == fast:
            break

    # Phase 2: Find the entry point of the cycle (the duplicate)
    slow = nums[0]                 # Reset slow to start
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]          # Both move 1 step now

    return slow
```

* **JavaScript Implementation**:
```javascript
function findDuplicate(nums) {
    // Phase 1: Find the collision point
    let slow = nums[0];
    let fast = nums[0];

    do {
        slow = nums[slow];          // 1 step
        fast = nums[nums[fast]];    // 2 steps
    } while (slow !== fast);

    // Phase 2: Find the entry point of the cycle (the duplicate)
    slow = nums[0];                 // Reset slow to start
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];          // Both move 1 step now
    }

    return slow;
}
```

* **Complexity**:
  * **Time Complexity**: $O(N)$ — Phase 1 takes $O(N)$, Phase 2 takes $O(N)$.
  * **Space Complexity**: $O(1)$ — no extra space, array not modified. ✅

* **Dry Run**:
  * Input: `nums = [1, 3, 4, 2, 2]` → $N = 4$, values in $[1, 4]$.
  * Treat as linked list: `0 → 1 → 3 → 2 → 4 → 2 → 4 → ...` (cycle at index 2)
  * **Phase 1**:
    - Initial: `slow = nums[0] = 1`, `fast = nums[0] = 1`
    - Step 1: `slow = nums[1] = 3`, `fast = nums[nums[1]] = nums[3] = 2`
    - Step 2: `slow = nums[3] = 2`, `fast = nums[nums[2]] = nums[4] = 2`
    - `slow == fast == 2`. Collision detected.
  * **Phase 2**:
    - Reset: `slow = nums[0] = 1`, `fast = 2`
    - Step 1: `slow = nums[1] = 3`, `fast = nums[2] = 4`
    - Step 2: `slow = nums[3] = 2`, `fast = nums[4] = 2`
    - `slow == fast == 2`. The duplicate is `2`. ✅

---

### 3. 234. Palindrome Linked List
* **Problem Link**: <a href="https://leetcode.com/problems/palindrome-linked-list/description/" target="_blank">LeetCode</a>
* **Difficulty**: Easy
* **Pattern**: Approach 1 — Extra Space; Approach 2 — Fast & Slow Pointers + In-place Reversal

#### Problem Description
Given the `head` of a singly linked list, return `true` if it is a palindrome, or `false` otherwise.

---

#### Approach 1: Using Extra Space (Array)
* **Intuition**: Copy all node values into an array. Use two pointers from both ends to check if the array is a palindrome.

* **Python Implementation**:
```python
def isPalindrome_space(head: 'ListNode') -> bool:
    values = []
    curr = head
    while curr:
        values.append(curr.val)
        curr = curr.next

    left, right = 0, len(values) - 1
    while left < right:
        if values[left] != values[right]:
            return False
        left += 1
        right -= 1
    return True
```

* **JavaScript Implementation**:
```javascript
function isPalindrome_space(head) {
    const values = [];
    let curr = head;
    while (curr !== null) {
        values.push(curr.val);
        curr = curr.next;
    }

    let left = 0;
    let right = values.length - 1;
    while (left < right) {
        if (values[left] !== values[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
```

* **Complexity**:
  * **Time Complexity**: $O(N)$
  * **Space Complexity**: $O(N)$ — extra array used.

---

#### Approach 2: Fast & Slow Pointers + Reverse Second Half (Optimal ✅)
* **Intuition**: A palindrome reads the same forwards and backwards. If we find the midpoint of the linked list and reverse the second half, we can compare the first half and the reversed second half node by node.

* **Algorithm (3 Steps)**:
  1. **Find the middle**: Use `slow` (1 step) and `fast` (2 steps). When `fast` reaches the end, `slow` is at the middle.
  2. **Reverse the second half**: Reverse the linked list starting from `slow.next` (the second half).
  3. **Compare both halves**: Walk one pointer from `head` and one from the reversed second half. If all values match, it's a palindrome.
  4. *(Optional but good practice)*: Restore the list by reversing the second half again.

* **Python Implementation**:
```python
def isPalindrome(head: 'ListNode') -> bool:
    # Step 1: Find the middle of the linked list
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # Step 2: Reverse the second half
    prev = None
    curr = slow
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    # 'prev' is now the head of the reversed second half

    # Step 3: Compare first half and reversed second half
    left = head
    right = prev
    while right:  # second half may be shorter or equal
        if left.val != right.val:
            return False
        left = left.next
        right = right.next

    return True
```

* **JavaScript Implementation**:
```javascript
function isPalindrome(head) {
    // Step 1: Find the middle of the linked list
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Step 2: Reverse the second half
    let prev = null;
    let curr = slow;
    while (curr !== null) {
        const nextNode = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextNode;
    }
    // 'prev' is now the head of the reversed second half

    // Step 3: Compare first half and reversed second half
    let left = head;
    let right = prev;
    while (right !== null) {
        if (left.val !== right.val) {
            return false;
        }
        left = left.next;
        right = right.next;
    }

    return true;
}
```

* **Complexity**:
  * **Time Complexity**: $O(N)$ — one pass to find the middle + one pass to reverse + one pass to compare.
  * **Space Complexity**: $O(1)$ — in-place reversal, no extra space. ✅

* **Dry Run (Odd Length)**:
  * Input: `1 → 2 → 3 → 2 → 1`
  * **Step 1** (Find middle):
    - Initial: `slow = 1`, `fast = 1`
    - Step 1: `slow = 2`, `fast = 3`
    - Step 2: `slow = 3`, `fast = 1` (last node). Stop.
    - Middle is node `3`.
  * **Step 2** (Reverse second half starting from `3`):
    - Before: `3 → 2 → 1 → null`
    - After: `null ← 3 ← 2 ← 1` (i.e., `prev = 1`)
  * **Step 3** (Compare):
    - `left = 1`, `right = 1` → match ✓
    - `left = 2`, `right = 2` → match ✓
    - `left = 3`, `right = 3` → match ✓
    - `right` becomes `null`. Stop.
  * Return `True`. ✅

* **Dry Run (Even Length)**:
  * Input: `1 → 2 → 2 → 1`
  * **Step 1** (Find middle):
    - Initial: `slow = 1`, `fast = 1`
    - Step 1: `slow = 2` (2nd node), `fast = 2` (3rd node)
    - `fast.next` is `1`, `fast.next.next` is `null` → stop.
    - Middle is the 2nd node (value `2`).
  * **Step 2** (Reverse second half starting from 2nd `2`):
    - Before: `2 → 1 → null`
    - After: `null ← 2 ← 1` (i.e., `prev = 1`)
  * **Step 3** (Compare):
    - `left = 1`, `right = 1` → match ✓
    - `left = 2`, `right = 2` → match ✓
    - `right` becomes `null`. Stop.
  * Return `True`. ✅

---

## Day 10: Fast & Slow Pointers — Maximum Twin Sum of a Linked List
* **Lecture Video**: <a href="https://www.youtube.com/watch?v=t40HN4Rla30&list=PLVItHqpXY_DDFNeS6NUUoRsloyaPRdl1l&index=17" target="_blank">Watch on YouTube</a>

Day 10 focuses on a single problem that beautifully combines midpoint detection with in-place reversal to achieve an $O(1)$ space solution.

---

### 1. 2130. Maximum Twin Sum of a Linked List
* **Problem Link**: <a href="https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/description/" target="_blank">LeetCode</a>
* **Difficulty**: Medium
* **Pattern**: Approach 1 — Extra Space (Array); Approach 2 — Fast & Slow Pointers + In-place Reversal

#### Problem Description
In a linked list of size $N$ where $N$ is **even**, the **twin** of the $i$-th node (0-indexed) is the $(N-1-i)$-th node.

* Node `0` is the twin of node `N-1`.
* Node `1` is the twin of node `N-2`.
* And so on...

The **twin sum** is defined as the sum of a node and its twin. Return the **maximum twin sum** of the linked list.

**Example**:
* Input: `4 → 2 → 5 → 1`
* Twins: `(4,1)` and `(2,5)` → Twin sums: `5` and `7`
* Output: `7`

---

#### Approach 1: Using Extra Space (Array)
* **Intuition**: Copy all node values into an array. Then use two pointers starting from both ends to compute all twin sums and track the maximum.

* **Algorithm**:
  1. Traverse the linked list and store all values in an array `vals`.
  2. Initialize `left = 0`, `right = len(vals) - 1`.
  3. Compute `vals[left] + vals[right]` for each pair, updating the max.
  4. Stop when `left >= right`.

* **Python Implementation**:
```python
def pairSum_space(head: 'ListNode') -> int:
    vals = []
    curr = head
    while curr:
        vals.append(curr.val)
        curr = curr.next

    max_sum = 0
    left, right = 0, len(vals) - 1
    while left < right:
        max_sum = max(max_sum, vals[left] + vals[right])
        left += 1
        right -= 1

    return max_sum
```

* **JavaScript Implementation**:
```javascript
function pairSum_space(head) {
    const vals = [];
    let curr = head;
    while (curr !== null) {
        vals.push(curr.val);
        curr = curr.next;
    }

    let maxSum = 0;
    let left = 0;
    let right = vals.length - 1;
    while (left < right) {
        maxSum = Math.max(maxSum, vals[left] + vals[right]);
        left++;
        right--;
    }

    return maxSum;
}
```

* **Complexity**:
  * **Time Complexity**: $O(N)$ — one pass to collect values, one pass to compute sums.
  * **Space Complexity**: $O(N)$ — extra array stores all $N$ values.

---

#### Approach 2: Fast & Slow Pointers + Reverse Second Half (Optimal ✅)
* **Intuition**:
  The twin of node `i` is node `N-1-i`. For a list of length $N$ (even), node `0` pairs with node `N-1`, node `1` pairs with node `N-2`, etc. This means the **first half** pairs with the **reversed second half** — node for node.

  If we reverse the second half and then walk a pointer through the first half and another through the reversed second half simultaneously, each step gives us one twin pair.

* **Algorithm (3 Steps)**:
  1. **Find the middle**: Use `slow` (1 step) and `fast` (2 steps). When `fast` reaches `null`, `slow` is at the start of the second half.
  2. **Reverse the second half**: Reverse the linked list from `slow` onwards in-place.
  3. **Compute twin sums**: Walk `left` from `head` and `right` from the reversed second half's head simultaneously, computing `left.val + right.val` at each step. Track the maximum.

* **Python Implementation**:
```python
def pairSum(head: 'ListNode') -> int:
    # Step 1: Find the start of the second half (slow will be there)
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    # slow is now at the start of the second half

    # Step 2: Reverse the second half in-place
    prev = None
    curr = slow
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    # prev is now the head of the reversed second half

    # Step 3: Compute twin sums and find the maximum
    max_sum = 0
    left = head
    right = prev
    while right:  # second half has N/2 nodes
        max_sum = max(max_sum, left.val + right.val)
        left = left.next
        right = right.next

    return max_sum
```

* **JavaScript Implementation**:
```javascript
function pairSum(head) {
    // Step 1: Find the start of the second half
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    // slow is now at the start of the second half

    // Step 2: Reverse the second half in-place
    let prev = null;
    let curr = slow;
    while (curr !== null) {
        const nextNode = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextNode;
    }
    // prev is now the head of the reversed second half

    // Step 3: Compute twin sums and find the maximum
    let maxSum = 0;
    let left = head;
    let right = prev;
    while (right !== null) {
        maxSum = Math.max(maxSum, left.val + right.val);
        left = left.next;
        right = right.next;
    }

    return maxSum;
}
```

* **Complexity**:
  * **Time Complexity**: $O(N)$ — one pass to find the middle + one pass to reverse + one pass to compute sums.
  * **Space Complexity**: $O(1)$ — all operations done in-place with only pointer variables. ✅

* **Dry Run**:
  * Input: `4 → 2 → 5 → 1` (N = 4, even)
  * **Step 1** (Find middle / start of second half):
    - Initial: `slow = 4`, `fast = 4`
    - Iter 1: `slow = 2` (2nd node), `fast = 5` (3rd node)
    - Iter 2: `slow = 5` (3rd node), `fast = null` (past end). Stop.
    - `slow` is at node `5` — the start of the second half.
  * **Step 2** (Reverse `5 → 1 → null`):
    - After reversal: `1 → 5 → null` (i.e., `prev` points to node `1`)
  * **Step 3** (Compute twin sums):
    - `left = 4`, `right = 1` → sum = `5`, `max_sum = 5`
    - `left = 2`, `right = 5` → sum = `7`, `max_sum = 7`
    - `right` becomes `null`. Stop.
  * Return `7`. ✅

* **Why `slow` lands at the second half's start**:
  - For a list `a → b → c → d` (N=4):
    - Init: `slow=a`, `fast=a`
    - Iter 1: `slow=b`, `fast=c`
    - Iter 2: `slow=c`, `fast=null` → stop.
  - `slow` is at `c`, which is index $N/2 = 2$. The second half is `[c, d]`. ✅
  - The termination condition `fast and fast.next` causes `slow` to land precisely at the $(N/2)$-th node (0-indexed), which is the first node of the second half.

---

## Day 11: Fast & Slow Pointers — Circular Array Loop
* **Lecture Video**: <a href="https://www.youtube.com/watch?v=nFZ1mysCZc0&list=PLVItHqpXY_DDFNeS6NUUoRsloyaPRdl1l&index=18" target="_blank">Watch on YouTube</a>

Day 11 applies the Fast & Slow pointer pattern to a **circular array** instead of a linked list, requiring careful handling of the circular index, direction consistency, and single-element loop guards.

---

### 1. 457. Circular Array Loop
* **Problem Link**: <a href="https://leetcode.com/problems/circular-array-loop/description/" target="_blank">LeetCode</a>
* **Difficulty**: Medium
* **Pattern**: Approach 1 — Brute Force; Approach 2 — Optimised Visited-Marking; Approach 3 — Fast & Slow Pointers

#### Problem Description
You are given a circular array `nums` of non-zero integers. Each element `nums[i]` represents the number of steps to move from index `i`:
- **Positive** → move forward (right).
- **Negative** → move backward (left).

Since the array is circular, moving past the last element wraps around to the first, and moving before the first element wraps around to the last.

A **cycle** in `nums` is a sequence of indices `seq` of length `k` (where `k > 1`) such that:
1. Following the indices according to the defined rules gives the sequence $\text{seq}[0] \to \text{seq}[1] \to \ldots \to \text{seq}[k-1] \to \text{seq}[0]$.
2. All elements `nums[seq[j]]` are either **all positive** or **all negative** (i.e., the entire cycle moves in one direction).

Return `true` if there is a cycle in `nums`, or `false` otherwise.

**Examples**:
* Input: `nums = [2, -1, 1, 2, 2]` → Output: `true` (cycle: `0 → 2 → 3 → 0`)
* Input: `nums = [-1, 2]` → Output: `false` (no valid cycle)
* Input: `nums = [-2, 1, -1, -2, -2]` → Output: `false` (single-element self-loop not valid)

---

#### 🔑 Key Helper: `get_next(i)` — Circular Index Calculation
Moving from index `i` by `nums[i]` steps in a circular array of length `n`:

```
next = (i + nums[i]) % n
```

However, Python's `%` handles negatives correctly, but in other languages (e.g., JavaScript), `%` can return negative values. The **universal safe formula**:

$$\text{next} = (( i + \text{nums}[i] ) \% n + n) \% n$$

```python
def get_next(nums, i):
    n = len(nums)
    return ((i + nums[i]) % n + n) % n
```

```javascript
function getNext(nums, i) {
    const n = nums.length;
    return ((i + nums[i]) % n + n) % n;
}
```

#### 🔑 Two Validity Guards
Every time we advance a pointer, we must check **two conditions** before declaring a valid cycle:

1. **Same direction**: `nums[current]` and `nums[next]` must have the same sign.
   * Check: `nums[current] * nums[next] > 0` (product positive → same sign).
2. **No self-loop**: The cycle must have length `> 1`.
   * Check: `next != current`.

If either guard fails for any step in a traversal, that path cannot contain a valid cycle.

---

#### Approach 1: Brute Force
* **Intuition**: For every starting index `i`, simulate the traversal step by step. Track the sequence of visited indices in a dictionary (mapping index → step number). If we re-encounter an index we've seen **in this traversal** and all moves were in the same direction and the loop length > 1, we found a valid cycle.

* **Algorithm**:
  1. For each `i` from `0` to `n-1`:
     - Initialise `visited = {i: 0}`, `curr = i`, `step = 1`.
     - Follow the path: `next = get_next(curr)`.
     - Check direction and self-loop guards.
     - If `next` is already in `visited`, compute loop length: `step - visited[next]`. If `> 1`, return `True`.
     - Otherwise, mark `visited[next] = step` and advance.
     - If any guard fails, break and try the next starting index.
  2. If no valid cycle found, return `False`.

* **Python Implementation**:
```python
def circularArrayLoop_brute(nums: list[int]) -> bool:
    n = len(nums)

    def get_next(i: int) -> int:
        return ((i + nums[i]) % n + n) % n

    for i in range(n):
        visited = {i: 0}
        curr = i
        step = 1

        while True:
            nxt = get_next(curr)

            # Guard 1: Same direction
            if nums[curr] * nums[nxt] < 0:
                break

            # Guard 2: No self-loop
            if nxt == curr:
                break

            # Cycle detected in this traversal
            if nxt in visited:
                # Loop length must be > 1 (already guaranteed by self-loop check above)
                return True

            visited[nxt] = step
            curr = nxt
            step += 1

    return False
```

* **JavaScript Implementation**:
```javascript
function circularArrayLoop_brute(nums) {
    const n = nums.length;

    function getNext(i) {
        return ((i + nums[i]) % n + n) % n;
    }

    for (let i = 0; i < n; i++) {
        const visited = new Map([[i, 0]]);
        let curr = i;
        let step = 1;

        while (true) {
            const nxt = getNext(curr);

            // Guard 1: Same direction
            if (nums[curr] * nums[nxt] < 0) break;

            // Guard 2: No self-loop
            if (nxt === curr) break;

            // Cycle detected in this traversal
            if (visited.has(nxt)) {
                return true;
            }

            visited.set(nxt, step);
            curr = nxt;
            step++;
        }
    }

    return false;
}
```

* **Complexity**:
  * **Time Complexity**: $O(N^2)$ — for each of the $N$ starting indices, the traversal can visit up to $N$ nodes.
  * **Space Complexity**: $O(N)$ — per-traversal visited dictionary.

---

#### Approach 2: Optimised Visited-Marking (In-place)
* **Intuition**: Same logic as Approach 1, but after fully exploring a path from starting index `i` and determining it has no valid cycle, we **mark every node on that path with `0`** (a sentinel value impossible in valid inputs, since all `nums[i] != 0`). Future starting indices skip `0`-marked nodes immediately.

  This avoids re-exploring the same dead-end paths, making the algorithm faster in practice — though the worst-case asymptotic complexity remains $O(N^2)$.

* **Algorithm**:
  1. For each `i` from `0` to `n-1`:
     - If `nums[i] == 0`, skip (already processed).
     - Simulate the traversal as in Approach 1.
     - If a valid cycle is found, return `True`.
     - Otherwise, retrace the path from `i` and set `nums[j] = 0` for all `j` on that path.
  2. Return `False`.

* **Python Implementation**:
```python
def circularArrayLoop_marking(nums: list[int]) -> bool:
    n = len(nums)

    def get_next(i: int) -> int:
        return ((i + nums[i]) % n + n) % n

    for i in range(n):
        if nums[i] == 0:
            continue

        # Phase 1: Simulate traversal from i
        curr = i
        seen_in_traversal = {i}

        while True:
            nxt = get_next(curr)

            # Guard 1: Same direction
            if nums[curr] * nums[nxt] < 0:
                break

            # Guard 2: No self-loop
            if nxt == curr:
                break

            # Cycle detected
            if nxt in seen_in_traversal:
                return True

            seen_in_traversal.add(nxt)
            curr = nxt

        # Phase 2: Mark all nodes on this path as 0 (dead-end)
        curr = i
        sign = nums[i]
        while nums[curr] * sign > 0:
            nxt = get_next(curr)
            nums[curr] = 0
            curr = nxt

    return False
```

* **JavaScript Implementation**:
```javascript
function circularArrayLoop_marking(nums) {
    const n = nums.length;

    function getNext(i) {
        return ((i + nums[i]) % n + n) % n;
    }

    for (let i = 0; i < n; i++) {
        if (nums[i] === 0) continue;

        // Phase 1: Simulate traversal from i
        let curr = i;
        const seenInTraversal = new Set([i]);

        while (true) {
            const nxt = getNext(curr);

            // Guard 1: Same direction
            if (nums[curr] * nums[nxt] < 0) break;

            // Guard 2: No self-loop
            if (nxt === curr) break;

            // Cycle detected
            if (seenInTraversal.has(nxt)) {
                return true;
            }

            seenInTraversal.add(nxt);
            curr = nxt;
        }

        // Phase 2: Mark all nodes on this path as 0 (dead-end)
        curr = i;
        const sign = nums[i];
        while (nums[curr] * sign > 0) {
            const nxt = getNext(curr);
            nums[curr] = 0;
            curr = nxt;
        }
    }

    return false;
}
```

* **Complexity**:
  * **Time Complexity**: $O(N^2)$ worst case, but significantly faster in practice due to early termination via the `0`-marking.
  * **Space Complexity**: $O(1)$ — marking is done in-place (modifies the input array). The per-traversal set is still $O(N)$ in this version; see Approach 3 for a true $O(1)$ space solution.

---

#### Approach 3: Fast & Slow Pointers (Optimal ✅)
* **Intuition**: Instead of tracking visited nodes with a set, use the **Hare & Tortoise** algorithm to detect cycles directly within each traversal — giving us $O(1)$ auxiliary space.

  * Treat the circular array as an implicit linked list where each element points to the next via `get_next`.
  * Move `slow` one step and `fast` two steps per iteration.
  * Apply both guards (same direction, no self-loop) at every step for **all pointers**.
  * If `slow == fast`, a cycle of length > 1 has been detected.
  * After each failed traversal, mark the path with `0` to skip it in future iterations (same dead-end optimisation as Approach 2).

* **Algorithm**:
  1. For each `i` where `nums[i] != 0`:
     - Set `slow = fast = i`.
     - Advance `slow` by 1 step and `fast` by 2 steps in each iteration.
     - Before each advance, check the direction guard and self-loop guard for every next step.
     - If the guard fails, break.
     - If `slow == fast`, return `True`.
  2. Mark the dead-end path starting from `i` with `0`.
  3. Return `False`.

* **Python Implementation**:
```python
def circularArrayLoop(nums: list[int]) -> bool:
    n = len(nums)

    def get_next(i: int) -> int:
        return ((i + nums[i]) % n + n) % n

    def is_valid_move(curr: int, nxt: int) -> bool:
        # Guard 1: Same direction (same sign)
        # Guard 2: No self-loop
        return nums[curr] * nums[nxt] > 0 and nxt != curr

    for i in range(n):
        if nums[i] == 0:
            continue

        slow, fast = i, i

        # Phase 1: Fast & Slow pointer cycle detection
        while True:
            slow_next = get_next(slow)
            fast_next = get_next(fast)
            fast_next_next = get_next(fast_next)

            if not is_valid_move(slow, slow_next):
                break
            if not is_valid_move(fast, fast_next):
                break
            if not is_valid_move(fast_next, fast_next_next):
                break

            slow = slow_next
            fast = fast_next_next

            if slow == fast:
                return True

        # Phase 2: Mark the dead-end path with 0
        curr = i
        sign = nums[i]
        while nums[curr] * sign > 0:
            nxt = get_next(curr)
            nums[curr] = 0
            curr = nxt

    return False
```

* **JavaScript Implementation**:
```javascript
function circularArrayLoop(nums) {
    const n = nums.length;

    function getNext(i) {
        return ((i + nums[i]) % n + n) % n;
    }

    function isValidMove(curr, nxt) {
        // Guard 1: Same direction (same sign)
        // Guard 2: No self-loop
        return nums[curr] * nums[nxt] > 0 && nxt !== curr;
    }

    for (let i = 0; i < n; i++) {
        if (nums[i] === 0) continue;

        let slow = i;
        let fast = i;

        // Phase 1: Fast & Slow pointer cycle detection
        while (true) {
            const slowNext = getNext(slow);
            const fastNext = getNext(fast);
            const fastNextNext = getNext(fastNext);

            if (!isValidMove(slow, slowNext)) break;
            if (!isValidMove(fast, fastNext)) break;
            if (!isValidMove(fastNext, fastNextNext)) break;

            slow = slowNext;
            fast = fastNextNext;

            if (slow === fast) {
                return true;
            }
        }

        // Phase 2: Mark the dead-end path with 0
        let curr = i;
        const sign = nums[i];
        while (nums[curr] * sign > 0) {
            const nxt = getNext(curr);
            nums[curr] = 0;
            curr = nxt;
        }
    }

    return false;
}
```

* **Complexity**:
  * **Time Complexity**: $O(N)$ amortised — each node is visited at most twice (once in a traversal, once during marking). After marking, nodes are never revisited.
  * **Space Complexity**: $O(1)$ — only pointer variables used; marking is done in-place. ✅

---

#### Dry Run: Approach 3 on `nums = [2, -1, 1, 2, 2]`
* `n = 5`
* `get_next(i)`: `[2, 4, 3, 0, 1]` → index 0 points to 2, index 2 points to 3, index 3 points to 0.

**Starting at i = 0** (nums[0] = 2, positive direction):
| Iteration | slow | fast | slow_next | fast_next_next | Valid? |
|:---------:|:----:|:----:|:---------:|:--------------:|:------:|
| Init      | 0    | 0    | —         | —              | —      |
| 1         | 2    | 3    | get_next(0)=2, get_next(get_next(0))=3 | ✅ same dir |
| 2         | 3    | 2    | get_next(2)=3, get_next(get_next(3))=2 | ✅ same dir |
| 3         | 0    | 3    | get_next(3)=0, get_next(get_next(2))=3 | ✅ same dir |
| 4         | 2    | 2    | slow == fast! | **CYCLE FOUND** ✅ |

Return `true`. The cycle is `0 → 2 → 3 → 0`.

---

#### Comparison Table
| Approach | Time | Space | Modifies Input? |
|:---------|:----:|:-----:|:---------------:|
| 1 — Brute Force | $O(N^2)$ | $O(N)$ | No |
| 2 — Visited-Marking | $O(N^2)$ worst | $O(N)$ per traversal | Yes (marks 0) |
| 3 — Fast & Slow (Optimal) | $O(N)$ amortised | $O(1)$ | Yes (marks 0) |

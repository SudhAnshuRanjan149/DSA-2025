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

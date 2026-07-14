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

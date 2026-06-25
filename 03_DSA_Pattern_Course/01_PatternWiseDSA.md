# Pattern-Wise DSA Notes & Revision

## Day 1: Two Pointers Pattern Theory

The **Two Pointers** pattern is one of the most fundamental and frequently used techniques for optimizing array, string, and linked list problems. It utilizes two reference variables (pointers) to traverse the data structure simultaneously, typically reducing the time complexity from $O(N^2)$ (nested loops) to $O(N)$ (linear time).

### 1. Intuition & Motivation
In brute-force solutions, we often use nested loops to compare every element with every other element. 
For example, to find a pair with a target sum in a sorted array, a nested loop checks all combinations $(i, j)$ with $i < j$.
By leveraging order (like a sorted array) or specific problem characteristics, we can use two pointers to prune the search space. If we know the array is sorted, the sum of `nums[left] + nums[right]` tells us exactly which pointer to move:
- If the sum is **too small**, we need a larger element, so we increment `left`.
- If the sum is **too large**, we need a smaller element, so we decrement `right`.
This allows us to process the elements in a single linear scan $O(N)$ without checking all $O(N^2)$ pairs.

---

### 2. Core Pointer Movements / Variations

#### A. Collision Pointers (Opposite Direction)
* **Setup**: One pointer at the start (`left = 0`), one pointer at the end (`right = len(nums) - 1`).
* **Movement**: Pointers move toward each other (`left += 1`, `right -= 1`).
* **Termination**: When they meet or cross (`left >= right`).
* **Typical Use Cases**:
  - Valid Palindrome checks
  - Two Sum on a Sorted Array (Target Sum)
  - Reversing an array / string
  - Container With Most Water (reducing search space greedy-style)
* **Code Template**:
```python
# Python
left, right = 0, len(nums) - 1
while left < right:
    # Perform operation / comparison
    if condition_to_move_left:
        left += 1
    elif condition_to_move_right:
        right -= 1
    else:
        # Match found / processing logic
        left += 1
        right -= 1
```
```javascript
// JavaScript
let left = 0, right = nums.length - 1;
while (left < right) {
    // Perform operation / comparison
    if (conditionToMoveLeft) {
        left++;
    } else if (conditionToMoveRight) {
        right--;
    } else {
        // Match found / processing logic
        left++;
        right--;
    }
}
```

#### B. Expansion Pointers (Outward / Opposite Direction)
* **Setup**: Start both pointers at the center (either at the same index `left = right = mid`, or adjacent `left = mid, right = mid + 1`).
* **Movement**: Pointers move away from each other (`left -= 1`, `right += 1`).
* **Termination**: When one or both pointers go out of bounds (`left < 0` or `right >= len(nums)`).
* **Typical Use Cases**:
  - Longest Palindromic Substring (checking palindromes by expanding from potential centers).
* **Code Template**:
```python
# Python
def expand_around_center(left: int, right: int) -> int:
    while left >= 0 and right < len(s) and s[left] == s[right]:
        left -= 1
        right += 1
    return right - left - 1  # Length of palindrome found
```
```javascript
// JavaScript
function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1; // Length of palindrome found
}
```

#### C. Fast & Slow Pointers (Same Direction / Hare & Tortoise)
* **Setup**: Both pointers start at the same side (usually the beginning: `slow = 0, fast = 0` or head of linked list).
* **Movement**: Pointers move in the same direction but at different speeds. Typically, `slow` moves 1 step per iteration, while `fast` moves 2 steps.
* **Termination**: When the `fast` pointer reaches the end of the data structure.
* **Typical Use Cases**:
  - Linked List Cycle Detection (Floyd’s Cycle-Finding Algorithm)
  - Finding the Middle Node of a Linked List
  - Finding the starting node of a cycle
  - Finding the $k$-th node from the end
* **Code Template**:
```python
# Python
slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast:
        return True  # Cycle detected
return False
```
```javascript
// JavaScript
let slow = head, fast = head;
while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
        return true; // Cycle detected
    }
}
return false;
```

---

### 3. When to Use Two Pointers?
* **Linear Data Structures**: The problem involves Arrays, Strings, or Linked Lists.
* **Sorted Inputs**: The array/string is sorted, or sorting it as a preprocessing step does not exceed the target time complexity.
* **Searching Pairs/Subarrays**: You are searching for pairs, triplets, or subarrays that satisfy a specific condition.
* **In-Place Operations**: The problem requests in-place manipulation with $O(1)$ auxiliary space.

---

## Day 2: Two Pointers Pattern

The **Two Pointers** pattern is a technique where two pointers (indices) are used to iterate through a data structure (typically an array or string) to solve problems with optimal time and space complexity. 

Common variations:
1. **Collision (Opposite Ends)**: One pointer starts at the beginning, the other at the end, and they move toward each other.
2. **Forward (Same Direction)**: One fast pointer, one slow pointer.

---

### 1. 125. Valid Palindrome
* **Pattern**: Two Pointers (Opposite Ends)
* **Difficulty**: Easy

#### Problem Description
Determine if a string `s` is a palindrome, considering only alphanumeric characters and ignoring cases.

#### Approach 1: Brute Force (Clean & Reverse)
* **Intuition**: Convert all characters to lowercase, filter out non-alphanumeric characters to build a new string, then compare this string with its reversed version.
* **Python Implementation**:
```python
def isPalindrome(s: str) -> bool:
    cleaned = "".join(char.lower() for char in s if char.isalnum())
    return cleaned == cleaned[::-1]
```
* **JavaScript Implementation**:
```javascript
function isPalindrome(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ where $N$ is the length of string `s`. We traverse `s` to filter and then reverse it.
  * **Space Complexity**: $O(N)$ to store the cleaned string.

#### Approach 2: Optimized (Two Pointers - Constant Space)
* **Intuition**: Keep two pointers: `left` at the beginning (0) and `right` at the end (`len(s) - 1`). Move them towards the center, skipping any non-alphanumeric characters on the fly. Compare the lowercase representation of characters at `left` and `right` at each step.
* **Python Implementation**:
```python
def isPalindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True
```
* **JavaScript Implementation**:
```javascript
function isPalindrome(s) {
    let left = 0, right = s.length - 1;
    const isAlphanumeric = (char) => /[a-zA-Z0-9]/.test(char);
    
    while (left < right) {
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ because each character is visited at most twice.
  * **Space Complexity**: $O(1)$ auxiliary space as we only store pointers.

#### Dry Run / Example Trace
* **Input**: `s = "A man, a plan, a canal: Panama"`
* **Trace**:
  1. Initialize `left = 0` (character `'A'`), `right = 29` (character `'a'`).
  2. Both are alphanumeric. Convert to lowercase: `'a' == 'a'`. Increment `left` to 1, decrement `right` to 28.
  3. `s[left]` is `' '` (not alphanumeric). Increment `left` to 2 (`'m'`).
  4. `s[right]` is `'m'`. Both alphanumeric: `'m' == 'm'`. Pointers move: `left = 3`, `right = 27`.
  5. Continue this process. Every valid alphanumeric match will align, and non-alphanumeric characters like commas, spaces, and colons are bypassed.
  6. Pointers eventually cross (`left >= right`). Return `True`.

---

### 2. 344. Reverse String
* **Pattern**: Two Pointers (Opposite Ends - In-Place Swap)
* **Difficulty**: Easy

#### Problem Description
Write a function that reverses a string in-place. The input is given as an array of characters `s`.

#### Approach 1: Brute Force (Auxiliary Array)
* **Intuition**: Create a new array, populate it by reading `s` from back to front, and then copy the values back.
* **Python Implementation**:
```python
def reverseString(s: list[str]) -> None:
    temp = s[::-1]
    for i in range(len(s)):
        s[i] = temp[i]
```
* **JavaScript Implementation**:
```javascript
function reverseString(s) {
    const temp = [...s].reverse();
    for (let i = 0; i < s.length; i++) {
        s[i] = temp[i];
    }
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$
  * **Space Complexity**: $O(N)$ to store the temporary reversed array.

#### Approach 2: Optimized (In-Place Swap)
* **Intuition**: Initialize two pointers: `left = 0` and `right = len(s) - 1`. Swap the elements at `left` and `right`, then move pointers toward the center.
* **Python Implementation**:
```python
def reverseString(s: list[str]) -> None:
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
```
* **JavaScript Implementation**:
```javascript
function reverseString(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        const temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ (performs $N/2$ swaps).
  * **Space Complexity**: $O(1)$ auxiliary space.

#### Dry Run / Example Trace
* **Input**: `s = ["h","e","l","l","o"]`
* **Trace**:
  1. `left = 0` (`'h'`), `right = 4` (`'o'`). Swap -> `s = ["o","e","l","l","h"]`. Move pointers: `left = 1`, `right = 3`.
  2. `left = 1` (`'e'`), `right = 3` (`'l'`). Swap -> `s = ["o","l","l","e","h"]`. Move pointers: `left = 2`, `right = 2`.
  3. `left < right` is no longer true (2 is not < 2). Loop terminates.
* **Final Output**: `["o","l","l","e","h"]`

---

### 3. 977. Squares of a Sorted Array
* **Pattern**: Two Pointers (Opposite Ends - Sorting on the fly)
* **Difficulty**: Easy

#### Problem Description
Given an integer array `nums` sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

#### Approach 1: Brute Force (Square & Sort)
* **Intuition**: Square every number in-place or in a new array, and then sort the array.
* **Python Implementation**:
```python
def sortedSquares(nums: list[int]) -> list[int]:
    return sorted([x * x for x in nums])
```
* **JavaScript Implementation**:
```javascript
function sortedSquares(nums) {
    return nums.map(x => x * x).sort((a, b) => a - b);
}
```
* **Complexity**:
  * **Time Complexity**: $O(N \log N)$ due to sorting.
  * **Space Complexity**: $O(N)$ if we count the output array (or $O(\log N)$ auxiliary space for sorting algorithm).

#### Approach 2: Optimized (Two Pointers - Linear Time)
* **Intuition**: Since `nums` is already sorted, the largest squares will either be at the far left (most negative) or far right (most positive). 
  We can use two pointers: `left` at 0 and `right` at `len(nums) - 1`. Compare `nums[left] ** 2` and `nums[right] ** 2`. Place the larger square at the end of our result array (filling it from right to left) and move the corresponding pointer inward.
* **Python Implementation**:
```python
def sortedSquares(nums: list[int]) -> list[int]:
    n = len(nums)
    result = [0] * n
    left, right = 0, n - 1
    curr = n - 1
    
    while left <= right:
        left_sq = nums[left] ** 2
        right_sq = nums[right] ** 2
        
        if left_sq > right_sq:
            result[curr] = left_sq
            left += 1
        else:
            result[curr] = right_sq
            right -= 1
        curr -= 1
        
    return result
```
* **JavaScript Implementation**:
```javascript
function sortedSquares(nums) {
    const n = nums.length;
    const result = new Array(n);
    let left = 0, right = n - 1;
    let curr = n - 1;
    
    while (left <= right) {
        const leftSq = nums[left] * nums[left];
        const rightSq = nums[right] * nums[right];
        
        if (leftSq > rightSq) {
            result[curr] = leftSq;
            left++;
        } else {
            result[curr] = rightSq;
            right--;
        }
        curr--;
    }
    
    return result;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ as we process each element exactly once.
  * **Space Complexity**: $O(N)$ to store the output array (or $O(1)$ auxiliary space if we do not count the output array).

#### Dry Run / Example Trace
* **Input**: `nums = [-4, -1, 0, 3, 10]`
* **Trace**:
  Initialize `result = [0, 0, 0, 0, 0]`, `left = 0`, `right = 4`, `curr = 4`.
  1. `left_sq = (-4)^2 = 16`, `right_sq = (10)^2 = 100`.
     - `16 < 100` -> `result[4] = 100`. Move `right` to 3, `curr` to 3.
  2. `left_sq = (-4)^2 = 16`, `right_sq = (3)^2 = 9`.
     - `16 > 9` -> `result[3] = 16`. Move `left` to 1, `curr` to 2.
  3. `left_sq = (-1)^2 = 1`, `right_sq = (3)^2 = 9`.
     - `1 < 9` -> `result[2] = 9`. Move `right` to 2, `curr` to 1.
  4. `left_sq = (-1)^2 = 1`, `right_sq = (0)^2 = 0`.
     - `1 > 0` -> `result[1] = 1`. Move `left` to 2, `curr` to 0.
  5. `left_sq = (0)^2 = 0`, `right_sq = (0)^2 = 0`.
     - `0 == 0` -> `result[0] = 0`. Move `right` to 1, `curr` to -1.
  6. Loop ends because `left` (2) > `right` (1).
* **Final Output**: `[0, 1, 9, 16, 100]`

---

### 4. 680. Valid Palindrome II
* **Pattern**: Two Pointers (Opposite Ends with Mismatch Tolerance)
* **Difficulty**: Easy/Medium

#### Problem Description
Given a string `s`, return `true` if the `s` can be a palindrome after deleting **at most one** character from it.

#### Approach 1: Brute Force
* **Intuition**: Delete every character one by one and check if the resulting string of length $N-1$ is a palindrome.
* **Complexity**:
  * **Time Complexity**: $O(N^2)$ because there are $N$ options for deletion, and verifying each takes $O(N)$ time.
  * **Space Complexity**: $O(N)$ to create and store the candidate substrings.

#### Approach 2: Optimized (Two Pointers - Greedy Deletion)
* **Intuition**: Use two pointers starting at both ends. Compare elements. 
  - If they match, move both pointers inward.
  - If a mismatch is encountered (i.e., `s[left] != s[right]`), we have one deletion budget. We can either:
    1. Delete `s[left]` and check if `s[left+1 ... right]` is a palindrome.
    2. Delete `s[right]` and check if `s[left ... right-1]` is a palindrome.
  - If either of these candidate substrings is a palindrome, then the original string can be a palindrome with one deletion. Otherwise, it cannot.
* **Python Implementation**:
```python
def validPalindrome(s: str) -> bool:
    def is_palindrome_range(l: int, r: int) -> bool:
        while l < r:
            if s[l] != s[r]:
                return False
            l += 1
            r -= 1
        return True

    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            # Try deleting left char OR deleting right char
            return is_palindrome_range(left + 1, right) or is_palindrome_range(left, right - 1)
        left += 1
        right -= 1
    return True
```
* **JavaScript Implementation**:
```javascript
function validPalindrome(s) {
    const isPalindromeRange = (l, r) => {
        while (l < r) {
            if (s[l] !== s[r]) return false;
            l++;
            r--;
        }
        return true;
    };

    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) {
            // Try deleting left char OR deleting right char
            return isPalindromeRange(left + 1, right) || isPalindromeRange(left, right - 1);
        }
        left++;
        right--;
    }
    return true;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ since we check at most two shortened substrings of length at most $N$.
  * **Space Complexity**: $O(1)$ auxiliary space since we only pass indices to the helper function.

#### Dry Run / Example Trace
* **Input**: `s = "abca"`
* **Trace**:
  1. `left = 0` (`'a'`), `right = 3` (`'a'`). They match. Move pointers: `left = 1`, `right = 2`.
  2. `left = 1` (`'b'`), `right = 2` (`'c'`). Mismatch!
     - **Option A**: Delete `s[left]` (`'b'`). Check if `s[2:3]` (`"c"`) is a palindrome -> `is_palindrome_range(2, 2)` -> Returns `True`.
     - **Option B**: Delete `s[right]` (`'c'`). Check if `s[1:2]` (`"b"`) is a palindrome -> `is_palindrome_range(1, 1)` -> Returns `True`.
     - Since Option A or Option B is `True`, return `True`.

---

### 5. Valid Word Abbreviation (LeetCode 408 / NeetCode)
* **Pattern**: Two Pointers (Dual String Traversals)
* **Difficulty**: Easy/Medium

#### Problem Description
Given a non-empty string `word` and an abbreviation `abbr`, return whether the string matches the given abbreviation.
An abbreviation replaces non-overlapping, non-empty substrings with their lengths. A length must not contain leading zeros (e.g., `"01"` is invalid).

#### Approach: Optimized (Two Pointers - Simultaneous Check)
* **Intuition**: Keep two pointers: `p1` for `word` and `p2` for `abbr`.
  - If `abbr[p2]` is a letter, it must match `word[p1]` exactly.
  - If `abbr[p2]` is a digit:
    - It cannot be `'0'` (no leading zeros allowed).
    - Parse the whole integer value by reading consecutive digits.
    - Advance the `word` pointer `p1` by this value.
  - After completing the loop, both pointers must have reached the end of their respective strings (`p1 == len(word)` and `p2 == len(abbr)`).
* **Python Implementation**:
```python
def validWordAbbreviation(word: str, abbr: str) -> bool:
    p1, p2 = 0, 0
    n1, n2 = len(word), len(abbr)
    
    while p1 < n1 and p2 < n2:
        if abbr[p2].isdigit():
            # Leading zero is invalid
            if abbr[p2] == '0':
                return False
            
            # Parse the full number
            val = 0
            while p2 < n2 and abbr[p2].isdigit():
                val = val * 10 + int(abbr[p2])
                p2 += 1
            
            # Skip characters in word
            p1 += val
        else:
            if word[p1] != abbr[p2]:
                return False
            p1 += 1
            p2 += 1
            
    return p1 == n1 and p2 == n2
```
* **JavaScript Implementation**:
```javascript
function validWordAbbreviation(word, abbr) {
    let p1 = 0, p2 = 0;
    const n1 = word.length, n2 = abbr.length;
    
    while (p1 < n1 && p2 < n2) {
        const char = abbr[p2];
        if (char >= '0' && char <= '9') {
            // Leading zero is invalid
            if (char === '0') {
                return false;
            }
            
            let val = 0;
            while (p2 < n2 && abbr[p2] >= '0' && abbr[p2] <= '9') {
                val = val * 10 + Number(abbr[p2]);
                p2++;
            }
            // Skip characters in word
            p1 += val;
        } else {
            if (word[p1] !== abbr[p2]) {
                return false;
            }
            p1++;
            p2++;
        }
    }
    
    return p1 === n1 && p2 === n2;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N + M)$ where $N$ is the length of `word` and $M$ is the length of `abbr`. We traverse each string at most once.
  * **Space Complexity**: $O(1)$ auxiliary space.

#### Dry Run / Example Trace
* **Input**: `word = "internationalization"`, `abbr = "i12iz4n"`
* **Trace**:
  `n1 = 20`, `n2 = 7`. Initialize `p1 = 0`, `p2 = 0`.
  1. `abbr[0]` is `'i'` (letter). Matches `word[0]` (`'i'`). Increment `p1 = 1`, `p2 = 1`.
  2. `abbr[1]` is `'1'` (digit). Parse number:
     - `'1'` -> `val = 1`
     - `abbr[2]` is `'2'` (digit) -> `val = 12`
     - `abbr[3]` is `'i'` (not digit) -> stop parsing.
     - Set `p2 = 3`.
     - Advance `p1` by 12 -> `p1 = 1 + 12 = 13`.
  3. `p1 = 13`, `p2 = 3`.
     - `abbr[3]` is `'i'`. `word[13]` is `'i'`. Matches! Increment `p1 = 14`, `p2 = 4`.
  4. `p1 = 14`, `p2 = 4`.
     - `abbr[4]` is `'z'`. `word[14]` is `'z'`. Matches! Increment `p1 = 15`, `p2 = 5`.
  5. `p1 = 15`, `p2 = 5`.
     - `abbr[5]` is `'4'` (digit). Parse number:
       - `'4'` -> `val = 4`.
       - Set `p2 = 6`.
       - Advance `p1` by 4 -> `p1 = 15 + 4 = 19`.
  6. `p1 = 19`, `p2 = 6`.
     - `abbr[6]` is `'n'`. `word[19]` is `'n'`. Matches! Increment `p1 = 20`, `p2 = 7`.
  7. Loop ends because `p1 == n1` and `p2 == n2`.
  8. Return `p1 == n1 and p2 == n2` (20 == 20 and 7 == 7) -> `True`.

---

## Day 3: Two Pointers Pattern Continued

On Day 3, we dive deeper into the Two Pointers pattern, specifically focusing on sorting-based applications, multi-pointer collision, and in-place mergers.

---

### 1. 88. Merge Sorted Array
* **Pattern**: Two Pointers (Starting from the End)
* **Difficulty**: Easy

#### Problem Description
Given two sorted integer arrays `nums1` and `nums2`, merge `nums2` into `nums1` as one sorted array. `nums1` has a size of `m + n` where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. The merge should happen in-place.

#### Approach 1: Brute Force (Insert & Sort)
* **Intuition**: Copy the elements of `nums2` into the empty slots at the end of `nums1`, then sort `nums1`.
* **Python Implementation**:
```python
def merge(nums1: list[int], m: int, nums2: list[int], n: int) -> None:
    for i in range(n):
        nums1[m + i] = nums2[i]
    nums1.sort()
```
* **JavaScript Implementation**:
```javascript
function merge(nums1, m, nums2, n) {
    for (let i = 0; i < n; i++) {
        nums1[m + i] = nums2[i];
    }
    nums1.sort((a, b) => a - b);
}
```
* **Complexity**:
  * **Time Complexity**: $O((m + n) \log(m + n))$ due to sorting the entire array.
  * **Space Complexity**: $O(1)$ auxiliary space (or $O(\log(m+n))$ depending on the sorting implementation).

#### Approach 2: Optimized (Two Pointers from the End)
* **Intuition**: Since both arrays are already sorted, the largest elements are at the ends of `nums1` (the first `m` elements) and `nums2`. We can compare elements starting from the end of both arrays and place the larger element at the very end of `nums1`. This avoids overwriting elements in `nums1` that we haven't processed yet.
* **Python Implementation**:
```python
def merge(nums1: list[int], m: int, nums2: list[int], n: int) -> None:
    p1, p2, p = m - 1, n - 1, m + n - 1
    while p1 >= 0 and p2 >= 0:
        if nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1
    
    # If nums2 has leftover elements, copy them (leftover nums1 are already in place)
    while p2 >= 0:
        nums1[p] = nums2[p2]
        p2 -= 1
        p -= 1
```
* **JavaScript Implementation**:
```javascript
function merge(nums1, m, nums2, n) {
    let p1 = m - 1;
    let p2 = n - 1;
    let p = m + n - 1;
    
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }
    
    // Copy remaining elements from nums2 if any
    while (p2 >= 0) {
        nums1[p] = nums2[p2];
        p2--;
        p--;
    }
}
```
* **Complexity**:
  * **Time Complexity**: $O(m + n)$ since we iterate through each element at most once.
  * **Space Complexity**: $O(1)$ auxiliary space because we merge in-place.

#### Dry Run / Example Trace
* **Input**: `nums1 = [1, 2, 3, 0, 0, 0]`, `m = 3`, `nums2 = [2, 5, 6]`, `n = 3`
* **Trace**:
  Initialize `p1 = 2` (value `3`), `p2 = 2` (value `6`), `p = 5` (last slot).
  1. Compare `nums1[p1]` (3) and `nums2[p2]` (6).
     - `3 < 6` -> Place `6` at `nums1[5]`. `nums1 = [1, 2, 3, 0, 0, 6]`. Decrement `p2` to 1, `p` to 4.
  2. Compare `nums1[p1]` (3) and `nums2[p2]` (5).
     - `3 < 5` -> Place `5` at `nums1[4]`. `nums1 = [1, 2, 3, 0, 5, 6]`. Decrement `p2` to 0, `p` to 3.
  3. Compare `nums1[p1]` (3) and `nums2[p2]` (2).
     - `3 > 2` -> Place `3` at `nums1[3]`. `nums1 = [1, 2, 3, 3, 5, 6]`. Decrement `p1` to 1, `p` to 2.
  4. Compare `nums1[p1]` (2) and `nums2[p2]` (2).
     - `2 == 2` -> Place `2` from `nums2` at `nums1[2]`. `nums1 = [1, 2, 2, 3, 5, 6]`. Decrement `p2` to -1, `p` to 1.
  5. `p2 >= 0` is now false. Loop terminates.
  6. No elements left in `nums2` to copy. Merge is complete!
* **Final Output**: `nums1 = [1, 2, 2, 3, 5, 6]`

---

### 2. 2824. Count Pairs Whose Sum is Less than Target
* **Pattern**: Two Pointers (Sorting + Collision)
* **Difficulty**: Easy

#### Problem Description
Given a 0-indexed integer array `nums` of length `n` and an integer `target`, return the number of pairs `(i, j)` such that `0 <= i < j < n` and `nums[i] + nums[j] < target`.

#### Approach 1: Brute Force (Nested Loops)
* **Intuition**: Check all possible pairs `(i, j)` where `i < j` and count those that sum to less than `target`.
* **Python Implementation**:
```python
def countPairs(nums: list[int], target: int) -> int:
    count = 0
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] < target:
                count += 1
    return count
```
* **JavaScript Implementation**:
```javascript
function countPairs(nums, target) {
    let count = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] < target) {
                count++;
            }
        }
    }
    return count;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N^2)$ due to nested iteration over all pairs.
  * **Space Complexity**: $O(1)$ auxiliary space.

#### Approach 2: Optimized (Sorting + Two Pointers)
* **Intuition**: Sort the array. Now, we use two pointers: `left` at the beginning and `right` at the end.
  - If `nums[left] + nums[right] < target`, then the sum of `nums[left]` with any element between `left` and `right` will also be less than `target` because the array is sorted. Thus, there are `right - left` valid pairs starting with `nums[left]`. Add this count to the result and move `left` forward (`left += 1`).
  - If the sum is $\ge$ `target`, the sum is too large. We need a smaller element, so move `right` backward (`right -= 1`).
* **Python Implementation**:
```python
def countPairs(nums: list[int], target: int) -> int:
    nums.sort()
    count = 0
    left, right = 0, len(nums) - 1
    while left < right:
        if nums[left] + nums[right] < target:
            count += (right - left)
            left += 1
        else:
            right -= 1
    return count
```
* **JavaScript Implementation**:
```javascript
function countPairs(nums, target) {
    nums.sort((a, b) => a - b);
    let count = 0;
    let left = 0, right = nums.length - 1;
    while (left < right) {
        if (nums[left] + nums[right] < target) {
            count += (right - left);
            left++;
        } else {
            right--;
        }
    }
    return count;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N \log N)$ where sorting takes $O(N \log N)$ and the two-pointer scan takes $O(N)$.
  * **Space Complexity**: $O(\log N)$ or $O(1)$ auxiliary space depending on the sorting algorithm.

#### Dry Run / Example Trace
* **Input**: `nums = [-1, 1, 2, 3, 1]`, `target = 2`
* **Trace**:
  1. Sort array: `nums = [-1, 1, 1, 2, 3]`.
  2. Initialize `left = 0` (value `-1`), `right = 4` (value `3`), `count = 0`.
  3. Compare `nums[left] + nums[right] = -1 + 3 = 2`.
     - `2 < target` (2 < 2) is **False**. Decrement `right` to 3.
  4. Compare `nums[left] + nums[right] = -1 + 2 = 1`.
     - `1 < 2` is **True**. 
     - Pairs possible: `(-1, 2)`, `(-1, 1)`, `(-1, 1)`. Total of `right - left = 3 - 0 = 3` pairs.
     - `count` becomes `3`. Increment `left` to 1.
  5. Compare `nums[left] + nums[right] = 1 + 2 = 3`.
     - `3 < 2` is **False**. Decrement `right` to 2.
  6. Compare `nums[left] + nums[right] = 1 + 1 = 2`.
     - `2 < 2` is **False**. Decrement `right` to 1.
  7. Loop ends because `left < right` (1 < 1) is **False**.
* **Final Output**: `3`

---

### 3. 1. Two Sum
* **Pattern**: Hash Map (Optimized) / Two Pointers (with index preservation)
* **Difficulty**: Easy

#### Problem Description
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

#### Approach 1: Brute Force (Nested Loops)
* **Intuition**: Check all pairs to see if they sum up to `target`.
* **Python Implementation**:
```python
def twoSum(nums: list[int], target: int) -> list[int]:
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
```
* **JavaScript Implementation**:
```javascript
function twoSum(nums, target) {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}
```
* **Complexity**:
  * **Time Complexity**: $O(N^2)$ due to nested iteration.
  * **Space Complexity**: $O(1)$ auxiliary space.

#### Approach 2: Hash Map (Single Pass - Most Optimized for general arrays)
* **Intuition**: Traverse the array while keeping a hash map of `value -> index`. For each number, check if its complement (`target - num`) is already in the map. If it is, return their indices.
* **Python Implementation**:
```python
def twoSum(nums: list[int], target: int) -> list[int]:
    num_to_idx = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_to_idx:
            return [num_to_idx[complement], i]
        num_to_idx[num] = i
    return []
```
* **JavaScript Implementation**:
```javascript
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ since map lookups are $O(1)$ on average.
  * **Space Complexity**: $O(N)$ to store array elements in the map.

#### Approach 3: Two Pointers (Sorting with Index Preservation)
* **Intuition**: To apply the Two Pointers pattern, we must sort the array first. However, sorting scrambles the indices. To fix this, store each element as a pair: `(value, original_index)`. Sort these pairs, then run collision pointers.
* **Python Implementation**:
```python
def twoSum(nums: list[int], target: int) -> list[int]:
    # Pair each number with its original index
    indexed_nums = [(num, i) for i, num in enumerate(nums)]
    indexed_nums.sort(key=lambda x: x[0])
    
    left, right = 0, len(nums) - 1
    while left < right:
        curr_sum = indexed_nums[left][0] + indexed_nums[right][0]
        if curr_sum == target:
            return [indexed_nums[left][1], indexed_nums[right][1]]
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return []
```
* **JavaScript Implementation**:
```javascript
function twoSum(nums, target) {
    // Pair each number with its original index
    const indexedNums = nums.map((num, i) => [num, i]);
    indexedNums.sort((a, b) => a[0] - b[0]);
    
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const sum = indexedNums[left][0] + indexedNums[right][0];
        if (sum === target) {
            return [indexedNums[left][1], indexedNums[right][1]];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [];
}
```
* **Complexity**:
  * **Time Complexity**: $O(N \log N)$ because of the sorting step.
  * **Space Complexity**: $O(N)$ to store the array of indexed values.

#### Dry Run / Example Trace (Two Pointers)
* **Input**: `nums = [3, 2, 4]`, `target = 6`
* **Trace**:
  1. Map to index: `[(3, 0), (2, 1), (4, 2)]`.
  2. Sort by value: `indexed_nums = [(2, 1), (3, 0), (4, 2)]`.
  3. Initialize `left = 0` (value 2, original index 1), `right = 2` (value 4, original index 2).
  4. Compare `nums[left] + nums[right] = 2 + 4 = 6`.
     - `6 == target` -> Match! Return original indices: `[1, 2]`.
* **Final Output**: `[1, 2]`

---

### 4. 680. Valid Palindrome II
* **Pattern**: Two Pointers (Opposite Ends with Mismatch Tolerance)
* **Difficulty**: Easy/Medium

#### Problem Description
Given a string `s`, return `true` if the `s` can be a palindrome after deleting **at most one** character from it.

> [!NOTE]
> This question was analyzed in detail in the **Day 2 Notes**. Below is a summary of the optimized approach.

#### Approach: Optimized (Two Pointers - Greedy Deletion)
* **Intuition**: Keep `left` and `right` pointers at the ends of the string. If a mismatch is encountered (`s[left] != s[right]`), we check whether either deleting `s[left]` (verify `s[left+1 ... right]`) or deleting `s[right]` (verify `s[left ... right-1]`) forms a palindrome.
* **Python Implementation**:
```python
def validPalindrome(s: str) -> bool:
    def is_palindrome_range(l: int, r: int) -> bool:
        while l < r:
            if s[l] != s[r]:
                return False
            l += 1
            r -= 1
        return True

    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return is_palindrome_range(left + 1, right) or is_palindrome_range(left, right - 1)
        left += 1
        right -= 1
    return True
```
* **JavaScript Implementation**:
```javascript
function validPalindrome(s) {
    const isPalindromeRange = (l, r) => {
        while (l < r) {
            if (s[l] !== s[r]) return false;
            l++;
            r--;
        }
        return true;
    };

    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) {
            return isPalindromeRange(left + 1, right) || isPalindromeRange(left, right - 1);
        }
        left++;
        right--;
    }
    return true;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ as we check the string at most twice.
  * **Space Complexity**: $O(1)$ auxiliary space.

---

### 5. 167. Two Sum II - Input Array Is Sorted
* **Pattern**: Two Pointers (Opposite Ends Collision)
* **Difficulty**: Easy

#### Problem Description
Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return their 1-indexed positions.

#### Approach 1: Brute Force (Nested Loops)
* **Intuition**: Check all pairs.
* **Complexity**: Time $O(N^2)$, Space $O(1)$.

#### Approach 2: Optimized (Two Pointers - Linear Time)
* **Intuition**: Since the array is already sorted, we can avoid extra space by putting one pointer at `left = 0` and the other at `right = len(numbers) - 1`. If `numbers[left] + numbers[right]` equals `target`, we return their 1-based indices. If the sum is smaller than `target`, we increase `left` to get a larger sum. If the sum is larger, we decrease `right` to get a smaller sum.
* **Python Implementation**:
```python
def twoSum(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1
    while left < right:
        curr_sum = numbers[left] + numbers[right]
        if curr_sum == target:
            return [left + 1, right + 1]
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return []
```
* **JavaScript Implementation**:
```javascript
function twoSum(numbers, target) {
    let left = 0, right = numbers.length - 1;
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) {
            return [left + 1, right + 1];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [];
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ since the pointers process each element at most once.
  * **Space Complexity**: $O(1)$ auxiliary space.

#### Dry Run / Example Trace
* **Input**: `numbers = [2, 7, 11, 15]`, `target = 9`
* **Trace**:
  1. Initialize `left = 0` (value `2`), `right = 3` (value `15`).
  2. `numbers[left] + numbers[right] = 2 + 15 = 17`.
     - `17 > 9` -> Decrement `right` to 2.
  3. `numbers[left] + numbers[right] = 2 + 11 = 13`.
     - `13 > 9` -> Decrement `right` to 1.
  4. `numbers[left] + numbers[right] = 2 + 7 = 9`.
     - `9 == 9` -> Match found! Return 1-based indices: `[left + 1, right + 1]` -> `[1, 2]`.
* **Final Output**: `[1, 2]`

---

### 6. 15. 3Sum
* **Pattern**: Two Pointers (Fix One + Two Pointer Collision)
* **Difficulty**: Medium

#### Problem Description
Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. The solution must not contain duplicate triplets.

#### Approach 1: Brute Force (Triple Nested Loops with Set)
* **Intuition**: Loop through all unique triplets `(i, j, k)`, sum them, and check if they equal 0. Use a set to prevent duplicate triplets in the output.
* **Complexity**:
  * **Time Complexity**: $O(N^3 \log K)$ where $K$ is the number of valid triplets, due to the triple nested loop and sorting triplets before insertion into the set.
  * **Space Complexity**: $O(N)$ or $O(K)$ to store unique triplets.

#### Approach 2: Optimized (Sorting + Fix One + Two Pointers)
* **Intuition**: Sort the array. Fix the first element `nums[i]`. Now, the problem reduces to finding two numbers that sum up to `-nums[i]` (which is a standard Two Sum II problem!).
  - To avoid duplicates, if `nums[i] == nums[i-1]`, we skip this iteration.
  - Since the array is sorted, if `nums[i] > 0`, the sum can never be 0 (as all subsequent elements are also positive), so we can break early.
  - Move `left` and `right` inward. When a match is found, add the triplet to results and advance pointers, skipping duplicates for both `left` and `right`.
* **Python Implementation**:
```python
def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    result = []
    n = len(nums)
    
    for i in range(n - 2):
        # If the smallest number is positive, sum of three positive numbers can't be 0
        if nums[i] > 0:
            break
        # Skip duplicate values for the fixed first element
        if i > 0 and nums[i] == nums[i - 1]:
            continue
            
        left, right = i + 1, n - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                # Skip duplicate elements for left and right pointers
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
                
    return result
```
* **JavaScript Implementation**:
```javascript
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    const n = nums.length;
    
    for (let i = 0; i < n - 2; i++) {
        // If the smallest number is positive, sum can't be 0
        if (nums[i] > 0) {
            break;
        }
        // Skip duplicates for first element
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        
        let left = i + 1, right = n - 1;
        while (left < right) {
            const total = nums[i] + nums[left] + nums[right];
            if (total === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                left++;
                right--;
            } else if (total < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N^2)$ since sorting takes $O(N \log N)$ and we do a nested two-pointer traversal $O(N)$ for each of the $N$ elements.
  * **Space Complexity**: $O(\log N)$ or $O(1)$ auxiliary space depending on the sorting implementation.

#### Dry Run / Example Trace
* **Input**: `nums = [-1, 0, 1, 2, -1, -4]`
* **Trace**:
  1. Sort array: `nums = [-4, -1, -1, 0, 1, 2]`.
  2. **i = 0** (`nums[0] = -4`):
     - `left = 1` (`-1`), `right = 5` (`2`).
     - `total = -4 + (-1) + 2 = -3 < 0` -> `left += 1` -> `left = 2` (`-1`).
     - `total = -4 + (-1) + 2 = -3 < 0` -> `left += 1` -> `left = 3` (`0`).
     - `total = -4 + 0 + 2 = -2 < 0` -> `left += 1` -> `left = 4` (`1`).
     - `total = -4 + 1 + 2 = -1 < 0` -> `left += 1` -> `left = 5`. Loop terminates.
  3. **i = 1** (`nums[1] = -1`):
     - `left = 2` (`-1`), `right = 5` (`2`).
     - `total = -1 + (-1) + 2 = 0`. Add triplet `[-1, -1, 2]` to result.
       - Skip left duplicates: None (`nums[2] !== nums[3]`).
       - Skip right duplicates: None.
       - Move pointers: `left = 3` (`0`), `right = 4` (`1`).
     - `total = -1 + 0 + 1 = 0`. Add triplet `[-1, 0, 1]` to result.
       - Move pointers: `left = 4`, `right = 3`. Loop terminates.
  4. **i = 2** (`nums[2] = -1`):
     - Duplicate value skipped since `nums[2] == nums[1]`.
  5. **i = 3** (`nums[3] = 0`):
     - `left = 4` (`1`), `right = 5` (`2`).
     - `total = 0 + 1 + 2 = 3 > 0` -> `right -= 1` -> `right = 4`. Loop terminates.
  6. **i = 4** (`nums[4] = 1`):
     - Outer loop range ended (`i < n - 2`).
* **Final Output**: `[[-1, -1, 2], [-1, 0, 1]]`

---

## Day 4: Two Pointers Pattern Continued & Linked List Pointers

On Day 4, we explore partition-based pointer movements (sorting subset boundaries) and fast & slow pointers spacing (sliding window size) for linked lists.

---

### 1. Sort Two Colors (Binary Array Sort)
* **Pattern**: Two Pointers (Boundary Partition / Collision)
* **Difficulty**: Easy (Video Lecture Problem)

#### Problem Description
Given an array containing only `0`s and `1`s, sort the array in-place so that all `0`s come first, followed by all `1`s.

#### Approach 1: Two Pass (Counting)
* **Intuition**: Count the number of `0`s. Then, overwrite the first `count_zero` indices with `0` and the rest with `1`.
* **Python Implementation**:
```python
def sortTwoColors(nums: list[int]) -> None:
    count_zero = nums.count(0)
    for i in range(len(nums)):
        if i < count_zero:
            nums[i] = 0
        else:
            nums[i] = 1
```
* **JavaScript Implementation**:
```javascript
function sortTwoColors(nums) {
    let countZero = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) countZero++;
    }
    for (let i = 0; i < nums.length; i++) {
        if (i < countZero) {
            nums[i] = 0;
        } else {
            nums[i] = 1;
        }
    }
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ because we traverse the array twice.
  * **Space Complexity**: $O(1)$ auxiliary space.

#### Approach 2: One Pass (Collision Pointers)
* **Intuition**: Place `left` at the start and `right` at the end. 
  - If `nums[left] == 1` and `nums[right] == 0`, they are out of order, so swap them and move both pointers.
  - If `nums[left]` is already `0`, it is in the correct position, so increment `left`.
  - If `nums[right]` is already `1`, it is in the correct position, so decrement `right`.
* **Python Implementation**:
```python
def sortTwoColors(nums: list[int]) -> None:
    left, right = 0, len(nums) - 1
    while left < right:
        if nums[left] == 1 and nums[right] == 0:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1
        else:
            if nums[left] == 0:
                left += 1
            if nums[right] == 1:
                right -= 1
```
* **JavaScript Implementation**:
```javascript
function sortTwoColors(nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        if (nums[left] === 1 && nums[right] === 0) {
            const temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        } else {
            if (nums[left] === 0) left++;
            if (nums[right] === 1) right--;
        }
    }
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ single pass.
  * **Space Complexity**: $O(1)$ auxiliary space.

#### Dry Run / Example Trace
* **Input**: `nums = [1, 0, 1, 1, 0]`
* **Trace**:
  1. Initialize `left = 0` (value `1`), `right = 4` (value `0`).
  2. Swap: `nums[left]` and `nums[right]` -> `nums = [0, 0, 1, 1, 1]`. Increment `left` to 1, decrement `right` to 3.
  3. `nums[left]` (value `0`) is correct. Increment `left` to 2.
  4. `nums[right]` (value `1`) is correct. Decrement `right` to 2.
  5. `left < right` (2 < 2) is **False**. Loop terminates.
* **Final Output**: `[0, 0, 1, 1, 1]`

---

### 2. 75. Sort Colors
* **Pattern**: Three Pointers (Dutch National Flag Algorithm)
* **Difficulty**: Medium

#### Problem Description
Given an array `nums` containing red, white, and blue objects (represented by `0`, `1`, and `2`), sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

#### Approach 1: Two Pass (Counting)
* **Intuition**: Count the frequencies of `0`, `1`, and `2`. Overwrite the array in order of frequency.
* **Complexity**: Time $O(N)$ (two passes), Space $O(1)$.

#### Approach 2: One Pass (Dutch National Flag Algorithm)
* **Intuition**: Maintain three pointers to partition the array:
  - `low` marks the boundary for elements `< 1` (i.e. `0`s).
  - `high` marks the boundary for elements `> 1` (i.e. `2`s).
  - `mid` is the current explorer pointer.
  - While `mid <= high`:
    - If `nums[mid] == 0`: swap `nums[mid]` and `nums[low]`, increment `low` and `mid`.
    - If `nums[mid] == 1`: increment `mid`.
    - If `nums[mid] == 2`: swap `nums[mid]` and `nums[high]`, decrement `high` (do not increment `mid` yet, as the new element at `mid` needs to be checked).
* **Python Implementation**:
```python
def sortColors(nums: list[int]) -> None:
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
```
* **JavaScript Implementation**:
```javascript
function sortColors(nums) {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] === 0) {
            const temp = nums[low];
            nums[low] = nums[mid];
            nums[mid] = temp;
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            const temp = nums[high];
            nums[high] = nums[mid];
            nums[mid] = temp;
            high--;
        }
    }
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ (exactly one pass).
  * **Space Complexity**: $O(1)$ auxiliary space.

#### Dry Run / Example Trace
* **Input**: `nums = [2, 0, 2, 1, 1, 0]`
* **Trace**:
  Initialize `low = 0`, `mid = 0`, `high = 5`.
  1. `nums[mid] = 2`: Swap `nums[mid]` (2) with `nums[high]` (0). 
     - Array becomes `[0, 0, 2, 1, 1, 2]`. Decrement `high` to 4.
  2. `nums[mid] = 0`: Swap `nums[mid]` (0) with `nums[low]` (0). 
     - Array stays `[0, 0, 2, 1, 1, 2]`. Increment `low` to 1, `mid` to 1.
  3. `nums[mid] = 0`: Swap `nums[mid]` (0) with `nums[low]` (0).
     - Array stays `[0, 0, 2, 1, 1, 2]`. Increment `low` to 2, `mid` to 2.
  4. `nums[mid] = 2`: Swap `nums[mid]` (2) with `nums[high]` (1).
     - Array becomes `[0, 0, 1, 1, 2, 2]`. Decrement `high` to 3.
  5. `nums[mid] = 1`: Increment `mid` to 3.
  6. `nums[mid] = 1`: Increment `mid` to 4.
  7. Loop terminates because `mid` (4) > `high` (3).
* **Final Output**: `[0, 0, 1, 1, 2, 2]`

---

### 3. 19. Remove Nth Node From End of List
* **Pattern**: Two Pointers (Linked List Fast & Slow / Pointer Spacing)
* **Difficulty**: Medium

#### Problem Description
Given the `head` of a linked list, remove the $n$-th node from the end of the list and return its head.

#### Approach 1: Two Pass (Length Calculation)
* **Intuition**: Find the total length $L$ of the list. Move $L - n$ steps from a dummy node pointing to `head` to reach the node *before* the deletion target, then rewrite the next pointer.
* **Complexity**: Time $O(L)$ (two passes), Space $O(1)$.

#### Approach 2: One Pass (Fast & Slow Pointers with Spacing)
* **Intuition**: Use two pointers starting at a dummy node pointing to the head. 
  1. Advance the `fast` pointer $n + 1$ steps forward. Now, the spacing between `fast` and `slow` is exactly $n$ nodes.
  2. Advance both pointers at the same speed until `fast` becomes `null`.
  3. Because of the spacing, when `fast` reaches the end (`null`), `slow` will point directly to the node *before* the target node.
  4. Perform deletion: `slow.next = slow.next.next`.
* **Python Implementation**:
```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeNthFromEnd(head: ListNode, n: int) -> ListNode:
    dummy = ListNode(0, head)
    fast = slow = dummy
    
    # Move fast pointer n + 1 steps ahead
    for _ in range(n + 1):
        fast = fast.next
        
    # Move both pointers till fast reaches the end
    while fast:
        fast = fast.next
        slow = slow.next
        
    # Delete the nth node from the end
    slow.next = slow.next.next
    return dummy.next
```
* **JavaScript Implementation**:
```javascript
// Definition for singly-linked list.
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0, head);
    let fast = dummy;
    let slow = dummy;
    
    // Move fast pointer n + 1 steps ahead
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    // Move both pointers till fast reaches the end
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }
    
    // Delete the nth node from the end
    slow.next = slow.next.next;
    return dummy.next;
}
```
* **Complexity**:
  * **Time Complexity**: $O(L)$ where $L$ is the length of the linked list. Single pass traversal.
  * **Space Complexity**: $O(1)$ auxiliary space.

#### Dry Run / Example Trace
* **Input**: `head = [1, 2, 3, 4, 5]`, `n = 2`
* **Trace**:
  - `dummy` node points to `1`. `fast = dummy`, `slow = dummy`.
  - Advance `fast` by `n + 1 = 3` steps:
    - Step 1: `fast` at node `1`
    - Step 2: `fast` at node `2`
    - Step 3: `fast` at node `3`
  - Now `fast` is at `3`, `slow` is at `dummy`.
  - Move both pointers until `fast` is `null`:
    - Move 1: `fast` at `4`, `slow` at `1`
    - Move 2: `fast` at `5`, `slow` at `2`
    - Move 3: `fast` at `null`, `slow` at `3`
  - Loop ends. `slow` points to `3`. The next node `4` is the node to delete.
  - Delete node: `slow.next = slow.next.next` -> `3.next = 5`.
  - Return `dummy.next` (`head`).
* **Final Output**: `[1, 2, 3, 5]`

---

## Day 5: Two Pointers Pattern Continued & LCA

On Day 5, we explore strobogrammatic numbers, Lowest Common Ancestor (LCA) utilizing parent pointers, and greedy matching of subsequences.

---

### 1. Strobogrammatic Number (LeetCode 246)
* **Pattern**: Two Pointers (Opposite Ends Collision)
* **Difficulty**: Easy

#### Problem Description
A strobogrammatic number is a number that looks the same when rotated 180 degrees (upside down). Given a string `num` representing an integer, return `true` if it is strobogrammatic, or `false` otherwise.

#### Approach 1: Brute Force (Build Rotated String)
* **Intuition**: Create a reversed string by mapping each character in `num` to its rotated counterpart (if valid). If any character has no valid rotation, return `false`. Finally, compare the newly built string with the original `num`.
* **Python Implementation**:
```python
def isStrobogrammatic(num: str) -> bool:
    rotated_map = {'0': '0', '1': '1', '6': '9', '8': '8', '9': '6'}
    rotated_chars = []
    for char in reversed(num):
        if char not in rotated_map:
            return False
        rotated_chars.append(rotated_map[char])
    return "".join(rotated_chars) == num
```
* **JavaScript Implementation**:
```javascript
function isStrobogrammatic(num) {
    const rotatedMap = { '0': '0', '1': '1', '6': '9', '8': '8', '9': '6' };
    let rotated = '';
    for (let i = num.length - 1; i >= 0; i--) {
        const char = num[i];
        if (!(char in rotatedMap)) {
            return false;
        }
        rotated += rotatedMap[char];
    }
    return rotated === num;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ where $N$ is the length of `num`.
  * **Space Complexity**: $O(N)$ to store the rotated string.

#### Approach 2: Optimized (Two Pointers - Space O(1))
* **Intuition**: Keep `left = 0` and `right = len(num) - 1`. Compare `num[left]` and `num[right]`. They must be a valid strobogrammatic pair (e.g., `(0, 0)`, `(1, 1)`, `(8, 8)`, `(6, 9)`, or `(9, 6)`). If they match our map's rotated value, move `left` forward and `right` backward. If any pair is invalid or doesn't match, return `false`.
* **Python Implementation**:
```python
def isStrobogrammatic(num: str) -> bool:
    rotated_map = {'0': '0', '1': '1', '6': '9', '8': '8', '9': '6'}
    left, right = 0, len(num) - 1
    
    while left <= right:
        l_char = num[left]
        r_char = num[right]
        if l_char not in rotated_map or rotated_map[l_char] != r_char:
            return False
        left += 1
        right -= 1
    return True
```
* **JavaScript Implementation**:
```javascript
function isStrobogrammatic(num) {
    const rotatedMap = { '0': '0', '1': '1', '6': '9', '8': '8', '9': '6' };
    let left = 0, right = num.length - 1;
    
    while (left <= right) {
        const lChar = num[left];
        const rChar = num[right];
        if (!(lChar in rotatedMap) || rotatedMap[lChar] !== rChar) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ since we check each character pair at most once.
  * **Space Complexity**: $O(1)$ auxiliary space.

#### Dry Run / Example Trace
* **Input**: `num = "69"`
* **Trace**:
  1. Initialize `left = 0` (`'6'`), `right = 1` (`'9'`).
  2. Map look up: `rotated_map['6']` is `'9'`.
  3. Compare rotated value `'9'` with `num[right]` (`'9'`). They match!
  4. Move pointers: `left = 1`, `right = 0`.
  5. `left <= right` (1 <= 0) is **False**. Loop terminates.
* **Final Output**: `True`

---

### 2. Lowest Common Ancestor of a Binary Tree III (LeetCode 1650)
* **Pattern**: Two Pointers (Linked List Intersection Style)
* **Difficulty**: Medium

#### Problem Description
Given two nodes of a binary tree, `p` and `q`, return their lowest common ancestor (LCA). Each node has a reference to its parent.

#### Approach 1: Hash Set (Path Storing)
* **Intuition**: Keep tracing parent pointers from node `p` up to the root, adding each node to a hash set. Then, trace parents from node `q` up to the root. The first node from `q`'s path that is already in the set is the LCA.
* **Python Implementation**:
```python
def lowestCommonAncestor(p: 'Node', q: 'Node') -> 'Node':
    visited = set()
    curr = p
    while curr:
        visited.add(curr)
        curr = curr.parent
        
    curr = q
    while curr:
        if curr in visited:
            return curr
        curr = curr.parent
    return None
```
* **JavaScript Implementation**:
```javascript
function lowestCommonAncestor(p, q) {
    const visited = new Set();
    let curr = p;
    while (curr !== null) {
        visited.add(curr);
        curr = curr.parent;
    }
    
    curr = q;
    while (curr !== null) {
        if (visited.has(curr)) {
            return curr;
        }
        curr = curr.parent;
    }
    return null;
}
```
* **Complexity**:
  * **Time Complexity**: $O(H)$ where $H$ is the height of the tree.
  * **Space Complexity**: $O(H)$ to store the nodes of the path.

#### Approach 2: Optimized (Two Pointers - Intersection of Two Linked Lists - Space O(1))
* **Intuition**: Since each node has parent pointers, the path from `p` to the root and from `q` to the root acts like two singly linked lists that merge at some point (specifically, they merge at the LCA and continue together up to the root). We can find the intersection node by running two pointers: `a` starting at `p`, and `b` starting at `q`.
  - When pointer `a` reaches the root (becomes `null`), redirect it to start at `q`.
  - When pointer `b` reaches the root (becomes `null`), redirect it to start at `p`.
  - If they meet (`a == b`), they meet at the intersection point, which is the Lowest Common Ancestor.
* **Python Implementation**:
```python
def lowestCommonAncestor(p: 'Node', q: 'Node') -> 'Node':
    a, b = p, q
    while a != b:
        a = a.parent if a else q
        b = b.parent if b else p
    return a
```
* **JavaScript Implementation**:
```javascript
function lowestCommonAncestor(p, q) {
    let a = p;
    let b = q;
    while (a !== b) {
        a = (a !== null) ? a.parent : q;
        b = (b !== null) ? b.parent : p;
    }
    return a;
}
```
* **Complexity**:
  * **Time Complexity**: $O(H)$ because each pointer travels at most the sum of the distances from `p` and `q` to the root.
  * **Space Complexity**: $O(1)$ auxiliary space.

#### Dry Run / Example Trace
* **Input**: A tree where `p` path to root is `p -> parent1 -> LCA -> root` (length 4) and `q` path to root is `q -> LCA -> root` (length 3).
* **Trace**:
  1. `a` starts at `p`, `b` starts at `q`.
  2. `a = parent1`, `b = LCA`.
  3. `a = LCA`, `b = root`.
  4. `a = root`, `b = null` (re-directed to `p`).
  5. `a = null` (re-directed to `q`), `b = parent1`.
  6. `a = LCA`, `b = LCA`.
  7. Loop ends because `a == b`. LCA node is found!

---

### 3. 2486. Append Characters to String to Make Subsequence
* **Pattern**: Two Pointers (Dual Array Traversals / Same-direction greedy matching)
* **Difficulty**: Medium

#### Problem Description
You are given two strings `s` and `t` consisting of lowercase English letters. Find the minimum number of characters that need to be appended to the end of `s` so that `t` becomes a subsequence of `s`.

#### Approach: Optimized (Two Pointers - Greedy Matching)
* **Intuition**: Keep pointer `i` for `s` and pointer `j` for `t`. Traverse `s` with pointer `i`. Whenever `s[i] == t[j]`, we have found a matching character of `t`, so we increment `j`. Since we want `t` to be a subsequence, we must match its characters in order. Once `i` reaches the end of `s`, the value of `j` represents how many characters of `t` have already been successfully matched as a subsequence. The remaining characters `len(t) - j` must be appended.
* **Python Implementation**:
```python
def appendCharacters(s: str, t: str) -> int:
    i, j = 0, 0
    len_s, len_t = len(s), len(t)
    
    while i < len_s and j < len_t:
        if s[i] == t[j]:
            j += 1
        i += 1
        
    return len_t - j
```
* **JavaScript Implementation**:
```javascript
function appendCharacters(s, t) {
    let i = 0, j = 0;
    const lenS = s.length, lenT = t.length;
    
    while (i < lenS && j < lenT) {
        if (s[i] === t[j]) {
            j++;
        }
        i++;
    }
    
    return lenT - j;
}
```
* **Complexity**:
  * **Time Complexity**: $O(N)$ where $N$ is the length of string `s`. We scan `s` at most once.
  * **Space Complexity**: $O(1)$ auxiliary space.

#### Dry Run / Example Trace
* **Input**: `s = "coaching"`, `t = "coding"`
* **Trace**:
  `lenS = 8`, `lenT = 6`. Initialize `i = 0`, `j = 0`.
  1. `s[0] = 'c'`, `t[0] = 'c'`. Match! Increment `j` to 1, `i` to 1.
  2. `s[1] = 'o'`, `t[1] = 'o'`. Match! Increment `j` to 2, `i` to 2.
  3. `s[2] = 'a'`, `t[2] = 'd'`. No match. Increment `i` to 3.
  4. `s[3] = 'c'`, `t[2] = 'd'`. No match. Increment `i` to 4.
  5. `s[4] = 'h'`, `t[2] = 'd'`. No match. Increment `i` to 5.
  6. `s[5] = 'i'`, `t[2] = 'd'`. No match. Increment `i` to 6.
  7. `s[6] = 'n'`, `t[2] = 'd'`. No match. Increment `i` to 7.
  8. `s[7] = 'g'`, `t[2] = 'd'`. No match. Increment `i` to 8.
  9. Loop terminates because `i < lenS` is **False**.
  10. Remaining characters of `t` to append: `lenT - j` = `6 - 2 = 4` (characters `"ding"`).
* **Final Output**: `4`


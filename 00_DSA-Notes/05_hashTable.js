/****************************************************************************************
 * HASH TABLE — COMPLETE NOTES (BEGINNER → ADVANCED)
 * Entire explanation is inside this JavaScript code block using comments only.
 ****************************************************************************************/


/* ======================================================================================
   1. WHAT IS A HASH TABLE?
   ======================================================================================
   - A **Hash Table** (or Hash Map / Dictionary) stores key–value pairs.
   - Uses a **hash function** to convert a key → index in an array (bucket).
   - Fast lookup, insertion, deletion on average.

   TIME COMPLEXITY:
   ----------------
   • Insert:  O(1) average
   • Search:  O(1) average
   • Delete:  O(1) average
   • Worst case (all collisions): O(n)

   WHY USE HASH TABLES?
   --------------------
   ✔ Very fast operations  
   ✔ Used everywhere (caches, databases, sets, maps)  
   ✔ Handles large datasets efficiently

   CONS:
   -----
   ✘ Collisions may cause slowdown  
   ✘ Needs good hash function  
   ✘ Not ordered (unless using special variants: ordered map)

****************************************************************************************/


/* ======================================================================================
   2. HOW HASH TABLE WORKS
   ======================================================================================
   KEY -> HASH FUNCTION -> INDEX -> BUCKET -> STORE VALUE

   Example:
   "John" --> hashed to --> index 5 --> stored in bucket 5.

   HASH FUNCTION REQUIREMENTS:
   ---------------------------
   • Fast
   • Deterministic
   • Uniform distribution
   • Minimal collisions

****************************************************************************************/


/* ======================================================================================
   3. COLLISION HANDLING METHODS
   ======================================================================================

   Collisions occur when two keys map to the same index.
   Example: hash("cat") = 4 and hash("bat") = 4.

   TWO COMMON TECHNIQUES:
   -----------------------

   A. **Chaining (Separate Chaining)**
      - Each bucket stores a linked list (or array) of key-value pairs.
      - Easy to implement, widely used.

   B. **Open Addressing**
      - If a bucket is full, probe to next empty slot.
      - Techniques:
        1. Linear probing
        2. Quadratic probing
        3. Double hashing

****************************************************************************************/


/* ======================================================================================
   4. SIMPLE HASH FUNCTION IN JAVASCRIPT
   ====================================================================================== */

function simpleHash(key, size) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i) * 23) % size; // 23 is a random prime multiplier
  }
  return hash;
}


/* ======================================================================================
   5. HASH TABLE USING SEPARATE CHAINING (BEST APPROACH)
   ====================================================================================== */

class HashTable {
  constructor(size = 10) {
    this.table = new Array(size); // array of buckets
    this.size = size;
  }

  // HASH function wrapper
  hash(key) {
    return simpleHash(key, this.size);
  }

  // INSERT or UPDATE key-value pair
  set(key, value) {
    const index = this.hash(key);

    // If bucket empty → create array
    if (!this.table[index]) {
      this.table[index] = [];
    }

    // Check if key already exists → update
    for (let pair of this.table[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    // Otherwise push new pair
    this.table[index].push([key, value]);
  }

  // RETRIEVE value by key
  get(key) {
    const index = this.hash(key);
    if (!this.table[index]) return null;

    for (let pair of this.table[index]) {
      if (pair[0] === key) return pair[1];
    }
    return null;
  }

  // DELETE key-value pair
  delete(key) {
    const index = this.hash(key);
    if (!this.table[index]) return false;

    const bucket = this.table[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  // PRINT TABLE
  print() {
    for (let i = 0; i < this.size; i++) {
      console.log(i, this.table[i]);
    }
  }
}


/* ======================================================================================
   6. HASH TABLE USING LINEAR PROBING (OPEN ADDRESSING)
   ======================================================================================
   - When collision happens → check next empty slot.
   - Example probing:
       index = 5 full → check 6 → check 7 → ...
****************************************************************************************/

class HashTableLinearProbing {
  constructor(size = 10) {
    this.table = new Array(size).fill(null);
    this.size = size;
  }

  hash(key) {
    return simpleHash(key, this.size);
  }

  set(key, value) {
    let index = this.hash(key);

    // Linear probing for next empty slot
    while (this.table[index] !== null && this.table[index][0] !== key) {
      index = (index + 1) % this.size;
    }

    this.table[index] = [key, value];
  }

  get(key) {
    let index = this.hash(key);

    while (this.table[index] !== null) {
      if (this.table[index][0] === key) return this.table[index][1];
      index = (index + 1) % this.size;
    }
    return null;
  }

  delete(key) {
    let index = this.hash(key);

    while (this.table[index] !== null) {
      if (this.table[index][0] === key) {
        this.table[index] = null;
        return true;
      }
      index = (index + 1) % this.size;
    }

    return false;
  }
}


/* ======================================================================================
   7. LOAD FACTOR & RESIZING
   ======================================================================================
   LOAD FACTOR = number_of_elements / table_size

   If load factor becomes too high (usually > 0.7):
   → Rehashing is required:
       - Create bigger table (usually 2×).
       - Reinsert all elements.
   WHY?
   ----
   To reduce collisions and keep O(1) performance.
****************************************************************************************/


/* ======================================================================================
   8. REAL-WORLD USE CASES OF HASH TABLES
   ======================================================================================
   ✔ Caches / LRU Cache  
   ✔ Storing key-value data  
   ✔ Databases indexing  
   ✔ Implementing Set and Map  
   ✔ Counting frequency of elements  
   ✔ Checking duplicates  
   ✔ Fast lookups (e.g., usernames, emails)  
****************************************************************************************/


/* ======================================================================================
   9. HASH TABLE BASED INTERVIEW PROBLEMS & SOLUTIONS
   ====================================================================================== */


/* --------------------------------------------------------------------------------------
   9.1 TWO SUM — O(n)
   --------------------------------------------------------------------------------------
   Use hashmap to store complements.
-----------------------------------------------------------------------------------------*/

function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];
    if (map.has(needed)) return [map.get(needed), i];
    map.set(nums[i], i);
  }
}


/* --------------------------------------------------------------------------------------
   9.2 FIRST UNIQUE CHARACTER IN STRING — O(n)
-----------------------------------------------------------------------------------------*/

function firstUniqueChar(s) {
  const map = {};

  for (let ch of s) map[ch] = (map[ch] || 0) + 1;

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] === 1) return i;
  }

  return -1;
}


/* --------------------------------------------------------------------------------------
   9.3 GROUP ANAGRAMS — O(n * k log k)
-----------------------------------------------------------------------------------------*/

function groupAnagrams(words) {
  const map = new Map();

  for (let word of words) {
    const sorted = word.split('').sort().join('');

    if (!map.has(sorted)) map.set(sorted, []);
    map.get(sorted).push(word);
  }

  return [...map.values()];
}


/* --------------------------------------------------------------------------------------
   9.4 LONGEST CONSECUTIVE SEQUENCE — O(n)
-----------------------------------------------------------------------------------------*/

function longestConsecutive(nums) {
  const set = new Set(nums);
  let longest = 0;

  for (let num of nums) {
    if (!set.has(num - 1)) {
      let current = num;
      let count = 1;

      while (set.has(current + 1)) {
        current++;
        count++;
      }

      longest = Math.max(longest, count);
    }
  }

  return longest;
}


/* ======================================================================================
   10. HASH TABLE VS OTHER STRUCTURES
   ======================================================================================

   STRUCTURE     | AVG SEARCH | ORDERED? | USE CASE
   --------------|------------|----------|-------------------------
   Hash Table    | O(1)       | No       | Fast lookups
   Array         | O(n)       | Yes      | Index-based operations
   BST           | O(log n)   | Yes      | Sorted data
   Linked List   | O(n)       | No       | Frequent insertions/deletions

****************************************************************************************/


/****************************************************************************************
 * END OF HASH TABLE NOTES
 * Ask for the next DSA topic: Graphs, Recursion, Two Pointers, DP, Sorting, etc.
 ****************************************************************************************/

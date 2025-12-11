/*

1. What is Recursion?
    - A function that calls itself to solve smaller instances of the same problem.
    - Example: Printing numbers from n down to 1.
      - psedocode:
        function printNumbers(n):
            if n <= 0:
                return
            print(n)
            printNumbers(n - 1)

2. When to use Recursion?
    - Problems that can be broken down into smaller, similar subproblems.
    - Examples: Factorial calculation, Fibonacci sequence, tree traversals, combinatorial problems.
    - psedocode for Factorial:
        function factorial(n):
            if n == 0:
                return 1
            return n * factorial(n - 1)

3. Recursive Leap of Faith
    - it has 5 steps:
        1. Understand the Problem: Clearly define what the problem is asking. - print  3 2 1 1 2 3
        2. Identify the subproblem: Find a smaller instance of the same problem. - print 2 1 1 2
        3. Trust/Faith: if the recursive call works for the smaller instance (n-1), assume it works for the current instance (n).
        4. Link 1 and 2: Use the solution of the subproblem to solve the current problem. - print 3 __subproblem__ 3
        5. Base Case(s): Define the simplest instance of the problem that can be solved directly. - if n == 0 return


4. Recursion Visualization:
    - A good way to understand recursion is to visualize two things:
        1) The recursion tree (how the problem branches into subproblems)
        2) The recursion call stack (how function calls are pushed/popped at runtime)

        Example A — Recursion Tree (Fibonacci)
        -------------------------------------
        Consider fib(n) defined as:
            fib(n) = fib(n-1) + fib(n-2)  (base cases: fib(0)=0, fib(1)=1)

        Call: fib(4)

        Tree visualization (each node is a call):

                                        fib(4)
                                    /           \
                                fib(3)          fib(2)
                                /     \        /     \
                            fib(2)  fib(1)  fib(1)  fib(0)
                            /   \
                        fib(1) fib(0)

        Expand with values (base returns in brackets):

                              fib(4)
                             /      \
                        fib(3)          fib(2)
                        /     \        /     \
                fib(2)  fib(1)=1 fib(1)=1 fib(0)=0
                /   \
        fib(1)=1 fib(0)=0

        Final calculation flow:
            fib(2) -> returns 1
            fib(3) -> fib(2) + fib(1) -> 1 + 1 = 2
            fib(4) -> fib(3) + fib(2) -> 2 + 1 = 3


        Example B — Call Stack (Factorial)
        ----------------------------------
        Factorial is a clean example to see stack frames because it is
        single-branch (not a tree):

            factorial(n): if n === 0 return 1; else return n * factorial(n-1)

        Call: factorial(4)

        Stack snapshots (top is the current frame):

        After calling factorial(4):
            [factorial(4)]

        Inside factorial(4) it calls factorial(3) → push
            [factorial(3)]  <- top (running)
            [factorial(4)]

        Then factorial(2) → push
            [factorial(2)]
            [factorial(3)]
            [factorial(4)]

        Then factorial(1) → push
            [factorial(1)]
            [factorial(2)]
            [factorial(3)]
            [factorial(4)]

        Then factorial(0) → push (base case) and return 1
            [factorial(0)]
            [factorial(1)]
            [factorial(2)]
            [factorial(3)]
            [factorial(4)]

        As factorial(0) returns, frames pop and each caller computes its result:
            - factorial(0) returns 1  → pop factorial(0)
            - factorial(1) computes 1 * 1 = 1 → pop factorial(1)
            - factorial(2) computes 2 * 1 = 2 → pop factorial(2)
            - factorial(3) computes 3 * 2 = 6 → pop factorial(3)
            - factorial(4) computes 4 * 6 = 24 → pop factorial(4)

        Quick comparison & tips
        -----------------------
            - Tree visualization: best for problems with branching recursion
                (combinatorics, naive Fibonacci, tree traversals).
            - Stack visualization: best for linear recursion (factorial,
                simple tail recursion) and to understand memory usage (stack depth).


5. Recursion vs Iteration
    - Recursion involves function calls and uses the call stack.
    - Iteration uses loops and maintains state with variables.
    - Some problems are more naturally solved with recursion (e.g., tree traversals), while others may be more efficient with iteration (e.g., simple counting).
    - Recursion can lead to higher memory usage due to call stack growth, whereas iteration typically uses constant memory. 
    

6. Ways to write base case:
    - Look for last valid input
        - e.g., for factorial(n)
            if (n === 0) return 1;
    - Look for first invalid input
        - e.g., for factorial(n)
            if (n < 0) return null;

7. Recurrence relation:
    - A mathematical way to express the relationship between a problem and its subproblems.
        - e.g., for factorial:
            T(n) = n * T(n-1) with base case T(0) = 1

8. How to solve recursion problems:
    - If you can draw the recursion tree, you can solve the problem.
    - Practice drawing recursion trees for different problems to understand their structure and behavior.

9. Recursion Approaches:
    - 0 to n: Start from base case (0) and build up to n.
    - n to 0: Start from n and break down to base case (0).

    Example:
    - 0 to n (Sum of first n numbers):
        function sum_0_to_N(curr,n):
            if curr == n:
                return n
            return curr + sum_0_to_N(curr+1, n)
        
        sum_0_to_N(0, n)

    - n to 0 (Sum of first n numbers):
        function sum_N_to_0(n):
            if n == 0:
                return 0
            return n + sum_N_to_0(n-1)

        sum_N_to_0(n)

    - Both approaches yield the same result, but the flow of execution differs.
    - practice both to understand their mechanics.

10. Complexity Analysis of Recursion:
    - Time Complexity: Analyze how many times the function is called.
        - (no of leaf node * work done per node) + (internal nodes * work done per internal node)
        - e.g., Factorial has O(n) time complexity.
    - Space Complexity: Analyze the maximum depth of the recursion stack.
        - e.g., Factorial has O(n) space complexity due to n recursive calls on the stack.


*/
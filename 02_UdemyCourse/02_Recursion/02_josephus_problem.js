/*

Josephus Problem:
    The Josephus problem is a theoretical problem related to a certain elimination game. People are standing in a circle, and every k-th person is eliminated until only one person remains. The task is to determine the position of the last remaining person.

    Rules:
        1. There are n people numbered from 1 to n standing in a circle.
        2. Starting from the first person, every k-th person is eliminated from the circle.
        3. The process continues until only one person remains.

    Example:
        Input: n = 7, k = 3
        Output: 4
        Explanation: The elimination order is 3, 6, 2, 7, 5, 1. The last remaining person is at position 4.

    To solve the Josephus problem using recursion, we can define a recursive function that calculates the position of the last remaining person based on the number of people and the step count.

    The recursive relation can be defined as follows:
        - Base Case: If there is only one person (n = 1), that person is the last remaining (position 0 in 0-based index).
        - Recursive Case: For n > 1, the position of the last remaining person can be calculated as:
            josephus(n, k) = (josephus(n - 1, k) + k) % n

    This relation works because when we eliminate a person, the circle shrinks, and we need to adjust the position accordingly. 


*/
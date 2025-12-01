/*

push: This method adds a new element to the top of the stack. It creates a new node with the given value and adjusts the pointers accordingly. If the stack is empty, both head and tail point to the new node. Otherwise, the new node is added at the end, and the tail pointer is updated. The length of the stack is incremented.
Time Complexity: O(1) - The push operation takes constant time as it involves updating a few pointers regardless of the stack size.

*/


class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor(value) {
        const newNode = new Node(value);
        this.top = newNode;
        this.length = 1;
    }

    printStack() {
        let temp = this.top;
        while (temp !== null) {
            console.log(temp.value);
            temp = temp.next;
        }
    }

    getTop() {
        if (this.top === null) {
            console.log("Top: null");
        } else {
            console.log("Top: " + this.top.value);
        }
    }

    getLength() {
        console.log("Length: " + this.length);
    }

    makeEmpty() {
        this.top = null;
        this.length = 0;
    }
 
	/// WRITE PUSH METHOD HERE ///
	push(value){
	    let newNode = new Node(value);
	    if(this.length === 0){
	        this.top = newNode
	    }else{
	        newNode.next = this.top;
	        this.top = newNode;
	    }
	    this.length++
	}
     
}
 


let myStack = new Stack(2);

console.log("Before push():");
console.log("--------------");
myStack.getTop();
myStack.getLength();

console.log("\nStack:");
myStack.printStack();

myStack.push(1);

console.log("\n\nAfter push():");
console.log("-------------");
myStack.getTop();
myStack.getLength();

console.log("\nStack:");
myStack.printStack();


/*
    EXPECTED OUTPUT:

    Before push():
    --------------
    Top: 2
    Length: 1

    Stack:
    2


    After push():
    -------------
    Top: 1
    Length: 2

    Stack:
    1
    2

*/
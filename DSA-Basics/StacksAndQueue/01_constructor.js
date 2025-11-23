/*

stacks constructor using linked list

*/


// WRITE NODE CLASS HERE //
class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Stack {
	// WRITE STACK CONSTRUCTOR HERE //
	constructor(value){
	    let newNode = new Node(value)
	    this.top = newNode;
	    this.bottom = newNode;
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

}
 

 
let myStack = new Stack(4);

myStack.getTop();
myStack.getLength();

console.log("\nStack:");
myStack.printStack();


/*
    EXPECTED OUTPUT:
    ----------------
    Top: 4
    Length: 1

    Stack:
    4

*/
 
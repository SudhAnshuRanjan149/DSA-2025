/*

Queue: A queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are added to the back (tail) and removed from the front (head).


*/

// WRITE NODE CLASS HERE //
class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Queue {
	// WRITE QUEUE CONSTRUCTOR HERE //
	constructor(value){
	    let newNode = new Node(value);
	    this.first = newNode;
	    this.last = newNode;
	    this.length = 1;
	}

    printQueue() {
        let temp = this.first;
        while (temp !== null) {
            console.log(temp.value);
            temp = temp.next;
        }
    }

    getFirst() {
        if (this.first === null) {
            console.log("First: null");
        } else {
            console.log("First: " + this.first.value);
        }
    }

    getLast() {
        if (this.last === null) {
            console.log("Last: null");
        } else {
            console.log("Last: " + this.last.value);
        }
    }

    getLength() {
        console.log("Length: " + this.length);
    }

    makeEmpty() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

}
 
 

let myQueue = new Queue(4);

myQueue.getFirst();
myQueue.getLast();
myQueue.getLength();

console.log("\nQueue:");
myQueue.printQueue();


/*
    EXPECTED OUTPUT:
    ----------------
    First: 4
    Last: 4
    Length: 1
    
    Queue:
    4

*/  
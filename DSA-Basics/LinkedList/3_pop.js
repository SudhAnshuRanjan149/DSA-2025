/*

Pop - Removes the last node from the linked list

time complexity: O(n)

*/



class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList{
    constructor(value){
        const newNode = new Node(value);
        this.head = newNode;
        this.tail = this.head;
        this.length = 1;    
    }

    getHead(){
        if(this.head === null){
            console.log("Head: null");
        } else {
            console.log("Head: " + this.head.value);
        }
    }

    getTail(){
        if(this.tail === null){
            console.log("Tail: null");
        } else {
            console.log("Tail: " + this.tail.value);
        }
    }

    getLength(){
        console.log("Length: " + this.length);
    }

    makeEmpty(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    printList(){
        let temp = this.head;
        while(temp !== null){
            console.log(temp.value);
            temp = temp.next;
        }
    }

    push(value){
        const newNode = new Node(value);
        if(this.length === 0){
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    pop(){
        if(this.length === 0) return undefined;
        let temp = this.head;
        let pre = this.head;
        while(temp.next){
            pre = temp;
            temp = temp.next
        }
        this.tail = pre;
        this.tail.next = null;
        this.length--;
        if(this.length === 0){
            this.head = null;
            this.tail = null;
        }
        return temp;
    }

}


let myLinkedList = new LinkedList(1);
myLinkedList.push(2);


console.log("Before pop:");
myLinkedList.printList();

let poppedNode = myLinkedList.pop();
console.log("Popped node value: " + poppedNode.value);

console.log("After pop:");
myLinkedList.printList();
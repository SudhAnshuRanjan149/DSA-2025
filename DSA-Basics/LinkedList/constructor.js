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

    printList(){
        let temp = this.head;
        while(temp !== null){
            console.log(temp.value);
            temp = temp.next;
        }
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
}


let myLinkedList = new LinkedList(4);
myLinkedList.getHead();
myLinkedList.getTail();
myLinkedList.getLength();
myLinkedList.printList();
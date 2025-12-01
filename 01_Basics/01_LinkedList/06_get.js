/*

Get - Retrieves a node by its position in the linked list
time complexity: O(n)

*/


class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;    
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
        if(this.head === null){
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    pop(){
        if(this.length === 0) return null;
        let temp = this.head;
        let pre = this.head;
        while(temp.next){
            pre = temp;
            temp = temp.next;
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

    unshift(value){
        const newNode = new Node(value);
        if(this.length === 0){
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
    }

    shift(){
        if(this.length === 0) return null;
        let temp = this.head;
        this.head = this.head.next;
        temp.next = null;
        this.length--;
        if(this.length === 0){
            this.tail = null;
        }
        return temp;
    }

    get(index){
        if(index < 0 || index >= this.length) return null;
        let temp = this.head;
        for(let i = 0; i < index; i++){
            temp = temp.next;
        }
        return temp;    
    }

}



let myLinkedList = new LinkedList();

myLinkedList.push(1);
myLinkedList.push(2);
myLinkedList.push(3);
myLinkedList.push(4);

console.log("Get node at index 2:");

let node = myLinkedList.get(2);

if(node) {
    console.log("Node found: " + node.value);
} else {
    console.log("Node not found");
}

console.log("Full list:");

myLinkedList.printList();


/*

Set - Updates the value of a node at a specific position in the linked list
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

    set(index, value){
        let temp = this.get(index);
        if(temp){
            temp.value = value;
            return true;
        }
        return false;
    }
}

// Example usage:
const myLinkedList = new LinkedList();
myLinkedList.push(10);
myLinkedList.push(20);
myLinkedList.push(30);
console.log("Before set:");
myLinkedList.printList();

myLinkedList.set(1, 25); // Update index 1 to value 25
console.log("After set:");
myLinkedList.printList();

myLinkedList.set(5, 50); // Attempt to update invalid index
console.log("After attempting to set invalid index:");
myLinkedList.printList();

/*

Reverse - Reverses the order of the nodes in the linked list
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

    insert(index, value){
        if(index < 0 || index > this.length) return false;
        if(index === 0){
            this.unshift(value);
            return true;
        }
        if(index === this.length){
            this.push(value);
            return true;
        }
        const newNode = new Node(value);
        const prev = this.get(index - 1);
        newNode.next = prev.next;
        prev.next = newNode;
        this.length++;
        return true;
    }

    remove(index){
        if(index < 0 || index >= this.length) return null;
        if(index === 0) return this.shift();
        if(index === this.length - 1) return this.pop();
        const prev = this.get(index - 1);
        const temp = prev.next;
        prev.next = temp.next;
        temp.next = null;
        this.length--;
        return temp;
    }


    reverse(){
	    let temp = this.head;
	    this.head = this.tail;
	    this.tail = temp;
	    
	    let prev = null
	    let next = null
	    
	    for(let i = 0; i < this.length; i++){
	        next = temp.next;
	        temp.next = prev;
	        prev = temp;
	        temp = next;
	    }
	    return this;
	}
}


let myLinkedList = new LinkedList();
myLinkedList.push(1);
myLinkedList.push(2);
myLinkedList.push(3);
myLinkedList.push(4);
myLinkedList.push(5);

console.log("Original List:");
myLinkedList.printList();

myLinkedList.reverse();

console.log("Reversed List:");
myLinkedList.printList();


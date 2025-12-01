/*

Binary Search Tree (BST): A binary tree where each node has at most two children. For each node, the left child's value is less than the parent's value, and the right child's value is greater than the parent's value.

*/

// WRITE NODE CLASS HERE //
class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
 
class BST {
	// WRITE BST CONSTRUCTOR HERE //
	constructor(value){
	    this.root = null;
	}
}

 

let myBST = new BST();   

if (myBST.root === null) {
    console.log("Root: null");
} else {
    console.log("Root:", myBST.root.value);
}


/*
    EXPECTED OUTPUT:
    ----------------
    Root: null

*/
/*

Insert: Inserts a new value into the Binary Search Tree (BST). The method starts at the root and traverses the tree to find the correct position for the new value, maintaining the BST property. If the tree is empty, the new node becomes the root. Otherwise, it is placed as a left or right child based on comparisons with existing node values. The method returns the updated tree.

Time Complexity: O(log n) on average - The insert operation takes logarithmic time in a balanced BST, as it involves traversing the height of the tree. In the worst case (unbalanced tree), it can take O(n) time.

*/

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
 
class BST {
    constructor() {
        this.root = null;
    }


	/// WRITE INSERT METHOD HERE ///
	insert(value){
	    let newNode = new Node(value);
	    
	    if(this.root == null){
	        this.root = newNode;
	        return this;
	    }
	    
	    let temp = this.root;
	    while(true){
    	    if(temp.value === value) return undefined;
    	    
    	    if(value < temp.value){
    	        if(temp.left == null){
    	            temp.left = newNode;
    	            return this;
    	        }
    	        temp = temp.left;
    	    }
    	    else{
    	        if(temp.right == null){
    	            temp.right = newNode;
    	            return this;
    	        }
    	        temp = temp.right;
    	    }
	    }
	}

}



let myBST = new BST();

myBST.insert(2);
myBST.insert(1);
myBST.insert(3);


/*
    THE LINES ABOVE CREATE THIS TREE:
                 2
                / \
               1   3
*/


console.log("Root:", myBST.root.value);
console.log("\nRoot->Left:", myBST.root.left.value);
console.log("\nRoot->Right:", myBST.root.right.value);


/*
    EXPECTED OUTPUT:
    ----------------
    Root: 2

    Root->Left: 1

    Root->Right: 3

*/
      

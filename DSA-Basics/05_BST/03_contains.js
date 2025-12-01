/*

Contains: Checks if a value exists in the BST. The method starts at the root and traverses the tree, comparing the target value with the current node's value. If a match is found, it returns true. If the target is less than the current node's value, the search continues in the left subtree; if greater, in the right subtree. If a null reference is reached, the value is not in the tree, and the method returns false.

Time Complexity: O(log n) on average - The search operation takes logarithmic time in a balanced BST, as it involves traversing the height of the tree. In the worst case (unbalanced tree), it can take O(n) time.

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

    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        let temp = this.root;
        while (true) {
            if (newNode.value === temp.value) return undefined;
            if (newNode.value < temp.value) {
                if (temp.left === null) {
                    temp.left = newNode;
                    return this;
                }
                temp = temp.left;
            } else {
                if (temp.right === null) {
                    temp.right = newNode;
                    return this;
                } 
                temp = temp.right;
            }
        }
    }

	/// WRITE CONTAINS METHOD HERE ///
	contains(value){
	    let temp = this.root;
	    if(temp == null) return false;
	    
	    while(true){
	        if(temp == null){
	            return false;
	        }else if(temp.value == value){
	            return true;
	        }
	        else if(value < temp.value){
	            temp = temp.left;
	        }else if(value > temp.value){
	            temp = temp.right; 
	        }
	    }
	    
	    return false;
	}
      
}



let myBST = new BST();

myBST.insert(47);
myBST.insert(21);
myBST.insert(76);
myBST.insert(18);
myBST.insert(27);
myBST.insert(52);
myBST.insert(82);


console.log("BST Contains 27:");
console.log(myBST.contains(27));

console.log("\nBST Contains 17:");
console.log(myBST.contains(17));


/*
    EXPECTED OUTPUT:
    ----------------
    BST Contains 27:
    true
    
    BST Contains 17:
    false

*/
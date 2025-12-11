/*

Hash Table: A hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.

Hash Table Constructor

*/


class HashTable {
	// CREATE HASHTABLE CONSTRUCTOR HERE//
	constructor(value = 7){
	    this.dataMap = new Array(value)
	}
   
    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
        }
        return hash;
    }

    printTable() {
        for (let i = 0; i < this.dataMap.length; i++) {
            console.log(i, ": ", this.dataMap[i]);
        }
    }

}



let myHashTable = new HashTable();
myHashTable.printTable();  

    
    /*
        EXPECTED OUTPUT:
        ----------------
        0 :  undefined
        1 :  undefined
        2 :  undefined
        3 :  undefined
        4 :  undefined
        5 :  undefined
        6 :  undefined

    */
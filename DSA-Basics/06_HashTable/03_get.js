/*

Hash Table Get Method: The get method is used to retrieve the value associated with a given key in the hash table. It first computes the hash index for the key using the hash function. If the index is occupied, it searches through the array at that index to find the key and return its associated value. If the key is not found, it returns undefined.

*/


class HashTable {
    constructor(size = 7) {
        this.dataMap = new Array(size);
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

    set(key,value) {
        let index = this._hash(key);
        if(!this.dataMap[index]) this.dataMap[index] = [];
        
        this.dataMap[index].push([key, value]);
        return this;
    }

	///  WRITE GET METHOD HERE  ///
	get(key){
	    let index = this._hash(key);
	    if(this.dataMap[index]){
	        for(let i = 0; i < this.dataMap[index].length; i++){
	            if(this.dataMap[index][i][0] == key){
	                return this.dataMap[index][i][1];
	            }
	        }
	    }
	}

}



let myHashTable = new HashTable();

myHashTable.set("nails", 100);
myHashTable.set("tile", 50);
myHashTable.set("lumber", 80);

console.log("Lumber:");
console.log( myHashTable.get("lumber") );

console.log("\nBolts:");
console.log( myHashTable.get("bolts") );


/*
    EXPECTED OUTPUT:
    ----------------
    Lumber:
    80

    Bolts:
    undefined

*/
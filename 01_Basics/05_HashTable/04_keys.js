/*

Hash Table Keys Method: The keys method is used to retrieve all the keys stored in the hash table. It iterates through the dataMap array and collects the keys from each occupied index (i.e., each array of key-value pairs). The collected keys are returned as an array.

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

    get(key) {
        let index = this._hash(key);
        if(this.dataMap[index]) {
            for(let i = 0; i < this.dataMap[index].length; i++) {
                if(this.dataMap[index][i][0] === key) {
                    return this.dataMap[index][i][1];
                }
            }
        }
        return undefined;
    }

	///  WRITE KEYS METHOD HERE  ///
	keys(){
	    let keys = []
	    for(let i = 0; i < this.dataMap.length; i++){
	        if(this.dataMap[i]){
	            for(let j = 0; j < this.dataMap[i].length; j++){
	                keys.push(this.dataMap[i][j][0])
	            }
	        }
	    }
	    return keys;
	}

}



let myHashTable = new HashTable();

myHashTable.set("paint", 20);
myHashTable.set("bolts", 40);
myHashTable.set("nails", 100);
myHashTable.set("tile", 50);
myHashTable.set("lumber", 80);

console.log( myHashTable.keys() );


/*
    EXPECTED OUTPUT:
    ----------------
    [ 'paint', 'bolts', 'nails', 'tile', 'lumber' ]

*/   
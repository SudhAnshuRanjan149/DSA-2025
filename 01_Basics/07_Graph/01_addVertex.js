/*

Graphs - Add a vertex to the graph
time complexity: O(1)

*/


class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    printGraph() {
        if (Object.keys(this.adjacencyList).length !== 0) {
            console.log("{");
            for (const [key, value] of Object.entries(this.adjacencyList)) {
                console.log(" ", `${key}: ${value}`);
            }
            console.log("}");
        } else {
            console.log("{}");
        }
    }

	/// WRITE ADDVERTEX METHOD HERE ///
	addVertex(vertex){
	    if(!this.adjacencyList[vertex]){
	        this.adjacencyList[vertex] = []
	        return true;
	    }
	    return false;
	}

}



let myGraph = new Graph();
myGraph.addVertex("A");
myGraph.addVertex("B");
myGraph.printGraph();


/*
    EXPECTED OUTPUT:
    ----------------
    {
      A: [],
      B: []
    }

*/  


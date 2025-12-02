/*

Graphs - Remove a vertex from the graph
time complexity: O(V + E)

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

    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
            return true;
        }
        return false;
    }

    addEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
            this.adjacencyList[vertex1].push(vertex2);
            this.adjacencyList[vertex2].push(vertex1);
            return true;
        }
        return false;
    }

    removeEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
            this.adjacencyList[vertex1] = this.adjacencyList[vertex1]
                .filter(v => v !== vertex2);
            this.adjacencyList[vertex2] = this.adjacencyList[vertex2]
                .filter(v => v !== vertex1);
            return true;
        }
        return false;
    }

	/// WRITE REMOVEVERTEX METHOD HERE ///
	removeVertex(vertex){
	    if(this.adjacencyList[vertex]){
	        for(let i = 0; i < this.adjacencyList[vertex].length; i++){
	            let vertexName = this.adjacencyList[vertex][i];
	            this.adjacencyList[vertexName] = this.adjacencyList[vertexName].filter(v => v != vertex)
	        }
	        delete this.adjacencyList[vertex]
	    }
	}

}



// Test 1
console.log("// Test 1: Remove an existing vertex");
const g1 = new Graph();
g1.addVertex('A');
g1.addVertex('B');
g1.addEdge('A', 'B');
g1.removeVertex('A');
g1.printGraph();  // Expected: { B: [] }

// Test 2
console.log("\n// Test 2: Remove a vertex that does not exist");
const g2 = new Graph();
console.log(g2.removeVertex('C'));  // Expected: undefined
g2.printGraph();  // Expected: {}

// Test 3
console.log("\n// Test 3: Remove vertex that is self-connected");
const g3 = new Graph();
g3.addVertex('A');
g3.addEdge('A', 'A');
g3.removeVertex('A');
g3.printGraph();  // Expected: {}

// Test 4
console.log("\n// Test 4: Remove multiple vertices");
const g4 = new Graph();
g4.addVertex('A');
g4.addVertex('B');
g4.addVertex('C');
g4.addEdge('A', 'B');
g4.addEdge('B', 'C');
g4.removeVertex('A');
g4.removeVertex('C');
g4.printGraph();  // Expected: { B: [] }

// Test 5
console.log("\n// Test 5: Remove vertex that has multiple connections");
const g5 = new Graph();
g5.addVertex('A');
g5.addVertex('B');
g5.addVertex('C');
g5.addEdge('A', 'B');
g5.addEdge('A', 'C');
g5.removeVertex('A');
g5.printGraph();  // Expected: { B: [], C: [] }



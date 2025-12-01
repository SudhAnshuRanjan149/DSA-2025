/****************************************************************************************
 * GRAPH — COMPLETE NOTES (BEGINNER → ADVANCED)
 * Entire explanation is inside this JavaScript code block using comments only.
 ****************************************************************************************/


/*========================================================================================
 1. WHAT IS A GRAPH?
 ========================================================================================
 - A **Graph** is a non-linear data structure made up of:
      • Vertices/Nodes (V)
      • Edges (E)

 - Graphs represent relationships between objects:  
      Social networks, Maps, Internet, Chemical structures, Routing, etc.

 KEY TERMS:
 ----------
 • Vertex: A node  
 • Edge: Connection between two vertices  
 • Adjacent: Two nodes connected by an edge  
 • Degree: Number of edges connected to a node  
 • Path: Sequence of vertices connected by edges  
 • Cycle: A path that starts & ends at same node  
 • Connected graph: All nodes reachable  
 • Component: A group of connected nodes  

 BASIC RULE:
 -----------
 • Graph is represented as:  G = (V, E)

****************************************************************************************/


/*========================================================================================
 2. TYPES OF GRAPHS
 ========================================================================================

 (A) **Directed Graph (Digraph)**
     Edges have direction:  A → B

 (B) **Undirected Graph**
     Edges are bidirectional: A — B

 (C) **Weighted Graph**
     Edges have weights/costs:
     A —3— B

 (D) **Unweighted Graph**
     All edges have equal weight.

 (E) **Cyclic Graph**
     Contains cycles.

 (F) **Acyclic Graph**
     No cycles.  
     Special case → DAG (Directed Acyclic Graph)

 (G) **Tree**
     Special acyclic connected graph with N nodes and N–1 edges.

****************************************************************************************/


/*========================================================================================
 3. GRAPH REPRESENTATION
 ========================================================================================

 Two common approaches:

 1. **Adjacency List**  (Most used: efficient for sparse graphs)
    Example:
      0 → [1, 2]
      1 → [0, 3]
      2 → [0]
      3 → [1]

 2. **Adjacency Matrix**
    - 2D array of size N×N
    - matrix[u][v] = 1 or weight

 Best choice?
 ------------
 • Sparse graph → adjacency list  
 • Dense graph → adjacency matrix  

****************************************************************************************/


/*========================================================================================
 4. GRAPH IMPLEMENTATION USING ADJACENCY LIST (JavaScript)
 ========================================================================================*/

class Graph {
  constructor() {
    this.adj = {}; // adjacency list
  }

  addVertex(v) {
    if (!this.adj[v]) this.adj[v] = [];
  }

  addEdge(v1, v2) {
    this.addVertex(v1);
    this.addVertex(v2);

    this.adj[v1].push(v2);
    this.adj[v2].push(v1); // for undirected graph
  }

  print() {
    for (let v in this.adj) {
      console.log(v, "->", this.adj[v]);
    }
  }
}


/*========================================================================================
 5. GRAPH TRAVERSAL
 ========================================================================================

 Two major graph traversal algorithms:

 • DFS — Depth First Search
 • BFS — Breadth First Search

****************************************************************************************/


/*----------------------------------------------------------------------------------------
 5.1 DEPTH FIRST SEARCH (DFS) — Recursive
 ----------------------------------------------------------------------------------------*/

function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;

  console.log(node);
  visited.add(node);

  for (let neighbor of graph[node]) {
    dfs(graph, neighbor, visited);
  }
}


/*----------------------------------------------------------------------------------------
 5.2 DEPTH FIRST SEARCH (DFS) — Stack Iterative
 ----------------------------------------------------------------------------------------*/

function dfsIterative(graph, start) {
  const stack = [start];
  const visited = new Set();

  while (stack.length) {
    const node = stack.pop();

    if (!visited.has(node)) {
      console.log(node);
      visited.add(node);

      for (let neighbor of graph[node]) {
        stack.push(neighbor);
      }
    }
  }
}


/*----------------------------------------------------------------------------------------
 5.3 BREADTH FIRST SEARCH (BFS) — Queue
 ----------------------------------------------------------------------------------------*/

function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);

  while (queue.length) {
    const node = queue.shift();
    console.log(node);

    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}


/*========================================================================================
 6. DETECTING CYCLES IN GRAPHS
 ========================================================================================*/


/*----------------------------------------------------------------------------------------
 6.1 Detect cycle in Undirected Graph (DFS)
 ----------------------------------------------------------------------------------------*/

function hasCycleUndirected(graph) {
  const visited = new Set();

  function dfs(node, parent) {
    visited.add(node);

    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true; // cycle found
      }
    }

    return false;
  }

  for (let node in graph) {
    if (!visited.has(node)) {
      if (dfs(node, null)) return true;
    }
  }

  return false;
}


/*----------------------------------------------------------------------------------------
 6.2 Detect cycle in Directed Graph (DFS with recursion stack)
 ----------------------------------------------------------------------------------------*/

function hasCycleDirected(graph) {
  const visited = new Set();
  const recStack = new Set(); // nodes in current DFS path

  function dfs(node) {
    if (recStack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    recStack.add(node);

    for (let neighbor of graph[node]) {
      if (dfs(neighbor)) return true;
    }

    recStack.delete(node);
    return false;
  }

  for (let v in graph) {
    if (dfs(v)) return true;
  }

  return false;
}


/*========================================================================================
 7. SHORTEST PATH ALGORITHMS
 ========================================================================================*/

 
/*----------------------------------------------------------------------------------------
 7.1 BFS Shortest Path (Unweighted Graph)
 ----------------------------------------------------------------------------------------*/

function shortestPathUnweighted(graph, start, end) {
  const queue = [[start, 0]];
  const visited = new Set([start]);

  while (queue.length) {
    let [node, dist] = queue.shift();

    if (node === end) return dist;

    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }

  return -1;
}


/*----------------------------------------------------------------------------------------
 7.2 DIJKSTRA’S Algorithm (Weighted Graph, no negative weights)
 ----------------------------------------------------------------------------------------*/

class MinPriorityQueue {
  constructor() {
    this.data = [];
  }

  push(node, weight) {
    this.data.push({ node, weight });
    this.data.sort((a, b) => a.weight - b.weight);
  }

  pop() {
    return this.data.shift();
  }

  isEmpty() {
    return this.data.length === 0;
  }
}

function dijkstra(graph, start) {
  const dist = {};
  const pq = new MinPriorityQueue();

  for (let node in graph) dist[node] = Infinity;
  dist[start] = 0;

  pq.push(start, 0);

  while (!pq.isEmpty()) {
    let { node, weight } = pq.pop();

    for (let [neighbor, w] of graph[node]) {
      if (dist[node] + w < dist[neighbor]) {
        dist[neighbor] = dist[node] + w;
        pq.push(neighbor, dist[neighbor]);
      }
    }
  }

  return dist;
}


/*----------------------------------------------------------------------------------------
 7.3 BELLMAN-FORD Algorithm (Handles negative weights)
 ----------------------------------------------------------------------------------------*/

function bellmanFord(edges, V, start) {
  const dist = Array(V).fill(Infinity);
  dist[start] = 0;

  for (let i = 0; i < V - 1; i++) {
    for (let [u, v, w] of edges) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  return dist;
}


/*========================================================================================
 8. TOPOLOGICAL SORT (Directed Acyclic Graph)
 ========================================================================================
 - Ordering of vertices such that:
     for every directed edge u → v, u comes before v.
 
 Applications:
 -------------
 • Course scheduling  
 • Dependency resolution  
 • Build systems  
****************************************************************************************/

function topologicalSort(graph) {
  const visited = new Set();
  const stack = [];

  function dfs(node) {
    visited.add(node);

    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) dfs(neighbor);
    }

    stack.push(node);
  }

  for (let v in graph) {
    if (!visited.has(v)) dfs(v);
  }

  return stack.reverse();
}


/*========================================================================================
 9. ADVANCED GRAPH CONCEPTS
 ========================================================================================

 (A) Strongly Connected Components (SCCs)
     — Components where every vertex can reach every other vertex (Kosaraju's algo)

 (B) Articulation Points & Bridges
     — Nodes/edges whose removal disconnects graph

 (C) Spanning Trees
     — A tree connecting all nodes

 (D) Minimum Spanning Tree (MST)
     — Minimum cost tree connecting all nodes  
     Algorithms:
       • Kruskal’s  
       • Prim’s  

 (E) Bipartite Graphs
     — Nodes can be colored with 2 colors without conflict  
     Checked using BFS/DFS.

****************************************************************************************/


/*========================================================================================
 10. GRAPH APPLICATIONS (REAL WORLD)
 ========================================================================================

 ✔ Social networks (friends graph)  
 ✔ Google Maps (shortest path)  
 ✔ Internet routing  
 ✔ Airline networks  
 ✔ Recommendation engines  
 ✔ Task scheduling  
 ✔ Network connectivity  
 ✔ Image segmentation  

****************************************************************************************/


/****************************************************************************************
 * END OF GRAPH NOTES
 * Ask for the next DSA topic such as Dynamic Programming, Greedy, Sorting, Tries, Heap.
 ****************************************************************************************/

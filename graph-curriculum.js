// Graph coverage checked against RisingBrain's public pattern-wise sheet, 2026-10-16.
// Titles link to practice; explanations and simulations are original.
const graphSheetGroups = [
  ['DFS (Connectivity)', [
    ['Flood Fill','Flood Fill','griddfs'],
    ['Count Components in Graph','Number of Connected Components in an Undirected Graph','components'],
    ['Number of Islands','Number of Islands','griddfs'],
    ['All paths from source to target','All Paths From Source to Target','allpaths'],
    ['Surrounded Regions','Surrounded Regions','griddfs'],
    ['Pacific Atlantic Water Flow','Pacific Atlantic Water Flow','griddfs'],
    ['Is Graph Bipartite','Is Graph Bipartite','coloring'],
    ['Undirected Cycle Detection','Undirected Cycle Detection','undirectedcycle'],
    ['Directed Cycle Detection','Directed Cycle Detection','directedcycle'],
    ['Longest Cycle in a Graph','Longest Cycle in a Graph','directedcycle'],
    ['Articulation Points','Articulation Points','articulation'],
    ['Bridges in Graph / Critical Connections','Critical Connections in a Network','bridges']
  ]],
  ['BFS Pattern', [
    ['01 Matrix','01 Matrix','multibfs'],
    ['Shortest Path in Binary Matrix','Shortest Path in Binary Matrix','graphbfs'],
    ['Keys and Rooms','Keys and Rooms','graphdfs'],
    ['Rotting Oranges','Rotting Oranges','multibfs'],
    ['Word Ladder','Word Ladder','implicitbfs'],
    ['Snakes and Ladders','Snakes and Ladders','implicitbfs'],
    ['Shortest Path Visiting All Nodes','Shortest Path Visiting All Nodes','statebfs']
  ]],
  ['Topological Sort', [
    ['Course Schedule','Course Schedule','topo'],
    ['Course Schedule II','Course Schedule II','topo'],
    ['Find Eventual Safe States','Find Eventual Safe States','topo'],
    ['Find All Possible Recipes from Given Supplies','Find All Possible Recipes from Given Supplies','topo'],
    ['Alien Dictionary','Alien Dictionary','topo']
  ]],
  ['MST / Union-Find', [
    ['Minimum spanning Tree','Minimum Spanning Tree','mst'],
    ['Kruskal’s algorithm','Kruskal Algorithm Implementation','mst'],
    ['Redundant Connection','Redundant Connection','dsu'],
    ['Accounts Merge','Accounts Merge','dsu'],
    ['Most Stones Removed with Same Row or Column','Most Stones Removed with Same Row or Column','dsu'],
    ['Connecting Cities With Minimum Cost','Connecting Cities With Minimum Cost','mst'],
    ['Lexicographically Smallest Equivalent String','Lexicographically Smallest Equivalent String','dsu'],
    ['Number of Operations to Make Network Connected','Number of Operations to Make Network Connected','dsu']
  ]],
  ['Dijkstra (Weighted)', [
    ['Dijkstra Implementation','Dijkstra Implementation','dijkstra'],
    ['Network Delay Time','Network Delay Time','dijkstra'],
    ['Cheapest Flights Within K Stops','Cheapest Flights Within K Stops','bellman'],
    ['Path With Minimum Effort','Path With Minimum Effort','dijkstra'],
    ['Swim in Rising Water','Swim in Rising Water','dijkstra']
  ]],
  ['Bellman-Ford', [
    ['Negative Weight Cycle Detection','Negative Weight Cycle Detection','bellman'],
    ['Cheapest Flights Within K Stops (Bellman-Ford variant)','Cheapest Flights Within K Stops (Bellman-Ford variant)','bellman'],
    ['Find the City With the Smallest Number of Neighbors at a Threshold Distance','Find the City With the Smallest Number of Neighbors at a Threshold Distance','floyd']
  ]],
  ['Floyd-Warshall', [
    ['Transitive Closure','Transitive Closure','closure'],
    ['All-Pairs Shortest Path','All-Pairs Shortest Path','floyd'],
    ['Detect Negative Cycle Using Floyd-Warshall','Detect Negative Cycle Using Floyd-Warshall','floyd']
  ]]
];
const extraGraphGuides = {
  components:['Connected components · BFS / DFS','Count separate groups, including isolated vertices.','Scan all vertices; start a traversal only at an unvisited vertex and increment once per new start.','One new start, one new component.','One traversal from vertex 0 misses disconnected groups.'],
  implicitbfs:['Implicit-state BFS','Moves or transformations define neighbors without an explicit adjacency list.','Queue the current configuration; generate legal next configurations and mark on enqueue.','Define the state, generate its moves, expand by layers.','For Snakes and Ladders, apply the landing rule as specified; do not repeatedly follow arbitrary chains.'],
  statebfs:['BFS + bitmask · visit all nodes','Find the fewest moves while collecting every required vertex; revisits are allowed.','State = (node, visitedMask). Seed every possible start. Mark seen[node][mask] on enqueue.','Same node, different history, different state.','A boolean visited[node] discards routes that return with more collected nodes. This is a walk, not a Hamiltonian path.'],
  allpaths:['DFS + path backtracking','Enumerate source-to-target routes in a DAG.','Append the current vertex, recurse into each neighbor, copy completed paths, then remove the vertex.','Choose, explore, undo.','Global visited can suppress different valid routes. General cyclic graphs need explicit path rules. Output may be exponential.'],
  undirectedcycle:['Undirected cycle detection','Determine whether an undirected component has a cycle.','DFS with parent edge identity, or reject a DSU union whose endpoints already share a root.','The edge back to your parent is expected.','With parallel edges use edge IDs; skipping every edge to the parent vertex misses a cycle.'],
  directedcycle:['Directed cycles · active path','A directed dependency loop or a repeated vertex on the current chain.','Use unseen / active / finished colors; an edge to active closes a directed cycle.','Visited is history; active is the current path.','An edge to a finished vertex need not form a cycle. Longest Cycle additionally tracks entry depth; its input has at most one outgoing edge per vertex.'],
  articulation:['Articulation points · low-link','Removing a vertex disconnects an undirected component.','DFS discovery and low values: a non-root u is a cut vertex if some child has low[child] >= tin[u]; root needs multiple DFS children.','Can a child escape without going through this vertex?','Bridge uses >; articulation uses >= and a separate root rule.'],
  closure:['Transitive closure · reachability','Ask whether any route exists between each ordered pair.','reachable[i][j] |= reachable[i][k] && reachable[k][j], with k outermost.','Reach i to k and k to j, so reach i to j.','This boolean matrix gives existence, not a minimum distance; decide whether zero-edge self reachability is included.']
};
for(const [key,row] of Object.entries(extraGraphGuides)) guides[key]={key,name:row[0],cue:row[1],state:row[2],memory:row[3],trap:row[4]};
for(const [,rows] of graphSheetGroups) for(const [,title,key] of rows){
  let p=problemBank.find(p=>p.title===title);
  if(!p){p={id:title.toLowerCase().replace(/[^a-z0-9]+/g,'-'),title,key,topic:'Graphs',difficulty:['Shortest Path Visiting All Nodes','Articulation Points','Longest Cycle in a Graph'].includes(title)?'Hard':'Medium',core:false};problemBank.push(p)}
  p.key=key;
}
// Additional existing problems also benefit from an explicit implicit-state label.
for(const p of problemBank) if(['Open the Lock','Minimum Genetic Mutation'].includes(p.title))p.key='implicitbfs';
Object.assign(problemNotes, {
  'Shortest Path Visiting All Nodes':[
    'Each edge costs one move; a valid walk can revisit vertices and edges. Any vertex can be the start.',
    'BFS over (node, mask). Initially enqueue (i, 1 << i) for every i at distance 0. From (u, mask), move to v with nextMask = mask | (1 << v). Stop when mask = (1 << n) - 1.',
    'On a star with center 0 and leaves 1, 2, 3, an optimal walk is 1 → 0 → 2 → 0 → 3 (4 edges). You must revisit 0 with a different mask. Time O((V + E) × 2^V), auxiliary space O(V × 2^V), excluding adjacency storage.'
  ],
  'Keys and Rooms':['Only reachability is required; there is no need to optimize distance.','Use BFS or DFS from room 0, enqueue newly obtained room keys, and compare the visited count to the room count.','The sheet groups this under BFS, but DFS is equally valid. Do not start at every room: that bypasses locked-room reachability.'],
  '01 Matrix':['Distance to the nearest zero in a grid.','Enqueue all zero cells at distance 0, then expand in four directions with one queue.','A separate BFS from every one repeats work; if no zero exists, follow the problem contract.'],
  'Rotting Oranges':['Several initially rotten cells spread simultaneously.','Seed all rotten cells, count fresh cells, and advance one minute per BFS layer.','Return -1 if fresh cells remain; return 0 if none were fresh initially.'],
  'Shortest Path in Binary Matrix':['Minimum number of cells on a legal path in an unweighted grid.','Use BFS with eight legal directions, mark on enqueue, and count the starting cell as distance 1.','Blocked endpoints fail immediately. Four-direction movement solves a different problem.'],
  'All Paths From Source to Target':['Output every route in the given DAG.','Use DFS with one mutable path; copy a path when the target is reached and undo each choice.','A shared visited set suppresses routes through a vertex reached from different parents.'],
  'Cheapest Flights Within K Stops (Bellman-Ford variant)':problemNotes['Cheapest Flights Within K Stops'],
  'Lexicographically Smallest Equivalent String':['Pairs create equivalence classes of letters.','Union letters, then map each base-string letter to the smallest character in its component.','An arbitrary DSU root is not necessarily the lexicographically smallest character. Track or enforce the minimum.']
});
const visitAllJava = `int shortestPathLength(int[][] graph) {
    int n = graph.length, full = (1 << n) - 1;
    boolean[][] seen = new boolean[n][1 << n];
    Queue<int[]> q = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        q.add(new int[]{i, 1 << i, 0});
        seen[i][1 << i] = true;
    }
    while (!q.isEmpty()) {
        int[] state = q.remove();
        int u = state[0], mask = state[1], steps = state[2];
        if (mask == full) return steps;
        for (int v : graph[u]) {
            int nextMask = mask | (1 << v);
            if (seen[v][nextMask]) continue;
            seen[v][nextMask] = true;
            q.add(new int[]{v, nextMask, steps + 1});
        }
    }
    return -1;
}`;
graphAlgorithms.visitall={name:'BFS + bitmask · visit all nodes',key:'statebfs',time:'O((V + E) × 2^V)',space:'O(V × 2^V)',directed:false,edges:'0>1, 0>2, 0>3',vertices:4,code:visitAllJava};
graphAlgorithms.multisource={name:'Multi-source BFS · nearest source',key:'multibfs',time:'O(V + E)',space:'O(V)',directed:false,edges:'0>1, 1>2, 2>3, 3>4, 4>5',code:`int[] nearest(List<List<int[]>> adj, int[] sources) {
    int[] dist = new int[adj.size()];
    Arrays.fill(dist, -1);
    Queue<Integer> q = new ArrayDeque<>();
    for (int s : sources) {
        if (dist[s] != -1) continue;
        dist[s] = 0; q.add(s);
    }
    while (!q.isEmpty()) {
        int u = q.remove();
        for (int[] edge : adj.get(u)) {
            int v = edge[0];
            if (dist[v] != -1) continue;
            dist[v] = dist[u] + 1;
            q.add(v);
        }
    }
    return dist;
}`};
graphAlgorithms.components={name:'BFS · count connected components',key:'components',time:'O(V + E)',space:'O(V)',directed:false,edges:'0>1, 1>2, 3>4',code:`int components(List<List<int[]>> adj) {
    boolean[] seen = new boolean[adj.size()];
    int count = 0;
    Queue<Integer> q = new ArrayDeque<>();
    for (int start = 0; start < adj.size(); start++) {
        if (seen[start]) continue;
        count++;
        seen[start] = true; q.add(start);
        while (!q.isEmpty()) {
            int u = q.remove();
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                if (seen[v]) continue;
                seen[v] = true; q.add(v);
            }
        }
    }
    return count;
}`};
const basicGraphTrace=graphTrace;
graphTrace=function(id,n,edges,source,directed){
  if(!['visitall','multisource','components'].includes(id))return basicGraphTrace(id,n,edges,source,directed);
  const a=graphAlgorithms[id],adj=Array.from({length:n},()=>[]),out=[];
  for(const [u,v] of edges){adj[u].push(v);if(!directed)adj[v].push(u)}
  let queue=[],head=0,active=-1,edge=null,seen=[],dist=Array(n).fill(Infinity),mask=0;
  const emit=(needle,msg,vars={})=>out.push({line:Math.max(0,a.code.split('\n').findIndex(l=>l.includes(needle))),msg,vars,active,edge:edge&&[...edge],seen:[...seen],dist:[...dist],parent:[],matrix:null,accepted:[],front:queue.slice(head,head+8).map(s=>Array.isArray(s)?`${s[0]}:${s[1].toString(2).padStart(n,'0')}@${s[2]}`:s),mask,queueSize:queue.length-head});
  if(id==='visitall'){
    const visited=Array.from({length:n},()=>new Set()),full=(1<<n)-1;
    for(let i=0;i<n;i++){queue.push([i,1<<i,0]);visited[i].add(1<<i)}
    emit('for (int i','Every vertex is a possible start at distance 0. Queue entries are node:mask@steps; only the first 8 are displayed.',{goal:full.toString(2).padStart(n,'0'),starts:n});
    while(head<queue.length){
      let [u,m,d]=queue[head++];active=u;mask=m;seen=Array.from({length:n},(_,i)=>i).filter(i=>m&(1<<i));edge=null;
      emit('int[] state',`Dequeue (${u}, ${m.toString(2).padStart(n,'0')}) at ${d} moves. Bit i means vertex i has been visited.`,{node:u,mask:m.toString(2).padStart(n,'0'),steps:d,queued:queue.length-head});
      if(m===full){emit('if (mask == full)',`All ${n} vertices visited in ${d} moves. BFS layers prove this is minimum.`,{result:d,mask:m.toString(2).padStart(n,'0'),states:queue.length});return out}
      for(let v of adj[u]){let next=m|(1<<v);if(visited[v].has(next))continue;visited[v].add(next);queue.push([v,next,d+1]);edge=[u,v];emit('q.add(new int[]{v',`Move ${u} → ${v}: ${m.toString(2).padStart(n,'0')} OR bit ${v} = ${next.toString(2).padStart(n,'0')}. Enqueue this node-and-mask pair.`,{nextNode:v,nextMask:next.toString(2).padStart(n,'0'),steps:d+1,queued:queue.length-head})}
    }
    emit('return -1','No walk reaches the full mask. The graph may be disconnected.',{result:-1});return out;
  }
  const marked=new Set();let count=0;
  const drain=()=>{while(head<queue.length){let u=queue[head++];active=u;edge=null;emit('int u = q.remove()',`Process vertex ${u}.`,{node:u,components:count,queued:queue.length-head});for(let v of adj[u]){if(marked.has(v))continue;marked.add(v);seen.push(v);dist[v]=dist[u]+1;queue.push(v);edge=[u,v];emit(id==='multisource'?'dist[v] =':'seen[v] =',`Discover ${v} from ${u}${id==='multisource'?` at nearest-source distance ${dist[v]}`:''}.`,{node:v,distance:dist[v],components:count})}}};
  if(id==='multisource'){
    for(const s of new Set([source,n-1])){marked.add(s);seen.push(s);dist[s]=0;queue.push(s)}
    emit('for (int s','Seed Source and the last vertex together at distance 0. All sources share one queue.',{sources:seen.join(', ')});drain();emit('return dist','Each finite distance is the fewest edges from any seeded source.',{sources:[source,n-1].join(', '),reached:seen.length});
  }else{
    emit('int count','Scan every vertex. Each unvisited start identifies a separate component.',{components:0});
    for(let s=0;s<n;s++){if(marked.has(s))continue;count++;marked.add(s);seen.push(s);dist[s]=0;queue.push(s);active=s;edge=null;emit('count++',`Start component ${count} at ${s}. Isolated vertices count too.`,{components:count,start:s});drain()}
    emit('return count',`${count} connected components found.`,{components:count});
  }
  return out;
};
const baseBlueprint=blueprint;
blueprint=function(key){if(key==='statebfs')return visitAllJava;return baseBlueprint(key)};
const visitAllProblem=problemBank.find(p=>p.key==='statebfs');
visitAllProblem.url='https://leetcode.com/problems/shortest-path-visiting-all-nodes/description/';

const bfsApplications=[
  ['Reachability','Can I reach every required room?','Queue a vertex; visited[vertex]. No distance optimization required.','Keys and Rooms','dfs'],
  ['Components','How many disconnected groups exist?','Outer scan + BFS from each unseen start.','Number of Connected Components in an Undirected Graph','components'],
  ['Unweighted shortest path','What is the fewest number of legal moves?','Queue a vertex/cell; distance per BFS layer.','Shortest Path in Binary Matrix','bfs'],
  ['Simultaneous spread','Which source reaches a cell first?','Seed all sources at distance 0 in one queue.','Rotting Oranges','multisource'],
  ['Implicit graph','What are the next legal configurations?','Queue a word, board square, or lock code; generate neighbors.','Word Ladder',null],
  ['History-dependent state','What is the shortest walk that visits every node?','Queue (node, visitedMask); seen[node][mask].','Shortest Path Visiting All Nodes','visitall'],
  ['Two-coloring','Can every edge join opposite groups?','Queue vertices and assign alternating colors in every component.','Is Graph Bipartite','bipartite'],
  ['Dependency queue · Kahn','Which tasks have no remaining prerequisites?','Queue zero-indegree vertices; this is not a shortest-path BFS.','Course Schedule','topo']
];
function graphLearningHTML(){return `<section class="panel lesson-body"><h2>BFS is a traversal strategy, not one problem pattern</h2><p>First define the state and legal transitions. FIFO explores equal-cost transitions in layers. Choose BFS or DFS for reachability; choose BFS when the fewest equal-cost moves matter. Unequal nonnegative edge costs need Dijkstra. A grid or word transformation can be a graph too.</p><div class="guide-grid">${bfsApplications.map(([name,cue,state,title,lab])=>{const p=problemBank.find(p=>p.title===title);return `<article class="panel mini-guide"><h3>${name}</h3><p>${cue}</p><p><strong>State:</strong> ${state}</p><button class="text-action" data-open-problem="${p.id}">${esc(title)} →</button>${lab?`<button class="text-action" data-graph="${lab}">Related visual lesson →</button>`:'<p class="notice">Recognition guide and practice workspace; no dedicated animation yet.</p>'}</article>`}).join('')}</div><details><summary>Why visited[node] fails for “visit all nodes”</summary><p>Star graph: center 0 connects to 1, 2, 3. Walk 1 → 0 → 2 → 0 → 3 visits all nodes in 4 moves. Returning to 0 is essential. At 0 with mask 0011 and at 0 with mask 0111, different nodes remain to collect. A single visited[0] merges two different states and loses valid walks.</p><p>Bit 0 is the rightmost bit. Set bit v with <code>mask | (1 &lt;&lt; v)</code>. Goal: <code>(1 &lt;&lt; n) - 1</code>. Start from all vertices because the problem allows any start. This uses both multi-source initialization and bitmask state.</p><button class="primary" data-graph="visitall">Animate the star example →</button></details></section><section class="panel lesson-body"><h2>RisingBrain graph checklist · 43 / 43 entries mapped</h2><p>Checked 16 October 2026 against the <a href="https://risingbrain.org/sheet/pattern-wise-sheet" target="_blank" rel="noopener">RisingBrain pattern-wise sheet ↗</a>. Its current full sheet lists 385 entries. This checklist follows its seven graph groups, including algorithm implementation and variant entries. The full PatternLab library remains an expanded independent selection.</p><p>Each entry opens a reasoning workspace and practice link. Mapping an entry does not mean it has its own animation or full solution. Sheet grouping and recommended technique can differ: Keys and Rooms works with BFS or DFS; bounded-stop flights need extra state or bounded relaxation.</p>${graphSheetGroups.map(([group,rows])=>`<details><summary>${group} · ${rows.length} entries</summary><div class="guide-question-links">${rows.map(([label,title])=>{const p=problemBank.find(p=>p.title===title);return `<button data-open-problem="${p.id}">${esc(label)} <small>${esc(guides[p.key].name)}</small><span>Open →</span></button>`}).join('')}</div></details>`).join('')}</section>`}

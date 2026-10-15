const variantRows={
cycle:['Directed cycle · active path','Detect a back edge into unfinished DFS work.','Colors 0 unseen, 1 active, 2 finished; inspect all components.','Active is on this path; finished is completed work.','Revisiting a finished vertex is not a cycle.'],
lowlink:['Low-link · bridges & cut vertices','Find connectivity vulnerabilities in an undirected graph.','tin/low arrays; skip incoming edge ID; propagate low on child return.','Can this subtree escape through an ancestor?','Bridge: low[child] > tin[u]. Cut vertex: >= with a separate root rule.'],
safe:['Reverse Kahn · eventual safety','Every possible continuation must end at a terminal.','Queue terminal vertices; decrement predecessor outdegrees.','Remove known-safe endings backward.','A vertex with one safe successor and one cyclic successor is unsafe.'],
minimax:['Dijkstra · bottleneck cost','Minimize the maximum transition cost on a route.','candidate = max(best[u], weight); settle smallest tentative bottleneck.','Minimize the worst step, not the sum.','For vertex elevations include the starting elevation; negative edge costs are outside this lesson.'],
flights:['Bounded Bellman–Ford','A route may use at most a fixed number of edges.','Each pass reads old distances and writes a clone; stop at the edge budget.','One pass buys at most one edge.','In-place updates can chain multiple edges in a single pass.'],
negative:['Bellman–Ford · cycle anywhere','A negative cycle may be disconnected from the selected source.','Initialize all distances to zero and relax V passes; change on pass V proves a cycle.','Start everywhere to detect a cycle anywhere.','Finite values during this detector are not source shortest-path results.'],
equivalence:['DSU · smallest representative','An equivalence class needs its smallest member as the output representative.','Parent/size for connectivity plus minimum label per root.','Root chooses the group; metadata chooses its answer.','Union-by-size does not guarantee the smallest vertex is the root.'],
prim:['Prim · grow a minimum spanning tree','Build a cheapest undirected spanning connection from a frontier.','Min-heap of crossing edges, visited vertices, accepted cost.','Take the cheapest edge crossing out of the current tree.','Prim heap keys are edge weights, not source path distances. Detect disconnected input.']
};
for(const [key,r]of Object.entries(variantRows))guides[key]={key,name:r[0],cue:r[1],state:r[2],memory:r[3],trap:r[4]};
const javaVariants={
cycle:`boolean dfsCycle(int u, List<List<int[]>> adj, int[] color) {
    color[u] = 1;
    for (int[] edge : adj.get(u)) {
        int v = edge[0];
        if (color[v] == 1) return true;
        if (color[v] == 0 && dfsCycle(v, adj, color)) return true;
    }
    color[u] = 2;
    return false;
}
// Call for every still-unseen vertex; any true means a cycle.`,
lowlink:`// adj entries are {neighbor, edgeId}; initialize tin to -1.
// Fields: int timer; int[] tin, low; boolean[] cut;
// List<int[]> bridges stores bridge endpoints.
void dfsLow(int u, int parentEdge, List<List<int[]>> adj) {
    tin[u] = low[u] = timer++;
    int children = 0;
    for (int[] edge : adj.get(u)) {
        int v = edge[0], id = edge[1];
        if (id == parentEdge) continue;
        if (tin[v] != -1) low[u] = Math.min(low[u], tin[v]);
        else {
            dfsLow(v, id, adj); children++;
            low[u] = Math.min(low[u], low[v]);
            if (low[v] > tin[u]) bridges.add(new int[]{u, v});
            if (parentEdge != -1 && low[v] >= tin[u]) cut[u] = true;
        }
    }
    if (parentEdge == -1 && children > 1) cut[u] = true;
}
// Start dfsLow(u, -1, adj) for every tin[u] == -1.`,
allpaths:`void paths(int u, int target, List<List<int[]>> adj,
           List<Integer> path, List<List<Integer>> answer) {
    path.add(u);
    if (u == target) answer.add(new ArrayList<>(path));
    else for (int[] edge : adj.get(u)) {
        paths(edge[0], target, adj, path, answer);
    }
    path.remove(path.size() - 1);
}
// Requires a DAG. Begin with an empty path and answer.`,
safe:`boolean[] safeNodes(List<List<Integer>> adj) {
    int n = adj.size();
    List<List<Integer>> rev = new ArrayList<>();
    for (int i = 0; i < n; i++) rev.add(new ArrayList<>());
    int[] out = new int[n];
    Queue<Integer> q = new ArrayDeque<>();
    for (int u = 0; u < n; u++) {
        out[u] = adj.get(u).size();
        for (int v : adj.get(u)) rev.get(v).add(u);
        if (out[u] == 0) q.add(u);
    }
    boolean[] safe = new boolean[n];
    while (!q.isEmpty()) {
        int v = q.remove(); safe[v] = true;
        for (int u : rev.get(v)) if (--out[u] == 0) q.add(u);
    }
    return safe;
}`,
minimax:`long[] bottleneck(List<List<int[]>> adj, int source) {
    long[] best = new long[adj.size()];
    Arrays.fill(best, Long.MAX_VALUE);
    PriorityQueue<long[]> pq = new PriorityQueue<>(Comparator.comparingLong(a -> a[0]));
    best[source] = 0; pq.add(new long[]{0, source});
    while (!pq.isEmpty()) {
        long[] cur = pq.remove(); long cost = cur[0]; int u = (int)cur[1];
        if (cost != best[u]) continue;
        for (int[] edge : adj.get(u)) {
            int v = edge[0]; long next = Math.max(cost, edge[1]);
            if (next < best[v]) {
                best[v] = next; pq.add(new long[]{next, v});
            }
        }
    }
    return best;
}
// Nonnegative edge thresholds. Vertex-elevation models must seed the start elevation.`,
flights:`long[] boundedRoutes(int n, int[][] edges, int source, int maxEdges) {
    long INF = Long.MAX_VALUE / 4;
    long[] dist = new long[n]; Arrays.fill(dist, INF); dist[source] = 0;
    for (int pass = 1; pass <= maxEdges; pass++) {
        long[] next = dist.clone();
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != INF) next[v] = Math.min(next[v], dist[u] + w);
        }
        dist = next;
    }
    return dist;
}
// K stops -> maxEdges = K + 1. Do not read next[u] while relaxing.`,
negative:`boolean anyNegativeCycle(int n, int[][] edges) {
    long[] dist = new long[n]; // All zero: virtual source reaches every node.
    for (int pass = 1; pass <= n; pass++) {
        boolean changed = false;
        for (int[] e : edges) {
            if (dist[e[0]] + e[2] < dist[e[1]]) {
                dist[e[1]] = dist[e[0]] + e[2]; changed = true;
            }
        }
        if (!changed) return false;
        if (pass == n) return true;
    }
    return false;
}`,
closure:`boolean[][] closure(int n, int[][] edges) {
    boolean[][] reach = new boolean[n][n];
    for (int i = 0; i < n; i++) reach[i][i] = true;
    for (int[] e : edges) reach[e[0]][e[1]] = true;
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                reach[i][j] |= reach[i][k] && reach[k][j];
    return reach;
}`,
equivalence:`// Initialize parent[i] = minLabel[i] = i; size[i] = 1.
// Uses find() from the Union-Find lesson.
void merge(int u, int v, int[] parent, int[] size, int[] minLabel) {
    int a = find(u, parent), b = find(v, parent);
    if (a == b) return;
    if (size[a] < size[b]) { int t = a; a = b; b = t; }
    parent[b] = a; size[a] += size[b];
    minLabel[a] = Math.min(minLabel[a], minLabel[b]);
}
// Map each query x to minLabel[find(x, parent)].`,
prim:`long prim(List<List<int[]>> adj, int source) {
    boolean[] seen = new boolean[adj.size()];
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
    pq.add(new int[]{0, source}); long cost = 0; int used = 0;
    while (!pq.isEmpty()) {
        int[] entry = pq.remove(); int w = entry[0], u = entry[1];
        if (seen[u]) continue;
        seen[u] = true; cost += w; used++;
        for (int[] edge : adj.get(u))
            if (!seen[edge[0]]) pq.add(new int[]{edge[1], edge[0]});
    }
    if (used != adj.size()) throw new IllegalArgumentException("Disconnected");
    return cost;
}`
};
const variantDefs={
cycle:['DFS · directed cycle colors','cycle',true,'0>1, 1>2, 2>1, 3>4','O(V + E)','O(V)'],
lowlink:['DFS · bridges & articulation points','lowlink',false,'0>1, 1>2, 2>0, 1>3, 3>4, 3>5','O(V + E)','O(V)'],
allpaths:['DFS · enumerate DAG paths','allpaths',true,'0>1, 0>2, 1>3, 2>3, 3>5','O(V × explored partial paths), exponential','O(V), excluding output'],
safe:['Reverse Kahn · eventual safe nodes','safe',true,'0>1, 1>2, 2>1, 3>4, 4>5','O(V + E)','O(V + E)'],
minimax:['Dijkstra · minimum bottleneck','minimax',false,'0>1:4, 1>5:4, 0>2:1, 2>5:6, 2>3:2, 3>4:3','O((V + E) log(V + E))','O(V + E)'],
flights:['Bellman–Ford · bounded edge budget','flights',true,'0>1:5, 1>5:5, 0>5:30, 0>2:1, 2>3:1, 3>5:1','O(B(V + E)), B = edge budget','O(V)'],
negative:['Bellman–Ford · negative cycle anywhere','negative',true,'0>1:2, 2>3:-2, 3>2:1, 4>5:1','O(VE)','O(V)'],
closure:['Floyd variant · transitive closure','closure',true,'0>1, 1>2, 2>3, 4>5','O(V³)','O(V²)'],
equivalence:['Union-Find · smallest representative','equivalence',false,'5>4, 4>3, 3>0, 1>2','O(V + E α(V))','O(V)'],
prim:['Prim · frontier MST','prim',false,'0>1:4, 0>2:1, 1>2:2, 1>3:1, 2>4:5, 3>5:3, 4>5:1','O((V + E) log(V + E))','O(V + E)']
};
for(const [id,[name,key,directed,edges,time,space]]of Object.entries(variantDefs))graphAlgorithms[id]={name,key,directed,edges,time,space,code:javaVariants[id]};
let graphBudget=2;
const curriculumTrace=graphTrace;
graphTrace=function(id,n,edges,source,directed,budget=graphBudget){
 if(!variantDefs[id])return curriculumTrace(id,n,edges,source,directed);
 const a=graphAlgorithms[id],out=[],adj=Array.from({length:n},()=>[]),rev=Array.from({length:n},()=>[]);
 edges.forEach(([u,v,w],i)=>{adj[u].push([v,w,i]);rev[v].push(u);if(!directed){adj[v].push([u,w,i]);rev[u].push(v)}});
 let seen=[],front=[],active=-1,edge=null,dist=Array(n).fill(Infinity),parent=Array.from({length:n},(_,i)=>i),matrix=null,accepted=[],extra='';
 const emit=(needle,msg,vars={})=>out.push({line:Math.max(0,a.code.split('\n').findIndex(l=>l.includes(needle))),msg,vars,seen:[...seen],front:[...front],active,edge:edge&&[...edge],dist:[...dist],parent:[...parent],matrix:matrix?.map(r=>[...r]),accepted:accepted.map(e=>[...e]),extra});
 emit('',`Build ${directed?'directed':'undirected'} graph. This lesson uses ${a.name}.`,{V:n,E:edges.length});
 if(id==='cycle'){
   const color=Array(n).fill(0);let cycle=false;
   const visit=u=>{active=u;color[u]=1;front.push(u);seen.push(u);extra=`Colors: [${color}] · 0 unseen, 1 active, 2 finished`;emit('color[u] = 1',`Enter ${u}; it is now on the active path.`,{node:u});
     for(const [v]of adj[u]){active=u;edge=[u,v];if(color[v]===1){cycle=true;emit('if (color[v] == 1)',`Back edge ${u} → ${v} reaches active work: a directed cycle exists.`,{cycle:'yes'});return true}
       if(color[v]===0&&visit(v))return true;
       active=u;edge=[u,v];
       if(color[v]===2)emit('if (color[v] == 0',`${v} is finished. Reaching it again does not prove a cycle.`,{from:u,to:v});}
     active=u;color[u]=2;front.pop();extra=`Colors: [${color}]`;emit('color[u] = 2',`Finish ${u}; remove it from the active path.`,{node:u});return false};
   for(let u=0;u<n&&!cycle;u++)if(!color[u])visit(u);
   emit(cycle?'return true':'return false',cycle?'A back edge proves a directed cycle.':'Every component finished without a back edge.',{cycle:cycle?'yes':'no'});
 }
 if(id==='lowlink'){
   const tin=Array(n).fill(-1),low=Array(n).fill(-1),cuts=new Set();let timer=0;
   const visit=(u,pe)=>{tin[u]=low[u]=timer++;active=u;seen.push(u);front.push(u);let children=0;extra=`tin [${tin}] · low [${low}]`;emit('tin[u] = low[u]',`Discover ${u}: tin = low = ${tin[u]}.`,{node:u,tin:tin[u],low:low[u]});
     for(const [v,,eid]of adj[u]){if(eid===pe)continue;active=u;edge=[u,v];if(tin[v]!==-1){low[u]=Math.min(low[u],tin[v]);extra=`tin [${tin}] · low [${low}]`;emit('if (tin[v] != -1)',`A non-parent edge reaches ${v}; lower low[${u}] to ${low[u]}.`,{u,v,low:low[u]});}
       else{visit(v,eid);active=u;edge=[u,v];children++;low[u]=Math.min(low[u],low[v]);if(low[v]>tin[u])accepted.push([u,v]);if(pe!==-1&&low[v]>=tin[u])cuts.add(u);extra=`tin [${tin}] · low [${low}] · cut vertices [${[...cuts]}]`;emit('low[u] = Math.min(low[u], low[v])',`Return ${v} → ${u}: low[${v}]=${low[v]}, tin[${u}]=${tin[u]}. ${low[v]>tin[u]?'Bridge found.':'There is a return connection.'}`,{u,v,bridge:low[v]>tin[u]?'yes':'no',cuts:cuts.size});}}
     if(pe===-1&&children>1)cuts.add(u);front.pop();};
   for(let u=0;u<n;u++)if(tin[u]<0)visit(u,-1);
   extra=`tin [${tin}] · low [${low}] · cut vertices [${[...cuts].sort((a,b)=>a-b)}] · highlighted green edges are bridges`;
   emit('if (parentEdge == -1',`Complete: ${accepted.length} bridges; cut vertices [${[...cuts].sort((a,b)=>a-b)}].`,{bridges:accepted.length,cutVertices:[...cuts].sort((a,b)=>a-b).join(', ')||'none'});
 }
 if(id==='allpaths'){
   const color=Array(n).fill(0),check=u=>{color[u]=1;for(const [v]of adj[u]){if(color[v]===1)return false;if(!color[v]&&!check(v))return false}color[u]=2;return true};
   for(let u=0;u<n;u++)if(!color[u]&&!check(u))throw Error('Path enumeration lesson requires a DAG. Remove directed cycles.');
   const paths=[];const visit=u=>{active=u;front.push(u);seen=[...front];emit('path.add(u)',`Choose ${u}. Current path [${front}].`,{node:u,paths:paths.length});
     if(u===n-1){paths.push([...front]);extra=`Completed paths: ${paths.map(p=>p.join(' → ')).join(' | ')}`;emit('answer.add',`Copy completed path [${front}]. Shared vertices may occur in other paths.`,{paths:paths.length});}
     else for(const [v]of adj[u]){edge=[u,v];visit(v)}
     active=u;front.pop();seen=[...front];emit('path.remove',`Undo ${u}; path becomes [${front}].`,{paths:paths.length});};visit(source);emit('path.remove',`All ${paths.length} source-to-${n-1} paths enumerated. Output storage is separate from the recursion stack.`,{paths:paths.length});
 }
 if(id==='safe'){
   dist=adj.map(r=>r.length);front=dist.flatMap((d,i)=>d===0?[i]:[]);extra=`Remaining outdegree: [${dist}]`;emit('if (out[u] == 0)',`Seed terminal vertices [${front}].`,{terminals:front.length});
   while(front.length){active=front.shift();seen.push(active);emit('safe[v] = true',`${active} is safe: all its outgoing choices have been eliminated.`,{safe:seen.length,node:active});for(const u of rev[active]){edge=[u,active];dist[u]--;if(!dist[u])front.push(u);extra=`Remaining outdegree: [${dist}]`;emit('if (--out[u] == 0)',`Remove safe successor ${active} from ${u}; ${dist[u]} outgoing choices remain.`,{predecessor:u,remaining:dist[u]});}}
   emit('return safe',`Safe nodes [${[...seen].sort((a,b)=>a-b)}]. Remaining nodes can reach a directed cycle.`,{safe:seen.length});
 }
 if(id==='minimax'||id==='prim'){
   if(id==='minimax'&&edges.some(e=>e[2]<0))throw Error('Bottleneck lesson requires nonnegative thresholds.');
   let pq=[[0,source,-1]],cost=0;dist[source]=0;
   while(pq.length){pq.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);let [d,u,from]=pq.shift();active=u;front=pq.map(([x,v])=>`${v}:${x}`);if(id==='minimax'?d!==dist[u]:seen.includes(u))continue;
     if(!seen.includes(u))seen.push(u);if(id==='prim'){cost+=d;if(from>=0)accepted.push([from,u]);}
     emit(id==='minimax'?'long[] cur':'seen[u] = true',id==='minimax'?`Settle ${u} with minimum possible bottleneck ${d}.`:`Join ${u} using crossing-edge cost ${d}; tree cost becomes ${cost}.`,{node:u,cost:id==='minimax'?d:cost});
     for(const [v,w]of adj[u]){edge=[u,v];if(id==='prim'){if(!seen.includes(v))pq.push([w,v,u]);}else{let next=Math.max(d,w);if(next<dist[v]){dist[v]=next;pq.push([next,v,u]);front=pq.map(([x,j])=>`${j}:${x}`);emit('long next = Math.max',`Relax ${u} → ${v}: max(${d}, ${w}) = ${next}, replacing ${dist[v]===Infinity?'∞':'the old bound'}.`,{u,v,bottleneck:next});}}}
   }
   emit(id==='prim'?'return cost':'return best',id==='prim'?seen.length===n?`MST complete; total cost ${cost}.`:'Disconnected input: no spanning tree.':`Final minimum bottlenecks: [${dist.map(d=>d===Infinity?'∞':d)}].`,id==='prim'?{cost,connected:seen.length===n?'yes':'no'}:{reached:seen.length});
 }
 if(id==='flights'||id==='negative'){
   dist=id==='negative'?Array(n).fill(0):Array.from({length:n},(_,i)=>i===source?0:Infinity);const all=directed?edges:edges.flatMap(([u,v,w])=>[[u,v,w],[v,u,w]]),limit=id==='negative'?n:budget;let changed=false;
   for(let pass=1;pass<=limit;pass++){changed=false;let old=[...dist],next=[...dist];extra=`Pass ${pass}/${limit}${id==='flights'?` · previous [${old.map(d=>d===Infinity?'∞':d)}]`:''}`;emit(id==='flights'?'long[] next':'boolean changed',id==='flights'?`Read the previous array. This pass allows at most ${pass} edges.`:`Pass ${pass}: initialize change flag to false. All vertices were seeded at zero.`,{pass,budget:limit});
     for(const [u,v,w]of all){const base=id==='negative'?dist:old;if(base[u]!==Infinity&&base[u]+w<(id==='negative'?dist:next)[v]){active=u;edge=[u,v];if(id==='negative')dist[v]=dist[u]+w;else next[v]=old[u]+w;changed=true;if(!seen.includes(v))seen.push(v);if(id==='flights')dist=[...next];emit(id==='flights'?'next[v] =':'dist[e[1]] =',`Relax ${u} → ${v}; cost bound becomes ${dist[v]}.`,{pass,to:v,cost:dist[v]});}}
     if(id==='flights')dist=next;else if(!changed)break;
   }
   emit(id==='flights'?'return dist':'if (pass == n)',id==='flights'?`After ${limit} rounds, routes use at most ${limit} edges (${Math.max(0,limit-1)} intermediate stops).`:changed?'An improvement on pass V proves a negative cycle somewhere in the graph.':'No changes remain; no negative cycle exists.',id==='flights'?{maxEdges:limit,target:n-1,cost:dist[n-1]===Infinity?'unreachable':dist[n-1]}:{negativeCycle:changed?'yes':'no'});
 }
 if(id==='closure'){
   matrix=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));for(const [u,v]of edges){matrix[u][v]=1;if(!directed)matrix[v][u]=1}emit('boolean[][] reach','Initialize direct edges and zero-edge self reachability.',{V:n});
   for(let k=0;k<n;k++){active=k;emit('int k =',`Allow ${k} as an intermediate vertex.`,{k});for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(!matrix[i][j]&&matrix[i][k]&&matrix[k][j]){matrix[i][j]=1;edge=[i,j];emit('reach[i][j] |=',`Reach ${i} → ${k} and ${k} → ${j}; therefore ${i} reaches ${j}.`,{i,j,k});}}
   extra='Boolean matrix: 1 means reachable, 0 means unreachable; diagonal includes zero-edge paths.';emit('return reach','Transitive closure complete. No path costs are stored.',{reachablePairs:matrix.flat().reduce((a,b)=>a+b,0)});
 }
 if(id==='equivalence'){
   dist=Array.from({length:n},(_,i)=>i);
   const size=Array(n).fill(1),minimum=Array.from({length:n},(_,i)=>i),find=x=>{while(parent[x]!==x){parent[x]=parent[parent[x]];x=parent[x]}return x};
   for(const [u,v]of edges){let a=find(u),b=find(v);active=u;edge=[u,v];if(a!==b){if(size[a]<size[b])[a,b]=[b,a];parent[b]=a;size[a]+=size[b];minimum[a]=Math.min(minimum[a],minimum[b]);accepted.push([u,v]);seen=[...new Set([...seen,u,v])];}dist=Array.from({length:n},(_,i)=>minimum[find(i)]);extra=`Parent [${parent}] · smallest label per vertex [${dist}]`;emit('minLabel[a] =',`Merge ${u} and ${v}. Root ${find(u)} represents the class; minimum label ${minimum[find(u)]} is its replacement.`,{root:find(u),minimum:minimum[find(u)]});}
   emit('minLabel[find',`Final replacement labels: [${dist}]. Root identity and smallest label may differ.`,{classes:new Set(parent.map((_,i)=>find(i))).size});
 }
 return out;
};
const problemJavaCores={
'Island Perimeter':`int perimeter(int[][] grid) {
    int result = 0, rows = grid.length, cols = grid[0].length;
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {
        if (grid[r][c] == 0) continue;
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] == 0) result++;
        }
    }
    return result;
}`,
'Longest Cycle in a Graph':`int longestCycle(int[] edges) {
    int[] stamp = new int[edges.length]; int time = 1, best = -1;
    for (int start = 0; start < edges.length; start++) {
        if (stamp[start] != 0) continue;
        int walkStart = time, u = start;
        while (u != -1 && stamp[u] == 0) { stamp[u] = time++; u = edges[u]; }
        if (u != -1 && stamp[u] >= walkStart) best = Math.max(best, time - stamp[u]);
    }
    return best;
}`,
'Clone Graph':`// Node has int val and List<Node> neighbors. Call with a new HashMap<>.
Node clone(Node node, Map<Node, Node> copies) {
    if (node == null) return null;
    if (copies.containsKey(node)) return copies.get(node);
    Node copy = new Node(node.val);
    copies.put(node, copy); // cache identity before exploring cycles
    for (Node next : node.neighbors) copy.neighbors.add(clone(next, copies));
    return copy;
}`,
'Find All Possible Recipes from Given Supplies':`// Core after building ingredient -> dependent recipe indices:
// missing[r] = ingredient count; dependents maps ingredient to recipe IDs.
Queue<String> ready = new ArrayDeque<>();
Set<String> available = new HashSet<>();
for (String s : supplies) if (available.add(s)) ready.add(s);
for (int r = 0; r < recipes.length; r++)
    if (missing[r] == 0 && available.add(recipes[r])) ready.add(recipes[r]);
while (!ready.isEmpty()) {
    String item = ready.remove();
    for (int r : dependents.getOrDefault(item, List.of())) {
        if (--missing[r] == 0 && available.add(recipes[r])) ready.add(recipes[r]);
    }
}
// Return recipe names contained in available. External ingredients must exist.`,
'Alien Dictionary':`// Core graph-building step. Seed graph/indegree for every character first.
for (int i = 1; i < words.length; i++) {
    String a = words[i-1], b = words[i]; int j = 0;
    while (j < Math.min(a.length(), b.length()) && a.charAt(j) == b.charAt(j)) j++;
    if (j == Math.min(a.length(), b.length())) {
        if (a.length() > b.length()) return ""; // invalid prefix order
    } else {
        char u = a.charAt(j), v = b.charAt(j);
        if (graph.get(u).add(v)) indegree.put(v, indegree.get(v) + 1);
    }
}
// Kahn over characters. Return empty if processed != total distinct characters.`,
'Accounts Merge':`// account DSU is initialized with one vertex per account.
Map<String, Integer> owner = new HashMap<>();
for (int a = 0; a < accounts.size(); a++) {
    for (int j = 1; j < accounts.get(a).size(); j++) {
        String email = accounts.get(a).get(j);
        Integer old = owner.putIfAbsent(email, a);
        if (old != null) union(a, old, parent, size);
    }
}
Map<Integer, List<String>> groups = new HashMap<>();
for (var entry : owner.entrySet())
    groups.computeIfAbsent(find(entry.getValue(), parent), k -> new ArrayList<>()).add(entry.getKey());
// Sort emails within each group; prepend its account name.`,
'Most Stones Removed with Same Row or Column':`// Model one DSU vertex per stone; shared rows/columns connect stone indices.
Map<Integer,Integer> rowOwner = new HashMap<>(), colOwner = new HashMap<>();
int components = stones.length;
for (int i = 0; i < stones.length; i++) {
    Integer r = rowOwner.putIfAbsent(stones[i][0], i);
    Integer c = colOwner.putIfAbsent(stones[i][1], i);
    if (r != null && union(i, r, parent, size)) components--;
    if (c != null && union(i, c, parent, size)) components--;
}
return stones.length - components;`,
'Number of Operations to Make Network Connected':`if (connections.length < n - 1) return -1;
int components = n;
for (int[] edge : connections)
    if (union(edge[0], edge[1], parent, size)) components--;
return components - 1;
// Initialize parent/size and use the Union-Find lesson's helpers.`,
'Reconstruct Itinerary':`// outgoing maps each airport to a min-heap of destinations; one entry per ticket.
void visit(String airport, Map<String, PriorityQueue<String>> outgoing, LinkedList<String> route) {
    PriorityQueue<String> next = outgoing.get(airport);
    while (next != null && !next.isEmpty()) visit(next.remove(), outgoing, route);
    route.addFirst(airport);
}
// Begin at JFK. Validate route length == ticket count + 1 if not guaranteed.`,
'Longest Increasing Path in a Matrix':`// memo[r][c] = longest increasing path starting at (r,c).
int longest(int r, int c, int[][] a, int[][] memo) {
    if (memo[r][c] != 0) return memo[r][c];
    int best = 1;
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    for (int[] d : dirs) {
        int nr = r+d[0], nc = c+d[1];
        if (nr>=0 && nr<a.length && nc>=0 && nc<a[0].length && a[nr][nc]>a[r][c])
            best = Math.max(best, 1 + longest(nr,nc,a,memo));
    }
    return memo[r][c] = best;
}
// Call for every cell and return the largest value.`,
'Find the City With the Smallest Number of Neighbors at a Threshold Distance':`// First run Floyd-Warshall; dist has all-pairs shortest distances.
int answer = -1, fewest = Integer.MAX_VALUE;
for (int u = 0; u < n; u++) {
    int count = 0;
    for (int v = 0; v < n; v++) if (u != v && dist[u][v] <= threshold) count++;
    if (count <= fewest) { fewest = count; answer = u; } // largest ID wins ties
}
return answer;`,
'Network Delay Time':`// Run the additive Dijkstra lesson from k first.
long answer = 0;
for (long d : dist) {
    if (d == INF) return -1;
    answer = Math.max(answer, d);
}
return answer;`,
'Detect Negative Cycle Using Floyd-Warshall':`// Initialize diagonal 0, nonedges INF, and minimum weights for parallel edges.
// After Floyd-Warshall with guarded additions:
for (int v = 0; v < n; v++) if (dist[v][v] < 0) return true;
return false;
// Affected path costs are undefined, even if the array holds finite numbers.`,
'Min Cost to Connect All Points':`long connect(int[][] points) {
    int n = points.length; boolean[] used = new boolean[n];
    long[] best = new long[n]; Arrays.fill(best, Long.MAX_VALUE); best[0] = 0;
    long total = 0;
    for (int step = 0; step < n; step++) {
        int u = -1;
        for (int i = 0; i < n; i++) if (!used[i] && (u == -1 || best[i] < best[u])) u = i;
        used[u] = true; total += best[u];
        for (int v = 0; v < n; v++) if (!used[v]) {
            long w = Math.abs((long)points[u][0]-points[v][0]) + Math.abs((long)points[u][1]-points[v][1]);
            best[v] = Math.min(best[v], w);
        }
    }
    return total;
}`
};
function problemJava(p){
 const plan=graphPlaybooks[p.title];if(!plan)return blueprint(p.key);
 const notes=`// Apply to: ${p.title}\n// State: ${plan.state}\n// Adaptation: ${plan.steps}\n// Counterexample: ${plan.trap}\n`;
 return notes+(problemJavaCores[p.title]||graphAlgorithms[plan.lab]?.code||blueprint(p.key));
}

const graphVariantBlueprint=blueprint;
blueprint=function(key){const lab=guides[key]?.lab;return lab?graphAlgorithms[lab].code:graphVariantBlueprint(key)};
function graphModelNote(id){const notes={
lowlink:'This model scans every component. Source is ignored. Adjacency entries show neighbor(edge ID), not weights; each input edge gets its own ID, including parallel edges. Green edges are bridges.',
cycle:'This model scans every component. Source is ignored. The frontier is the active recursion path; the extra state shows unseen/active/finished colors.',
safe:'Source is ignored. The model starts from every terminal and follows reversed edges while reducing predecessor outdegrees.',
negative:'Source is ignored. Every vertex starts at zero to detect a negative cycle anywhere, including disconnected components. Displayed labels are relaxation bounds, not source shortest distances.',
equivalence:'Source is ignored. Numeric vertices model symbols. Parent roots identify classes; minimum-label metadata gives each class its replacement.',
closure:'Source is ignored. The matrix uses 1 for reachable and 0 for unreachable; zero-edge self reachability is included.',
flights:'Source is used. Change Max edges below: K intermediate stops permit at most K + 1 edges. One pass reads only the previous array.',
allpaths:'Source is used; the target is the last numbered vertex. This model enumerates all routes in a DAG and rejects cycles.',
minimax:'Source is used. Edge weights are nonnegative thresholds and path cost is their maximum. A rising-water grid model must additionally include its starting elevation.',
prim:'Source chooses the starting tree vertex. Heap entries prioritize crossing-edge weights; this differs from Dijkstra path distances.'
};return notes[id]?`<p class="notice">${esc(notes[id])}</p>`:''}

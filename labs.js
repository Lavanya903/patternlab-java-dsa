const graphAlgorithms={
bfs:{name:'BFS · shortest unweighted paths',key:'graphbfs',time:'O(V + E)',space:'O(V)',directed:false,edges:'0>1, 0>2, 1>3, 2>4, 3>5, 4>5',code:`int[] bfs(List<List<int[]>> adj, int source) {
    int[] dist = new int[adj.size()];
    Arrays.fill(dist, -1);
    Queue<Integer> q = new ArrayDeque<>();
    dist[source] = 0; q.add(source);
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
}`},
dfs:{name:'DFS · reachability & call stack',key:'graphdfs',time:'O(V + E)',space:'O(V)',directed:false,edges:'0>1, 0>2, 1>3, 2>4, 3>5, 4>5',code:`void dfs(int u, List<List<int[]>> adj, boolean[] seen) {
    seen[u] = true;
    // Process vertex u here.
    for (int[] edge : adj.get(u)) {
        int v = edge[0];
        if (!seen[v]) {
            dfs(v, adj, seen);
        }
    }
    // Return to the previous stack frame.
}`},
topo:{name:'Kahn · dependencies & cycles',key:'topo',time:'O(V + E)',space:'O(V)',directed:true,edges:'0>2, 1>2, 1>3, 2>4, 3>4, 4>5',code:`List<Integer> topo(List<List<int[]>> adj) {
    int n = adj.size(); int[] in = new int[n];
    for (var row : adj) for (int[] e : row) in[e[0]]++;
    Queue<Integer> q = new ArrayDeque<>();
    for (int u = 0; u < n; u++) if (in[u] == 0) q.add(u);
    List<Integer> order = new ArrayList<>();
    while (!q.isEmpty()) {
        int u = q.remove(); order.add(u);
        for (int[] edge : adj.get(u)) {
            int v = edge[0];
            if (--in[v] == 0) q.add(v);
        }
    }
    return order.size() == n ? order : List.of();
}`},
dijkstra:{name:'Dijkstra · nonnegative shortest paths',key:'dijkstra',time:'O((V + E) log V)',space:'O(V + E)',directed:true,edges:'0>1:4, 0>2:1, 2>1:2, 1>3:1, 2>4:5, 3>5:3, 4>5:1',code:`long[] dijkstra(List<List<int[]>> adj, int source) {
    long[] dist = new long[adj.size()];
    Arrays.fill(dist, Long.MAX_VALUE);
    PriorityQueue<long[]> pq = new PriorityQueue<>(
        Comparator.comparingLong(e -> e[0]));
    dist[source] = 0; pq.add(new long[]{0, source});
    while (!pq.isEmpty()) {
        long[] item = pq.remove();
        long d = item[0]; int u = (int) item[1];
        if (d != dist[u]) continue;
        for (int[] edge : adj.get(u)) {
            int v = edge[0], w = edge[1];
            if (d + w < dist[v]) {
                dist[v] = d + w;
                pq.add(new long[]{dist[v], v});
            }
        }
    }
    return dist;
}`},
dsu:{name:'Union-Find · connected components',key:'dsu',time:'O(E α(V))',space:'O(V)',directed:false,edges:'0>1, 1>2, 0>2, 3>4, 4>5',code:`int find(int x, int[] parent) {
    if (parent[x] != x) parent[x] = find(parent[x], parent);
    return parent[x];
}
boolean union(int u, int v, int[] parent, int[] size) {
    int a = find(u, parent), b = find(v, parent);
    if (a == b) return false;
    if (size[a] < size[b]) { int t = a; a = b; b = t; }
    parent[b] = a;
    size[a] += size[b];
    return true;
}
// Start parent[i] = i, size[i] = 1, components = V.
// For each edge: if (union(...)) components--.`,},
kruskal:{name:'Kruskal · minimum spanning tree',key:'mst',time:'O(E log E)',space:'O(V + E)',directed:false,edges:'0>1:4, 0>2:1, 1>2:2, 1>3:1, 2>4:5, 3>5:3, 4>5:1',code:`// Uses find / union from the Union-Find lesson.
long mstCost(int n, int[][] edges) {
    Arrays.sort(edges, Comparator.comparingInt(e -> e[2]));
    int[] parent = new int[n], size = new int[n];
    for (int i = 0; i < n; i++) { parent[i] = i; size[i] = 1; }
    long cost = 0; int used = 0;
    for (int[] e : edges) {
        if (union(e[0], e[1], parent, size)) {
            cost += e[2]; used++;
        }
    }
    if (used != n - 1) throw new IllegalArgumentException("Disconnected");
    return cost;
}`},
bellman:{name:'Bellman–Ford · negative weights',key:'bellman',time:'O(VE)',space:'O(V)',directed:true,edges:'0>1:4, 0>2:5, 1>2:-2, 2>3:3, 3>4:2, 4>5:1',code:`long[] bellmanFord(int n, int[][] edges, int source) {
    final long INF = Long.MAX_VALUE / 4;
    long[] dist = new long[n]; Arrays.fill(dist, INF);
    dist[source] = 0;
    for (int pass = 1; pass < n; pass++) {
        long[] next = dist.clone();
        for (int[] e : edges) {
            int u = e[0], v = e[1], w = e[2];
            if (dist[u] != INF && dist[u] + w < next[v]) {
                next[v] = dist[u] + w;
            }
        }
        dist = next;
    }
    for (int[] e : edges) if (dist[e[0]] != INF &&
        dist[e[0]] + e[2] < dist[e[1]]) {
        throw new IllegalArgumentException("Reachable negative cycle");
    }
    return dist;
}`},
floyd:{name:'Floyd–Warshall · all-pairs distances',key:'floyd',time:'O(V³)',space:'O(V²)',directed:true,edges:'0>1:4, 0>2:9, 1>2:2, 2>3:1, 3>4:3, 4>5:2',code:`// Initialize dist[i][i] = 0; other pairs INF.
// Each edge initializes dist[u][v] to its smallest edge weight.
void floydWarshall(long[][] dist, long INF) {
    int n = dist.length;
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] == INF || dist[k][j] == INF) continue;
                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }
    // Any dist[i][i] < 0 indicates a negative cycle.
}`},
bipartite:{name:'Bipartite check · two-coloring',key:'coloring',time:'O(V + E)',space:'O(V)',directed:false,edges:'0>1, 0>3, 1>2, 2>3, 4>5',code:`boolean bipartite(List<List<int[]>> adj) {
    int[] color = new int[adj.size()]; Arrays.fill(color, -1);
    Queue<Integer> q = new ArrayDeque<>();
    for (int start = 0; start < adj.size(); start++) {
        if (color[start] != -1) continue;
        color[start] = 0; q.add(start);
        while (!q.isEmpty()) {
            int u = q.remove();
            for (int[] e : adj.get(u)) {
                int v = e[0];
                if (color[v] == -1) { color[v] = 1 - color[u]; q.add(v); }
                else if (color[v] == color[u]) return false;
            }
        }
    }
    return true;
}`}};
function graphTrace(id,n,edges,source,directed){const def=graphAlgorithms[id],out=[],adj=Array.from({length:n},()=>[]);edges.forEach(([u,v,w])=>{adj[u].push([v,w]);if(!directed)adj[v].push([u,w])});let seen=[],front=[],active=-1,edge=null,dist=Array(n).fill(Infinity),parent=Array.from({length:n},(_,i)=>i),matrix=null,accepted=[];const add=(needle,msg,vars={})=>out.push({line:Math.max(0,def.code.split('\n').findIndex(l=>l.includes(needle))),msg,vars:Object.fromEntries(Object.entries(vars).filter(([key])=>id!=='dsu'||key!=='cost')),seen:[...seen],front:[...front],active,edge:edge?[...edge]:null,dist:[...dist],parent:[...parent],matrix:matrix?.map(r=>[...r]),accepted:accepted.map(e=>[...e])});add('',`Build ${directed?'directed':'undirected'} adjacency lists. Vertices are 0 through ${n-1}.`,{V:n,E:edges.length,source});
if(id==='bfs'){dist[source]=0;seen.push(source);front.push(source);add('dist[source]','Mark source on enqueue; its edge distance is zero.',{source,distance:0});while(front.length){active=front.shift();add('int u = q.remove()',`Dequeue ${active}. Explore its neighbors.`,{u:active,queue:front.length});for(let [v]of adj[active]){edge=[active,v];if(dist[v]!==Infinity){add('continue',`${v} was already discovered. Skip the edge to prevent revisiting.`,{u:active,v});continue}dist[v]=dist[active]+1;seen.push(v);front.push(v);add('dist[v] =',`Discover ${v}: distance = ${dist[active]} + 1 = ${dist[v]}. Mark and enqueue.`,{u:active,v,distance:dist[v]})}}add('return dist',`BFS complete. Unreachable vertices remain ∞ in the diagram (the Java method returns -1 for them).`,{reached:seen.length,V:n})}
if(id==='dfs'){const visit=u=>{active=u;front.push(u);seen.push(u);add('seen[u]',`Enter dfs(${u}). Mark before exploring; call stack = [${front}].`,{u,depth:front.length});for(let [v]of adj[u]){edge=[u,v];active=u;if(!seen.includes(v)){add('dfs(v',`Follow ${u} → ${v}. Suspend ${u}'s call while the child explores.`,{u,v});visit(v)}else add('if (!seen',`Skip ${v}; it is already visited. Cycles cannot recurse forever.`,{u,v})}active=u;front.pop();add('Return',`Return from ${u}. Resume ${front.length?front.at(-1):'the caller outside DFS'}.`,{u,depth:front.length})};visit(source);add('Return',`Reachability from ${source}: [${seen}]. Unreachable vertices need another start if counting components.`,{reached:seen.length})}
if(id==='topo'){const ind=Array(n).fill(0);edges.forEach(([u,v])=>ind[v]++);dist=[...ind];front=ind.flatMap((v,i)=>v===0?[i]:[]);add('for (int u',`Indegrees: [${ind}]. Enqueue every vertex with no remaining prerequisites.`,{ready:front.length});while(front.length){active=front.shift();seen.push(active);add('order.add',`Process ${active}; append it to the order.`,{u:active,processed:seen.length});for(let [v]of adj[active]){edge=[active,v];ind[v]--;dist=[...ind];if(ind[v]===0)front.push(v);add('--in[v]',`Remove dependency ${active} → ${v}; indegree[${v}] becomes ${ind[v]}.${ind[v]===0?' Enqueue it.':''}`,{u:active,v,indegree:ind[v]})}}add('return order',seen.length===n?`Valid order: [${seen}]. Every dependency points forward.`:`Only ${seen.length}/${n} vertices processed. A directed cycle blocks the remaining vertices.`,{processed:seen.length,cycle:seen.length<n?'yes':'no'})}
if(id==='dijkstra'){dist[source]=0;let pq=[[0,source]];front=[`${source}:0`];add('dist[source]','Initialize source at distance 0; put it in the min-priority queue.',{source});while(pq.length){pq.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);let [d,u]=pq.shift();active=u;front=pq.map(([w,v])=>`${v}:${w}`);if(d!==dist[u]){add('if (d !=',`Discard stale entry (${u}, ${d}); a better distance ${dist[u]} is known.`,{u,entry:d,best:dist[u]});continue}seen.push(u);add('long d =',`Settle ${u} at the smallest distance ${d}.`,{u,d});for(let [v,w]of adj[u]){edge=[u,v];let candidate=d+w;if(candidate<dist[v]){dist[v]=candidate;pq.push([candidate,v]);front=[...pq].sort((a,b)=>a[0]-b[0]).map(([x,j])=>`${j}:${x}`);add('dist[v] =',`Relax ${u} → ${v}: ${d} + ${w} = ${candidate} improves dist[${v}].`,{u,v,candidate})}else add('if (d +',`Route via ${u} costs ${candidate}; no improvement over ${dist[v]}.`,{u,v,candidate})}}add('return dist','Heap empty. Finite distances are shortest costs; ∞ means unreachable.',{settled:seen.length})}
if(id==='dsu'||id==='kruskal'){const size=Array(n).fill(1),find=x=>{while(parent[x]!==x){parent[x]=parent[parent[x]];x=parent[x]}return x};let components=n,cost=0;let sorted=id==='kruskal'?[...edges].sort((a,b)=>a[2]-b[2]):edges;for(let [u,v,w]of sorted){edge=[u,v];active=u;let a=find(u),b=find(v);add(id==='dsu'?'int a =':'if (union',`Inspect ${u} — ${v}${id==='kruskal'?` (weight ${w})`:''}. Roots are ${a} and ${b}.`,{rootU:a,rootV:b,components,cost});if(a===b){add(id==='dsu'?'return false':'if (union','Same root. This edge creates a cycle; skip it.',{components,cost});continue}if(size[a]<size[b])[a,b]=[b,a];parent[b]=a;size[a]+=size[b];components--;cost+=w;accepted.push([u,v]);seen=[...new Set(accepted.flat())];add(id==='dsu'?'parent[b]':'cost +=',`Union root ${b} into root ${a}. Components = ${components}${id==='kruskal'?`; accepted cost = ${cost}`:''}.`,{root:a,components,cost})}add(id==='dsu'?'components--':'return cost',id==='dsu'?`${components} connected components remain.`:components===1?`MST complete: ${n-1} accepted edges, total cost ${cost}.`:`Disconnected: minimum spanning forest costs ${cost}; no single MST exists.`,{components,cost,used:accepted.length})}
if(id==='bellman'){dist[source]=0;const all=directed?edges:edges.flatMap(([u,v,w])=>[[u,v,w],[v,u,w]]);for(let pass=1;pass<n;pass++){let old=[...dist],next=[...dist];front=[];add('long[] next',`Pass ${pass}: read distances from the previous pass. Paths may use at most ${pass} edges.`,{pass});for(let [u,v,w]of all){edge=[u,v];active=u;if(old[u]!==Infinity&&old[u]+w<next[v]){next[v]=old[u]+w;dist=[...next];seen=[...new Set([...seen,u,v])];add('next[v] =',`Improve ${v} via ${u}: ${old[u]} + (${w}) = ${next[v]}.`,{pass,u,v,cost:next[v]})}}dist=next;add('dist = next',`Finish pass ${pass}: [${dist.map(x=>x===Infinity?'∞':x)}].`,{pass})}const negative=all.some(([u,v,w])=>dist[u]!==Infinity&&dist[u]+w<dist[v]);add(negative?'throw new':'return dist',negative?'A further reachable improvement exists: a reachable negative cycle makes shortest distances undefined.':'No further reachable improvement. Shortest distances are finite wherever reachable.',{negativeCycle:negative?'yes':'no'})}
if(id==='floyd'){matrix=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?0:Infinity));edges.forEach(([u,v,w])=>{matrix[u][v]=Math.min(matrix[u][v],w);if(!directed)matrix[v][u]=Math.min(matrix[v][u],w)});add('Initialize','Initialize diagonal to zero, direct edges to their minimum weights, other pairs to ∞.',{V:n});for(let k=0;k<n;k++){active=k;add('int k =',`Allow vertex ${k} as an intermediate point.`,{k});for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(matrix[i][k]!==Infinity&&matrix[k][j]!==Infinity&&matrix[i][k]+matrix[k][j]<matrix[i][j]){matrix[i][j]=matrix[i][k]+matrix[k][j];edge=[i,j];add('Math.min',`Improve dist[${i}][${j}] through ${k}: now ${matrix[i][j]}.`,{i,j,k,cost:matrix[i][j]})}}const neg=matrix.some((r,i)=>r[i]<0);add('Any dist',neg?'A negative diagonal reveals a negative cycle. Some route costs are undefined.':'All pairs computed. Read row i, column j for shortest cost i → j.',{negativeCycle:neg?'yes':'no'})}
if(id==='bipartite'){dist=Array(n).fill(-1);for(let start=0;start<n;start++){if(dist[start]!==-1)continue;dist[start]=0;front=[start];seen.push(start);add('color[start]',`Start component at ${start} with color 0.`,{start});while(front.length){active=front.shift();for(let [v]of adj[active]){edge=[active,v];if(dist[v]===-1){dist[v]=1-dist[active];seen.push(v);front.push(v);add('color[v] =',`Color ${v} as ${dist[v]}, opposite to ${active}'s ${dist[active]}.`,{u:active,v,color:dist[v]})}else if(dist[v]===dist[active]){add('return false',`Conflict: ${active} and ${v} share color ${dist[v]}. The graph is not bipartite.`,{result:'false'});return out}else add('else if','Existing neighbor has the opposite color. This edge is valid.',{u:active,v})}}}add('return true','Every component is two-colored without conflict. The graph is bipartite.',{result:'true'})}return out}

const stringAlgorithms={
unique:{name:'Longest unique substring',key:'lastseen',input:'abba',other:'',kind:'text',time:'O(n)',space:'O(alphabet)',code:`int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> last = new HashMap<>();
    int left = 0, best = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (last.containsKey(c)) {
            left = Math.max(left, last.get(c) + 1);
        }
        last.put(c, right);
        best = Math.max(best, right - left + 1);
    }
    return best;
}`},
anagram:{name:'Anagram · frequency balance',key:'frequency',input:'aab',other:'abb',kind:'pair',time:'O(n + m)',space:'O(alphabet)',code:`boolean isAnagram(String a, String b) {
    if (a.length() != b.length()) return false;
    Map<Character, Integer> count = new HashMap<>();
    for (char c : a.toCharArray()) {
        count.put(c, count.getOrDefault(c, 0) + 1);
    }
    for (char c : b.toCharArray()) {
        count.put(c, count.getOrDefault(c, 0) - 1);
    }
    for (int value : count.values()) if (value != 0) return false;
    return true;
}`},
groups:{name:'Group anagrams · map of lists',key:'signature',input:'cat, tac, dog, god, act',other:'',kind:'words',time:'O(total word sorting)',space:'O(total characters)',code:`List<List<String>> groupAnagrams(String[] words) {
    Map<String, List<String>> groups = new LinkedHashMap<>();
    for (String word : words) {
        char[] chars = word.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);
        groups.computeIfAbsent(key, ignored -> new ArrayList<>());
        groups.get(key).add(word);
    }
    return new ArrayList<>(groups.values());
}`},
prefix:{name:'Subarray sum · prefix-frequency map',key:'prefixmap',input:'1, -1, 0',other:'0',kind:'numbers',time:'O(n) average',space:'O(n)',code:`int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    freq.put(0, 1);
    int prefix = 0, answer = 0;
    for (int value : nums) {
        prefix += value;
        answer += freq.getOrDefault(prefix - k, 0);
        freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);
    }
    return answer;
}`},
minimum:{name:'Minimum covering substring',key:'minwindow',input:'ADOBECODEBANC',other:'ABC',kind:'pair',time:'O(n + m) average',space:'O(alphabet)',code:`String minWindow(String s, String t) {
    if (t.isEmpty()) return "";
    Map<Character, Integer> need = new HashMap<>();
    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);
    int missing = t.length(), left = 0, start = 0, best = Integer.MAX_VALUE;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (need.getOrDefault(c, 0) > 0) missing--;
        need.put(c, need.getOrDefault(c, 0) - 1);
        while (missing == 0) {
            if (right - left + 1 < best) { start = left; best = right - left + 1; }
            char outgoing = s.charAt(left++);
            need.put(outgoing, need.getOrDefault(outgoing, 0) + 1);
            if (need.get(outgoing) > 0) missing++;
        }
    }
    return best == Integer.MAX_VALUE ? "" : s.substring(start, start + best);
}`},
palindrome:{name:'Palindrome · expand both centers',key:'expand',input:'cabbad',other:'',kind:'text',time:'O(n²)',space:'O(1)',code:`String longestPalindrome(String s) {
    int start = 0, best = 0;
    for (int center = 0; center < s.length(); center++) {
        for (int parity = 0; parity < 2; parity++) {
            int left = center, right = center + parity;
            while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
                if (right - left + 1 > best) { start = left; best = right - left + 1; }
                left--; right++;
            }
        }
    }
    return s.substring(start, start + best);
}`},
kmp:{name:'KMP · reuse matching prefixes',key:'kmp',input:'ababcabcabababd',other:'ababd',kind:'pair',time:'O(n + m)',space:'O(m)',code:`int kmp(String text, String pattern) {
    if (pattern.isEmpty()) return 0;
    int[] lps = new int[pattern.length()];
    for (int i = 1, len = 0; i < pattern.length();) {
        if (pattern.charAt(i) == pattern.charAt(len)) lps[i++] = ++len;
        else if (len > 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
    for (int i = 0, j = 0; i < text.length();) {
        if (text.charAt(i) == pattern.charAt(j)) {
            i++; j++;
            if (j == pattern.length()) return i - j;
        } else if (j > 0) j = lps[j - 1];
        else i++;
    }
    return -1;
}`}};
function stringTrace(id,input,other){const def=stringAlgorithms[id],out=[];let items=id==='prefix'?input.split(',').map(Number):id==='groups'?input.split(',').map(x=>x.trim()).filter(Boolean):input.split(''),l=-1,r=-1,map=new Map(),extra='',vars={};const add=(needle,msg)=>out.push({line:Math.max(0,def.code.split('\n').findIndex(x=>x.includes(needle))),msg,items:[...items],l,r,map:[...map].map(([k,v])=>[k,Array.isArray(v)?[...v]:v]),extra,vars:{...vars}});add('',`Read the contract first: ${guides[def.key].cue}`);
if(id==='unique'){let left=0,best=0;for(let right=0;right<input.length;right++){let c=input[right];l=left;r=right;vars={left,right,char:c,best};add('char c','Read the incoming character and check the last-seen map.');if(map.has(c)){let previous=map.get(c),old=left;left=Math.max(left,previous+1);l=left;vars={left,right,previous,best};add('Math.max(left',`'${c}' was last at ${previous}. left = max(${old}, ${previous+1}) = ${left}. Never move left backward.`)}map.set(c,right);add('last.put',`Record last['${c}'] = ${right}. This map stores indices, not counts.`);best=Math.max(best,right-left+1);vars={left,right,length:right-left+1,best};add('best = Math.max',`Valid window '${input.slice(left,right+1)}' has length ${right-left+1}. Best = ${best}.`)}vars={result:best};add('return best',`Longest unique substring length = ${best}. Test abba to remember why max is essential.`)}
if(id==='anagram'){if(input.length!==other.length){vars={lengthA:input.length,lengthB:other.length,result:'false'};add('return false','Different lengths cannot be anagrams.');return out}for(let i=0;i<input.length;i++){r=i;l=i;let c=input[i];map.set(c,(map.get(c)||0)+1);vars={phase:'add',char:c,count:map.get(c)};add(' + 1',`Add '${c}' from the first string; balance = ${map.get(c)}.`)}items=other.split('');for(let i=0;i<other.length;i++){r=i;l=i;let c=other[i];map.set(c,(map.get(c)||0)-1);vars={phase:'subtract',char:c,balance:map.get(c)};add(' - 1',`Subtract '${c}' from the second string. A final nonzero balance proves a mismatch.`)}let ok=[...map.values()].every(v=>v===0);vars={result:String(ok)};add(ok?'return true':'value != 0',ok?'All balances are zero: the strings have identical multiplicities.':'A balance is nonzero. Matching letters in a set is not enough; duplicates matter.')}
if(id==='groups'){items=input.split(',').map(x=>x.trim()).filter(Boolean);for(let i=0;i<items.length;i++){let word=items[i],key=word.split('').sort().join('');l=r=i;vars={word,key,groups:map.size};extra=`Canonical key: ${key}`;add('String key',`Sort '${word}' to signature '${key}'. All anagrams share this key.`);if(!map.has(key)){map.set(key,[]);add('computeIfAbsent',`Create a new list for signature '${key}'.`)}map.get(key).push(word);vars={word,key,groups:map.size};add('groups.get(key)',`Append '${word}' to groups['${key}']. The map values are lists, not single words.`)}vars={groups:map.size};add('return new',`Grouping complete: ${JSON.stringify([...map.values()])}.`)}
if(id==='prefix'){items=input.split(',').map(Number);let prefix=0,answer=0,k=Number(other);map.set(0,1);vars={prefix,answer,k};add('freq.put(0',`Seed 0 → 1 for the empty prefix. This counts valid subarrays starting at index 0.`);for(let i=0;i<items.length;i++){r=i;l=0;prefix+=items[i];vars={i,prefix,need:prefix-k,answer};add('prefix +=',`Add ${items[i]}; prefix becomes ${prefix}. We need an earlier prefix ${prefix-k}.`);let matches=map.get(prefix-k)||0;answer+=matches;vars={i,prefix,matches,answer};add('answer +=',`Query BEFORE insertion: ${matches} earlier prefix(es) match. Total valid subarrays = ${answer}.`);map.set(prefix,(map.get(prefix)||0)+1);add('freq.put(prefix',`Record prefix ${prefix}: its frequency is now ${map.get(prefix)}.`)}vars={result:answer};add('return answer',`There are ${answer} subarrays summing to ${k}. Repeated prefix sums contribute multiple answers.`)}
if(id==='minimum'){if(!other.length){vars={result:'""'};add('t.isEmpty','Empty target returns an empty string.');return out}for(let c of other)map.set(c,(map.get(c)||0)+1);let missing=other.length,left=0,best=Infinity,start=0;extra='Map = remaining balance; negative means surplus';vars={missing,left,best:'—'};add('need.merge',`Build demand counts for '${other}'. missing counts required character instances, including duplicates.`);for(let right=0;right<input.length;right++){let c=input[right];if((map.get(c)||0)>0)missing--;map.set(c,(map.get(c)||0)-1);l=left;r=right;vars={left,right,missing,best:best===Infinity?'—':best};add('need.put(c',`Add '${c}'; remaining balance becomes ${map.get(c)}. missing = ${missing}.`);while(missing===0){if(right-left+1<best){best=right-left+1;start=left}vars={left,right,missing,best};add('right - left + 1 < best',`Window '${input.slice(left,right+1)}' covers the target. Save the shortest, then try shrinking.`);let outgoing=input[left++];map.set(outgoing,(map.get(outgoing)||0)+1);if(map.get(outgoing)>0)missing++;l=left;vars={left,right,missing,best};add('need.get(outgoing)',`Remove '${outgoing}'; balance = ${map.get(outgoing)}.${missing?' Coverage breaks; expand again.':' Still valid; keep shrinking.'}`)}}vars={result:best===Infinity?'""':input.slice(start,start+best)};add('return best',`Minimum covering substring: '${best===Infinity?'':input.slice(start,start+best)}'.`)}
if(id==='palindrome'){let start=0,best=0;for(let c=0;c<input.length;c++)for(let parity=0;parity<2;parity++){let left=c,right=c+parity;l=left;r=right;vars={center:c,type:parity?'even':'odd',best};add('int left =',`Try ${parity?'even center between':'odd center at'} ${c}${parity?' and '+(c+1):''}.`);while(left>=0&&right<input.length&&input[left]===input[right]){l=left;r=right;if(right-left+1>best){start=left;best=right-left+1}vars={left,right,length:right-left+1,best};add('right - left + 1 > best',`'${input.slice(left,right+1)}' is symmetric. Save if longer, then expand outward.`);left--;right++}}l=start;r=start+best-1;vars={result:input.slice(start,start+best)};add('return s.substring',`Longest palindrome: '${input.slice(start,start+best)}'. Empty input returns ''.`)}
if(id==='kmp'){if(!other.length){vars={result:0};add('pattern.isEmpty','Empty pattern matches at index 0.');return out}const lps=Array(other.length).fill(0);let i=1,len=0;extra=`Pattern: ${other} · LPS: [${lps}]`;while(i<other.length){vars={phase:'LPS',i,len};if(other[i]===other[len]){lps[i]=++len;i++;extra=`Pattern: ${other} · LPS: [${lps}]`;add('lps[i++] = ++len',`Matching prefix/suffix: store length ${len} at LPS index ${i-1}.`)}else if(len>0){len=lps[len-1];add('len = lps',`Mismatch. Fall back to shorter reusable prefix length ${len}; keep i.`)}else{lps[i++]=0;extra=`Pattern: ${other} · LPS: [${lps}]`;add('else lps','No reusable prefix here; set LPS to zero and advance.')}}i=0;let j=0;while(i<input.length){l=i-j;r=i;vars={phase:'search',i,j,matched:j};if(input[i]===other[j]){add('if (text.charAt',`'${input[i]}' matches pattern[${j}]. Advance both indices.`);i++;j++;if(j===other.length){vars={result:i-j};add('return i - j',`Full pattern matched at index ${i-j}.`);return out}}else if(j>0){j=lps[j-1];vars={i,j};add('j = lps',`Mismatch at text[${i}]. Reuse prefix length ${j}; do not advance i.`)}else{add('else i++',`No matched prefix. Advance text index from ${i} to ${i+1}.`);i++}}vars={result:-1};add('return -1','Text exhausted without a full match. Return -1.')}return out}

// Each guide is original teaching text: recognize → state → invariant → counterexample.
const guideRows={
complement:['Complement lookup','A pair adds to a target in unsorted input.','Map value → previous index; look up target − current before insertion.','Remember what is missing, not every possible pair.','Insert first and one element can match itself.'],
frequency:['Frequency counting','Multiplicity matters: duplicates, anagrams, or supply versus demand.','Map item → count; update with getOrDefault(key, 0).','Same set is not the same multiset.','Use counts, not membership alone; aab and abb expose the mistake.'],
signature:['Canonical signatures','Group objects that differ in presentation but share an identity.','Convert each object to a stable key; map the key to its group.','Different appearance, same signature.','Java arrays do not use content equality as HashMap keys; use a string key or a proper value type.'],
heap:['Heap / top K','Repeatedly select an extreme, or retain the best K items.','A size-K min-heap retains the largest K; its root is the weakest retained item.','Keep the boundary candidate at the root.','Sorting may be simpler for one static query. A heap is not a fully sorted array.'],
prefix:['Prefix / suffix aggregation','Many range queries or contributions before and after each position.','prefix[i + 1] stores the aggregate of elements before i + 1.','A range sum is a difference of two histories.','Sum uses subtraction; products with zeros need separate reasoning.'],
hashset:['HashSet membership','Existence, deduplication, or a visited identity matters.','Store values already observed or all values needed for O(1) average membership.','Need yes/no? Use a set. Need how many? Use a map.','A set loses frequency and does not preserve sorted order.'],
prefixmap:['Prefix sum + HashMap','Count subarrays with a target sum, including negatives.','Before insertion, frequency[prefix − target] counts valid earlier boundaries. Seed 0 → 1.','Query the old history, then record today.','Negatives break sum-based sliding-window monotonicity. Repeated prefix sums require counts.'],
indexmark:['Index placement / marking','Values are constrained to a small index-related range.','Move or mark each value at its expected slot; handle duplicates before swapping.','A value can tell you its own address.','Only valid under the stated range; mutation may be forbidden.'],
vote:['Boyer–Moore voting','Find a majority under a frequency guarantee.','Cancel different candidates in pairs; verify the survivor if a majority is not guaranteed.','Opponents cancel; the majority survives.','A candidate is not proof of majority without the problem guarantee or a second pass.'],
bijection:['Two-way mapping','One symbol must consistently correspond to exactly one other symbol.','Maintain forward and reverse maps; both directions must agree.','One to one needs two checks.','Checking only forward allows two source symbols to map to the same target.'],
design:['Data structure design','Operations have explicit time and behavior requirements.','List each operation, choose internal structures, and state synchronization invariants.','Design from operations, then maintain the contract.','A single HashMap cannot maintain LRU order; pair it with a linked list.'],
expand:['Expand around center','Contiguous palindrome or symmetric range.','A matching pair expands a valid center; test odd and even centers.','Center first, grow outward.','This handles substrings, not arbitrary subsequences.'],
palindrome:['Opposite-end character pointers','Symmetry, reversals, or a palindrome with limited edits.','Normalize or skip characters as specified, then compare both ends.','Compare mirrors, shrink the gap.','A deletion variant branches once; it is not the same as skipping every mismatch.'],
text:['String parsing / simulation','Transformation rules, tokens, carry, or state transitions.','Define an explicit state and consume input without losing character boundaries.','Read → interpret → advance.','In Java String is immutable; use StringBuilder. Check char, code point, and byte assumptions.'],
kmp:['KMP string matching','Search a pattern without restarting after each mismatch.','LPS gives the longest proper prefix that is also a suffix; fall back through LPS links.','Reuse the prefix you already matched.','A mismatch changes the pattern index, not always the text index.'],
bits:['Bit operations','Bit counts, parity, toggles, or unique values under repetition rules.','XOR cancels identical pairs; shifts and masks isolate relevant bits.','Equal bits cancel under XOR.','Java uses signed ints; use >>> for unsigned shifts and know the width.'],
twopointer:['Two pointers','Sorted pair sums, merging, compaction, or opposite boundaries.','Each movement must safely rule out candidates or grow a processed prefix.','Move only when you can prove what you discard.','Sorted-pair logic does not apply unchanged to unsorted arrays.'],
codec:['Encode / decode boundaries','Serialize data so it can be reconstructed without ambiguity.','Encode lengths or null markers; decoding must consume exactly the encoded structure.','A delimiter is data unless you escape it.','Concatenating strings loses boundaries when values contain the delimiter.'],
trie:['Trie / prefix tree','Many prefix lookups or character-by-character dictionary exploration.','A root-to-node path represents one prefix; end flags distinguish complete words.','Shared prefixes share work.','A HashSet may be enough for exact membership; a trie costs more memory.'],
worddp:['Segmentation / decoding DP','Build a valid string prefix using legal words or tokens.','dp[i] represents feasibility or count for the first i characters.','Choose the final token; ask about the prefix before it.','Greedily choosing the longest token can block a valid later segmentation.'],
seqdp:['Sequence DP','Subsequence, alignment, edits, or relationships between two prefixes.','State indices define processed prefixes; transitions account for matching, skipping, or editing.','Write what dp[i][j] means before the recurrence.','Substring requires contiguity; subsequence permits skipped positions.'],
partition:['Partitioning / boundaries','Separate categories or locate a pivot for ordering.','Maintain explicitly labeled regions: processed low, unknown, processed high.','Know what each region means.','Swapping from the unknown end may require rechecking the same index.'],
lastseen:['Last-seen sliding window','Longest substring with no repeated characters.','left never moves backward; left = max(left, previousIndex + 1).','The window starts after the latest conflict.','abba breaks left = previous + 1 without max.'],
window:['Variable sliding window','A contiguous range with a constraint repairable by removing from the left.','Expand right, shrink while invalid, then update the answer for a valid window.','Grow to discover; shrink to restore.','Not every longest/shortest problem is a window; check monotonicity and whether shrinking helps.'],
minwindow:['Minimum covering window','Smallest substring satisfying a target frequency requirement.','After all required counts are met, save and shrink until coverage fails.','Become valid, then squeeze.','Distinct character counts alone ignore duplicates in the target.'],
anagramwindow:['Fixed-size anagram window','Find a permutation of a pattern as a substring.','Window length equals pattern length and character-count balance is zero.','Same length, same counts.','This differs from minimum-covering or longest-unique windows.'],
deque:['Monotonic deque','An extreme for each moving window.','Store indices in value order and expire indices outside the left boundary.','Dominated values leave the back; expired values leave the front.','A stack cannot expire the oldest index efficiently.'],
exactk:['Exactly K via at-most','Count subarrays with exactly K distinct items or violations.','Exactly(K) = AtMost(K) − AtMost(K − 1), when an at-most window count is valid.','Subtract the extra freedom.','At-most counting adds right − left + 1, not just one for each right endpoint.'],
fixedwindow:['Fixed-size window','A contiguous block of an exact length.','Add incoming contribution and subtract outgoing contribution.','One in, one out.','Record an answer only after the window reaches the required length.'],
binary:['Binary search','Sorted values or a monotonic decision.','Keep every possible answer inside the live bounds; eliminate mid after a failed equality check.','Half the space, keep the answer.','Use consistent inclusive or half-open bounds; mixed conventions cause off-by-one loops.'],
answersearch:['Binary search on answer','Minimize a maximum or find the smallest feasible capacity/rate.','Prove feasibility is monotonic, define safe bounds, and implement a check function.','Search the answer, not the array.','A vague optimization goal is not enough; feasibility must change only once.'],
rotated:['Rotated-array search','An originally sorted array has one rotation boundary.','Identify which half is sorted, then test whether the target lies inside that half.','One side still tells the truth.','Equal endpoint values can make the sorted side ambiguous and degrade complexity.'],
bounds:['Lower / upper bounds','First valid position, last occurrence, insertion, or partition boundary.','Lower bound finds first ≥ target; upper bound finds first > target.','Find the first true.','Returning any equal index is not the same as finding the first equal index.'],
stack:['Stack simulation','Nested scopes, expressions, undo, or unresolved opening symbols.','The stack holds the state needed to finish the most recently opened task.','Last opened, first finished.','A queue preserves arrival order and cannot represent nested scope in the same way.'],
monostack:['Monotonic stack','Next greater/smaller or nearest boundary.','Keep unresolved indices in value order; resolve when a dominating value arrives.','Wait until the first value that answers you.','Strict versus non-strict comparison changes how equal values behave.'],
list:['Linked-list rewiring','Reverse, splice, merge, or delete nodes.','Save the next pointer before modifying a link; a dummy head simplifies boundary cases.','Save next before you cut.','Changing node values is not equivalent to changing links when identity matters.'],
fastslow:['Fast / slow pointers','Cycle, midpoint, or a fixed gap from the end.','Choose a speed or gap invariant; protect null accesses before advancing.','Speed finds cycles; gap finds distance from the end.','For cycle entry, reset one pointer after meeting and move both one step.'],
mergesort:['Merge sort','Stable O(n log n) comparison sorting or linked-list sorting.','Split, recursively sort halves, then merge sorted outputs.','Small sorted pieces become one sorted whole.','Arrays need merge storage; linked lists can merge by rewiring.'],
treedfs:['Tree DFS / return values','A subtree answer builds its parent answer.','Define the return contract, null base case, and how children combine.','What does this subtree promise its parent?','The value returned upward can differ from the global best, as in maximum path sum.'],
treebfs:['Tree BFS / levels','Level order, breadth, nearest depth, or side views.','Capture the queue size before consuming a level and adding its children.','Freeze this level before discovering the next.','This tree lab is not graph BFS; arbitrary graphs need visited identities.'],
bst:['BST ordering','Ordered tree lookup, validation, rank, or predecessor.','Inorder is sorted; validation needs all ancestor bounds, not only children.','Carry the bounds down the tree.','Duplicate rules depend on the problem.'],
griddfs:['Grid flood-fill / DFS','Connected regions, islands, or boundary reachability.','Visit a cell once; explore only legal neighbors with the same qualifying property.','One start floods one component.','Recursion depth can overflow on large grids; use an explicit stack when needed.'],
graphdfs:['Graph DFS','Reachability, components, or deep exploration.','Mark each vertex before expanding neighbors so cycles do not revisit it.','Mark first, then explore.','Visited alone does not detect a directed cycle; track the active recursion path too.'],
topo:['Topological sort / Kahn','Directed prerequisites, task ordering, or DAG processing.','Indegree counts unfinished dependencies; process zero-indegree vertices and decrement outgoing neighbors.','No prerequisites left? You can go next.','Only DAGs have a topological order. processed < V signals a directed cycle.'],
dsu:['Disjoint Set Union','Dynamic connectivity, merging groups, or redundant undirected edges.','Each root identifies one component; use path compression and union by size/rank.','Different roots? Merge. Same root? Already connected.','DSU does not retain a route, and cannot handle arbitrary edge deletion by itself.'],
graphbfs:['Graph BFS','Fewest edges or shortest paths with equal edge costs.','Mark when enqueuing; FIFO expands vertices in nondecreasing edge distance.','FIFO turns layers into distance.','Weighted shortest paths need another algorithm when weights differ.'],
multibfs:['Multi-source BFS','Nearest of many sources or simultaneous spreading.','Seed all sources with distance zero; expand one shared queue.','All sources start together.','Running a separate BFS from each source repeats work.'],
coloring:['Bipartite coloring','Can vertices be split into two groups across every edge?','Color each unvisited component and require every neighbor to have the opposite color.','Every edge crosses colors.','Check disconnected components and self-loops; an odd cycle is a conflict.'],
mst:['Minimum spanning tree','Connect every vertex with minimum total undirected edge cost.','Kruskal sorts edges and accepts those joining different DSU components.','Take the cheapest safe bridge between groups.','An MST is not a shortest-path tree. Disconnected input yields a forest, not one spanning tree.'],
dijkstra:['Dijkstra','Single-source shortest paths with nonnegative weighted edges.','Pop the smallest tentative distance; skip stale heap entries and relax outgoing edges.','The nearest unsettled vertex settles safely.','Negative weights break the greedy proof. Flight-stop constraints need extra state or bounded relaxation.'],
bellman:['Bellman–Ford','Negative weighted edges, negative-cycle checks, or bounded-edge routes.','Relax all edges V − 1 rounds; an additional reachable improvement reveals a negative cycle.','A round extends the path budget.','For a strict edge limit, read from the previous round and write into a fresh copy.'],
floyd:['Floyd–Warshall','All-pairs shortest paths on a small dense graph.','For each intermediate k, improve dist[i][j] through i → k → j.','Allow one more intermediate vertex.','O(V³) is costly for large sparse graphs; guard infinity before addition.'],
bridges:['Tarjan bridges / low-link','Find undirected edges whose removal disconnects a component.','Maintain discovery time and lowest reachable ancestor; low[child] > tin[parent] marks a bridge.','Can the child get back without this edge?','Use edge IDs for parallel edges; skipping every parent-valued neighbor is wrong for a multigraph.'],
euler:['Eulerian traversal / Hierholzer','Use every edge exactly once.','Consume edges during DFS and append vertices on return, then reverse the result.','Edges leave once; vertices finish on the way back.','Hamiltonian paths visit vertices once and are a different problem.'],
twoheap:['Two heaps / running median','Maintain a dynamic middle rather than an extreme.','Lower max-heap and upper min-heap have ordered roots and balanced sizes.','Split around the middle, balance the halves.','Window deletion needs lazy deletion or an indexed structure.'],
mergeheap:['K-way merge','Several sorted streams need one combined order.','Keep one current head per stream; replace the popped head with its successor.','Only the front of each stream can win next.','Putting all values in the heap wastes the already-sorted structure.'],
backtrack:['Backtracking / choice tree','Enumerate combinations, permutations, or valid configurations.','Choose, recurse, and undo; prune only when a branch cannot lead to a valid result.','Try a choice, return the state.','Copy the completed path before storing it; shared mutable lists otherwise change every answer.'],
gridbacktrack:['Path backtracking','Explore paths with no cell reuse in the current route.','Mark on entry and undo on exit; this is path-local visited state.','Blocked for this path, available for the next.','Global visited is correct for flood-fill, but often wrong for enumerating different paths.'],
lineardp:['1D dynamic programming','A prefix decision depends on earlier solved prefixes.','Define dp[i] as a precise answer, base cases, and legal final choices.','Name the state before writing the transition.','Different meanings of dp[i] need different recurrences; avoid memorizing unexplained formulas.'],
treedp:['Tree DP','Each subtree needs multiple states, such as take or skip.','Return a tuple of states; combine children under the parent constraint.','Take and skip are different promises.','Choosing a node can forbid its children without forbidding its grandchildren.'],
knapsack:['Knapsack / amount DP','Choose items or coins under a target/weight constraint.','State uses amount or capacity; loop direction controls whether an item can be reused.','Backward for one-use, forward for reuse.','Counting combinations and counting permutations require different outer-loop order.'],
kadane:['Kadane / ending-here state','Best contiguous sum or product.','Choose between starting fresh and extending the prior range; track a global best separately.','End here first; best anywhere second.','Product variants need both min and max because negatives flip signs.'],
griddp:['Grid DP','Count or optimize paths under constrained movement.','Each cell combines only legal predecessor states; obstacles are unreachable.','A cell inherits from where you can arrive.','Unrestricted cycles require graph reasoning rather than simple top-left DP.'],
intervaldp:['Interval DP','A range answer splits at a final operation or pivot.','Solve shorter intervals first and enumerate the partition or last action.','Pick what happens last inside the interval.','The boundary effects must be included in the state; a greedy local split may fail.'],
stockdp:['Stock state DP','Buy/sell with transaction, cooldown, or fee constraints.','Define holding/not-holding states and transaction/time dimensions.','Profit depends on what you are holding.','Updating in place can accidentally permit illegal same-step transitions.'],
greedy:['Greedy with proof','A local choice can be exchanged into an optimal solution.','State the invariant or exchange argument before implementing the choice.','Local choice needs a global reason.','Do not infer greedy merely from “minimum” or “maximum”; coin systems provide counterexamples.'],
intervals:['Intervals / sweep','Overlap, scheduling, merging, or active resource counts.','Sort by the boundary suited to the objective; process starts/ends with explicit tie rules.','Sort by what your decision needs.','Merging uses start order; selecting most nonoverlapping intervals uses earliest finish.'],
matrix:['Matrix coordinates','In-place transforms, traversals, and neighbor simulations.','Keep row/column boundaries or old/new state separately; apply coordinate mapping carefully.','Write the coordinate transform first.','A nonsquare matrix changes dimensions under rotation; in-place rules differ.'],
math:['Math / arithmetic state','Number transformations, exponents, carry, or divisibility.','Derive identities and numeric bounds; use long when intermediate int products overflow.','Prove the formula; respect the range.','Floating point can hide integer boundary errors.']};
const guides=Object.fromEntries(Object.entries(guideRows).map(([key,r])=>[key,{key,name:r[0],cue:r[1],state:r[2],memory:r[3],trap:r[4]}]));
const javaBlueprints={
hash:`Map<Integer, Integer> counts = new HashMap<>();
for (int value : nums) {
    counts.put(value, counts.getOrDefault(value, 0) + 1);
}
// Membership: containsKey(key)
// Missing lookup: getOrDefault(key, defaultValue)
// Grouping: groups.computeIfAbsent(key,
//     ignored -> new ArrayList<>()).add(item);
// Object keys need consistent equals() and hashCode().`,
window:`int left = 0, best = 0;
for (int right = 0; right < input.length(); right++) {
    // Add input.charAt(right) to your state.
    while (/* window is invalid */) {
        // Remove input.charAt(left) from your state.
        left++;
    }
    best = Math.max(best, right - left + 1);
}
// Minimum-covering variants shrink WHILE VALID instead.`,
binary:`int low = 0, high = nums.length;
while (low < high) {
    int mid = low + (high - low) / 2;
    if (nums[mid] >= target) high = mid;
    else low = mid + 1;
}
// low is lower_bound, in [0, nums.length].
// Check bounds before reading nums[low].`,
dfs:`void dfs(int u, List<List<Integer>> adj, boolean[] seen) {
    seen[u] = true;
    for (int v : adj.get(u)) {
        if (!seen[v]) dfs(v, adj, seen);
    }
}
// Start a traversal at EACH unvisited vertex for components.
// Large recursion depth: prefer an explicit Deque stack.`,
bfs:`Queue<Integer> q = new ArrayDeque<>();
q.add(source);
seen[source] = true;
while (!q.isEmpty()) {
    int u = q.remove();
    for (int v : adj.get(u)) {
        if (!seen[v]) {
            seen[v] = true;
            distance[v] = distance[u] + 1;
            q.add(v);
        }
    }
}`,dp:`// First write: dp[i] means ...
// Then decide: base cases, legal previous states, iteration order.
int[] dp = new int[n + 1];
dp[0] = /* base answer */;
for (int i = 1; i <= n; i++) {
    // Combine reachable predecessor states.
    // Counting: add. Minimum: min. Feasibility: OR.
}
// This is a scaffold, not a compilable solution.`,backtrack:`void search(List<Integer> path, List<List<Integer>> out) {
    if (/* complete */) {
        out.add(new ArrayList<>(path));
        return;
    }
    for (/* each legal choice */) {
        path.add(choice);
        search(path, out);
        path.remove(path.size() - 1);
    }
}`,heap:`PriorityQueue<Integer> minHeap = new PriorityQueue<>();
for (int value : nums) {
    minHeap.add(value);
    if (minHeap.size() > k) minHeap.remove();
}
// Requires 1 <= k <= nums.length.
int kthLargest = minHeap.peek();
// Comparator: Integer.compare(a, b), not a - b.`,list:`ListNode previous = null;
ListNode current = head;
while (current != null) {
    ListNode next = current.next;
    current.next = previous;
    previous = current;
    current = next;
}
// previous is the reversed head.`,stack:`Deque<Integer> stack = new ArrayDeque<>();
for (int i = 0; i < nums.length; i++) {
    while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
        int pending = stack.pop();
        // i is the first greater index for pending.
    }
    stack.push(i);
}`,general:`// Translate the contract into state, not memorized syntax.
// 1. What does each variable represent?
// 2. What stays true after an operation?
// 3. What proves each discarded possibility is safe?
// 4. What stops the loop or recursion?
// 5. What are the empty, duplicate, and boundary cases?
// Use the dedicated animation where available.`};
function blueprint(key){
if (typeof graphAlgorithms !== 'undefined') {const algorithm=Object.values(graphAlgorithms).find(a=>a.key===key);if(algorithm)return algorithm.code;}
if (typeof stringAlgorithms !== 'undefined') {const algorithm=Object.values(stringAlgorithms).find(a=>a.key===key);if(algorithm)return algorithm.code;}
if(key==='complement')return `int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int need = target - nums[i];
        if (seen.containsKey(need)) return new int[]{seen.get(need), i};
        seen.put(nums[i], i);
    }
    return new int[]{};
}`;
if(['complement','frequency','signature','prefixmap','bijection','hashset','design'].includes(key))return javaBlueprints.hash;if(['window','lastseen','fixedwindow','minwindow','anagramwindow','exactk','deque'].includes(key))return javaBlueprints.window;if(['binary','answersearch','rotated','bounds'].includes(key))return javaBlueprints.binary;if(['graphdfs','griddfs','treedfs','bst','coloring'].includes(key))return javaBlueprints.dfs;if(['graphbfs','multibfs','treebfs'].includes(key))return javaBlueprints.bfs;if(key.includes('dp')||['knapsack','kadane'].includes(key))return javaBlueprints.dp;if(['backtrack','gridbacktrack'].includes(key))return javaBlueprints.backtrack;if(['heap','twoheap','mergeheap'].includes(key))return javaBlueprints.heap;if(['list','fastslow'].includes(key))return javaBlueprints.list;if(['stack','monostack'].includes(key))return javaBlueprints.stack;return javaBlueprints.general}

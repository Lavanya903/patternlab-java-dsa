// Original curriculum. Public problem titles are references, not copied solution text.
const topicLists={
'Arrays & HashMap':`Two Sum|complement
Contains Duplicate|frequency
Valid Anagram|frequency
Group Anagrams|signature
Top K Frequent Elements|heap
Product of Array Except Self|prefix
Longest Consecutive Sequence|hashset
Subarray Sum Equals K|prefixmap
Continuous Subarray Sum|prefixmap
Subarray Sums Divisible by K|prefixmap
Find Pivot Index|prefix
Range Sum Query - Immutable|prefix
Range Sum Query 2D - Immutable|prefix
Matrix Block Sum|prefix
Find All Numbers Disappeared in an Array|indexmark
Find All Duplicates in an Array|indexmark
First Missing Positive|indexmark
Set Mismatch|indexmark
Majority Element|vote
Majority Element II|vote
Intersection of Two Arrays|hashset
Intersection of Two Arrays II|frequency
Ransom Note|frequency
Isomorphic Strings|bijection
Word Pattern|bijection
Happy Number|hashset
Find the Difference|frequency
4Sum II|complement
Design HashMap|design
Design HashSet|design
Insert Delete GetRandom O(1)|design
LRU Cache|design
LFU Cache|design
Contiguous Array|prefixmap
Count Number of Nice Subarrays|prefixmap`,
'Strings':`Longest Palindromic Substring|expand
Palindromic Substrings|expand
Valid Palindrome|palindrome
Valid Palindrome II|palindrome
Reverse String|palindrome
Reverse Vowels of a String|palindrome
Reverse Words in a String|text
Reverse Words in a String III|text
Longest Common Prefix|text
Find the Index of the First Occurrence in a String|kmp
Repeated Substring Pattern|kmp
Shortest Palindrome|kmp
String to Integer (atoi)|text
Roman to Integer|text
Integer to Roman|text
Zigzag Conversion|text
Multiply Strings|text
Add Strings|text
Add Binary|bits
Compare Version Numbers|text
String Compression|twopointer
Count and Say|text
First Unique Character in a String|frequency
Sort Characters By Frequency|frequency
Custom Sort String|frequency
Determine if Two Strings Are Close|frequency
Find and Replace Pattern|bijection
Encode and Decode Strings|codec
Implement Trie (Prefix Tree)|trie
Design Add and Search Words Data Structure|trie
Replace Words|trie
Longest Word in Dictionary|trie
Word Break|worddp
Word Break II|worddp
Distinct Subsequences|seqdp`,
'Two pointers':`Two Sum II - Input Array Is Sorted|twopointer
3Sum|twopointer
3Sum Closest|twopointer
4Sum|twopointer
Container With Most Water|twopointer
Trapping Rain Water|twopointer
Move Zeroes|twopointer
Sort Colors|partition
Remove Duplicates from Sorted Array|twopointer
Remove Duplicates from Sorted Array II|twopointer
Remove Element|twopointer
Merge Sorted Array|twopointer
Squares of a Sorted Array|twopointer
Boats to Save People|twopointer
Backspace String Compare|twopointer`,
'Sliding window':`Longest Substring Without Repeating Characters|lastseen
Longest Repeating Character Replacement|window
Minimum Window Substring|minwindow
Permutation in String|anagramwindow
Find All Anagrams in a String|anagramwindow
Sliding Window Maximum|deque
Minimum Size Subarray Sum|window
Subarray Product Less Than K|window
Max Consecutive Ones|window
Max Consecutive Ones III|window
Fruit Into Baskets|window
Subarrays with K Different Integers|exactk
Longest Substring with At Most K Distinct Characters|window
Longest Substring with At Most Two Distinct Characters|window
Maximum Average Subarray I|fixedwindow
Maximum Number of Vowels in a Substring of Given Length|fixedwindow
Get Equal Substrings Within Budget|window
Grumpy Bookstore Owner|fixedwindow
Longest Subarray of 1's After Deleting One Element|window
Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit|deque`,
'Binary search':`Binary Search|binary
Search Insert Position|binary
Sqrt(x)|answersearch
Search in Rotated Sorted Array|rotated
Search in Rotated Sorted Array II|rotated
Find Minimum in Rotated Sorted Array|rotated
Find Minimum in Rotated Sorted Array II|rotated
Find Peak Element|binary
Find First and Last Position of Element in Sorted Array|bounds
Search a 2D Matrix|binary
Search a 2D Matrix II|binary
Kth Smallest Element in a Sorted Matrix|answersearch
Median of Two Sorted Arrays|bounds
Koko Eating Bananas|answersearch
Capacity To Ship Packages Within D Days|answersearch
Split Array Largest Sum|answersearch
Minimum Number of Days to Make m Bouquets|answersearch
Magnetic Force Between Two Balls|answersearch
Minimum Speed to Arrive on Time|answersearch
Time Based Key-Value Store|bounds
Find K Closest Elements|bounds
Single Element in a Sorted Array|binary
H-Index II|bounds
Successful Pairs of Spells and Potions|bounds
Find the Smallest Divisor Given a Threshold|answersearch`,
'Stack & Queue':`Valid Parentheses|stack
Min Stack|design
Evaluate Reverse Polish Notation|stack
Daily Temperatures|monostack
Next Greater Element I|monostack
Next Greater Element II|monostack
Online Stock Span|monostack
Largest Rectangle in Histogram|monostack
Maximal Rectangle|monostack
Asteroid Collision|stack
Decode String|stack
Basic Calculator|stack
Basic Calculator II|stack
Basic Calculator III|stack
Remove All Adjacent Duplicates In String|stack
Remove All Adjacent Duplicates in String II|stack
Remove K Digits|monostack
Remove Duplicate Letters|monostack
Minimum Remove to Make Valid Parentheses|stack
Longest Valid Parentheses|stack
Score of Parentheses|stack
Implement Queue using Stacks|design
Implement Stack using Queues|design
Design Circular Queue|design
Design Circular Deque|design`,
'Linked list':`Reverse Linked List|list
Merge Two Sorted Lists|list
Reorder List|fastslow
Remove Nth Node From End of List|fastslow
Linked List Cycle|fastslow
Linked List Cycle II|fastslow
Copy List with Random Pointer|list
Add Two Numbers|list
Add Two Numbers II|list
Intersection of Two Linked Lists|list
Palindrome Linked List|fastslow
Middle of the Linked List|fastslow
Reverse Linked List II|list
Reverse Nodes in k-Group|list
Swap Nodes in Pairs|list
Rotate List|list
Odd Even Linked List|list
Sort List|mergesort
Remove Duplicates from Sorted List|list
Design Linked List|design`,
'Trees':`Maximum Depth of Binary Tree|treedfs
Same Tree|treedfs
Invert Binary Tree|treedfs
Binary Tree Maximum Path Sum|treedfs
Binary Tree Level Order Traversal|treebfs
Serialize and Deserialize Binary Tree|codec
Subtree of Another Tree|treedfs
Construct Binary Tree from Preorder and Inorder Traversal|treedfs
Validate Binary Search Tree|bst
Kth Smallest Element in a BST|bst
Lowest Common Ancestor of a Binary Search Tree|bst
Lowest Common Ancestor of a Binary Tree|treedfs
Diameter of Binary Tree|treedfs
Balanced Binary Tree|treedfs
Binary Tree Right Side View|treebfs
Count Good Nodes in Binary Tree|treedfs
Path Sum|treedfs
Path Sum II|treedfs
Path Sum III|prefixmap
Symmetric Tree|treedfs
Binary Tree Zigzag Level Order Traversal|treebfs
Populating Next Right Pointers in Each Node|treebfs
Flatten Binary Tree to Linked List|treedfs
Binary Tree Inorder Traversal|bst
Binary Tree Preorder Traversal|treedfs
Binary Tree Postorder Traversal|treedfs
Recover Binary Search Tree|bst
Delete Node in a BST|bst
Trim a Binary Search Tree|bst
Vertical Order Traversal of a Binary Tree|treebfs`,
'Graphs':`Number of Islands|griddfs
Clone Graph|graphdfs
Pacific Atlantic Water Flow|griddfs
Course Schedule|topo
Course Schedule II|topo
Number of Connected Components in an Undirected Graph|dsu
Graph Valid Tree|dsu
Word Ladder|graphbfs
Rotting Oranges|multibfs
01 Matrix|multibfs
Walls and Gates|multibfs
Surrounded Regions|griddfs
Max Area of Island|griddfs
Island Perimeter|griddfs
Number of Enclaves|griddfs
Keys and Rooms|graphdfs
Find if Path Exists in Graph|graphbfs
Shortest Path in Binary Matrix|graphbfs
Snakes and Ladders|graphbfs
Open the Lock|graphbfs
Minimum Genetic Mutation|graphbfs
Is Graph Bipartite|coloring
Possible Bipartition|coloring
Find Eventual Safe States|topo
Alien Dictionary|topo
Find All Possible Recipes from Given Supplies|topo
Redundant Connection|dsu
Accounts Merge|dsu
Most Stones Removed with Same Row or Column|dsu
Number of Operations to Make Network Connected|dsu
Min Cost to Connect All Points|mst
Connecting Cities With Minimum Cost|mst
Network Delay Time|dijkstra
Path With Minimum Effort|dijkstra
Swim in Rising Water|dijkstra
Cheapest Flights Within K Stops|bellman
Find the City With the Smallest Number of Neighbors at a Threshold Distance|floyd
Critical Connections in a Network|bridges
Reconstruct Itinerary|euler
Longest Increasing Path in a Matrix|topo`,
'Heap':`Kth Largest Element in an Array|heap
Kth Largest Element in a Stream|heap
K Closest Points to Origin|heap
Find Median from Data Stream|twoheap
Merge k Sorted Lists|mergeheap
Find K Pairs with Smallest Sums|mergeheap
Smallest Range Covering Elements from K Lists|mergeheap
Top K Frequent Words|heap
Reorganize String|heap
Last Stone Weight|heap
Minimum Cost to Connect Sticks|heap
IPO|heap
Meeting Rooms III|heap
Total Cost to Hire K Workers|heap
Sliding Window Median|twoheap`,
'Backtracking':`Subsets|backtrack
Subsets II|backtrack
Permutations|backtrack
Permutations II|backtrack
Combinations|backtrack
Combination Sum|backtrack
Combination Sum II|backtrack
Combination Sum III|backtrack
Generate Parentheses|backtrack
Letter Combinations of a Phone Number|backtrack
Palindrome Partitioning|backtrack
Restore IP Addresses|backtrack
N-Queens|backtrack
N-Queens II|backtrack
Sudoku Solver|backtrack
Word Search|gridbacktrack
Word Search II|trie
Path with Maximum Gold|gridbacktrack
Unique Paths III|gridbacktrack
Matchsticks to Square|backtrack`,
'Dynamic programming':`Climbing Stairs|lineardp
House Robber|lineardp
House Robber II|lineardp
House Robber III|treedp
Coin Change|knapsack
Coin Change II|knapsack
Combination Sum IV|knapsack
Partition Equal Subset Sum|knapsack
Target Sum|knapsack
Decode Ways|worddp
Longest Increasing Subsequence|seqdp
Longest Common Subsequence|seqdp
Maximum Subarray|kadane
Maximum Product Subarray|kadane
Maximum Sum Circular Subarray|kadane
Unique Paths|griddp
Unique Paths II|griddp
Minimum Path Sum|griddp
Minimum Falling Path Sum|griddp
Dungeon Game|griddp
Cherry Pickup|griddp
Cherry Pickup II|griddp
Edit Distance|seqdp
Interleaving String|seqdp
Longest Palindromic Subsequence|seqdp
Regular Expression Matching|seqdp
Wildcard Matching|seqdp
Burst Balloons|intervaldp
Minimum Cost to Cut a Stick|intervaldp
Palindrome Partitioning II|intervaldp
Best Time to Buy and Sell Stock|stockdp
Best Time to Buy and Sell Stock II|stockdp
Best Time to Buy and Sell Stock III|stockdp
Best Time to Buy and Sell Stock IV|stockdp
Best Time to Buy and Sell Stock with Cooldown|stockdp
Best Time to Buy and Sell Stock with Transaction Fee|stockdp
Perfect Squares|knapsack
Integer Break|lineardp
Counting Bits|lineardp
Delete and Earn|lineardp`,
'Greedy':`Jump Game|greedy
Jump Game II|greedy
Gas Station|greedy
Candy|greedy
Task Scheduler|greedy
Partition Labels|greedy
Merge Triplets to Form Target Triplet|greedy
Valid Parenthesis String|greedy
Hand of Straights|greedy
Assign Cookies|greedy
Lemonade Change|greedy
Queue Reconstruction by Height|greedy
Largest Number|greedy
Maximum Units on a Truck|greedy
Next Permutation|partition`,
'Intervals':`Merge Intervals|intervals
Insert Interval|intervals
Non-overlapping Intervals|intervals
Meeting Rooms|intervals
Meeting Rooms II|intervals
Minimum Number of Arrows to Burst Balloons|intervals
Interval List Intersections|intervals
Employee Free Time|intervals
My Calendar I|intervals
Minimum Interval to Include Each Query|heap`,
'Bit manipulation':`Number of 1 Bits|bits
Reverse Bits|bits
Missing Number|bits
Sum of Two Integers|bits
Single Number|bits
Single Number II|bits
Single Number III|bits
Bitwise AND of Numbers Range|bits
Power of Two|bits
Subsets (Bitmask Enumeration)|bits`,
'Math & Matrix':`Rotate Image|matrix
Spiral Matrix|matrix
Set Matrix Zeroes|matrix
Game of Life|matrix
Pow(x, n)|math
Plus One|math
Integer to English Words|math
Detect Squares|design
Multiply Matrices|matrix
Count Primes|math`};
const coreNames=`Two Sum;Contains Duplicate;Valid Anagram;Group Anagrams;Top K Frequent Elements;Product of Array Except Self;Longest Consecutive Sequence;Valid Palindrome;3Sum;Container With Most Water;Longest Substring Without Repeating Characters;Longest Repeating Character Replacement;Minimum Window Substring;Valid Parentheses;Binary Search;Search in Rotated Sorted Array;Find Minimum in Rotated Sorted Array;Reverse Linked List;Merge Two Sorted Lists;Reorder List;Remove Nth Node From End of List;Linked List Cycle;Merge k Sorted Lists;Maximum Depth of Binary Tree;Same Tree;Invert Binary Tree;Binary Tree Maximum Path Sum;Binary Tree Level Order Traversal;Serialize and Deserialize Binary Tree;Subtree of Another Tree;Construct Binary Tree from Preorder and Inorder Traversal;Validate Binary Search Tree;Kth Smallest Element in a BST;Lowest Common Ancestor of a Binary Search Tree;Implement Trie (Prefix Tree);Design Add and Search Words Data Structure;Word Search II;Number of Islands;Clone Graph;Pacific Atlantic Water Flow;Course Schedule;Number of Connected Components in an Undirected Graph;Graph Valid Tree;Alien Dictionary;Climbing Stairs;House Robber;House Robber II;Coin Change;Longest Increasing Subsequence;Longest Common Subsequence;Word Break;Combination Sum IV;Decode Ways;Unique Paths;Jump Game;Maximum Subarray;Maximum Product Subarray;Best Time to Buy and Sell Stock;Merge Intervals;Insert Interval;Non-overlapping Intervals;Meeting Rooms;Meeting Rooms II;Rotate Image;Spiral Matrix;Set Matrix Zeroes;Word Search;Longest Palindromic Substring;Palindromic Substrings;Encode and Decode Strings;Find Median from Data Stream;Number of 1 Bits;Counting Bits;Reverse Bits;Missing Number`.split(';');
const hardNames=new Set(`Minimum Window Substring;Sliding Window Maximum;Subarrays with K Different Integers;First Missing Positive;LFU Cache;Shortest Palindrome;Word Break II;Distinct Subsequences;Trapping Rain Water;Median of Two Sorted Arrays;Split Array Largest Sum;Largest Rectangle in Histogram;Maximal Rectangle;Basic Calculator III;Longest Valid Parentheses;Reverse Nodes in k-Group;Binary Tree Maximum Path Sum;Serialize and Deserialize Binary Tree;Vertical Order Traversal of a Binary Tree;Word Ladder;Alien Dictionary;Swim in Rising Water;Critical Connections in a Network;Reconstruct Itinerary;Longest Increasing Path in a Matrix;Find Median from Data Stream;Merge k Sorted Lists;Smallest Range Covering Elements from K Lists;IPO;Sliding Window Median;N-Queens;N-Queens II;Sudoku Solver;Word Search II;Unique Paths III;Dungeon Game;Cherry Pickup;Regular Expression Matching;Wildcard Matching;Burst Balloons;Minimum Cost to Cut a Stick;Palindrome Partitioning II;Best Time to Buy and Sell Stock III;Best Time to Buy and Sell Stock IV;Candy;Minimum Interval to Include Each Query;Integer to English Words`.split(';'));
const easyNames=new Set(`Two Sum;Contains Duplicate;Valid Anagram;Ransom Note;Find Pivot Index;Range Sum Query - Immutable;Find All Numbers Disappeared in an Array;Set Mismatch;Majority Element;Intersection of Two Arrays;Intersection of Two Arrays II;Happy Number;Find the Difference;Design HashSet;Design HashMap;Valid Palindrome;Reverse String;Reverse Vowels of a String;Reverse Words in a String III;Longest Common Prefix;Find the Index of the First Occurrence in a String;Roman to Integer;Add Strings;Add Binary;First Unique Character in a String;Move Zeroes;Remove Duplicates from Sorted Array;Remove Element;Merge Sorted Array;Squares of a Sorted Array;Backspace String Compare;Max Consecutive Ones;Maximum Average Subarray I;Binary Search;Search Insert Position;Sqrt(x);Valid Parentheses;Next Greater Element I;Remove All Adjacent Duplicates In String;Implement Queue using Stacks;Implement Stack using Queues;Reverse Linked List;Merge Two Sorted Lists;Linked List Cycle;Intersection of Two Linked Lists;Palindrome Linked List;Middle of the Linked List;Remove Duplicates from Sorted List;Maximum Depth of Binary Tree;Same Tree;Invert Binary Tree;Subtree of Another Tree;Lowest Common Ancestor of a Binary Search Tree;Diameter of Binary Tree;Balanced Binary Tree;Path Sum;Symmetric Tree;Binary Tree Inorder Traversal;Binary Tree Preorder Traversal;Binary Tree Postorder Traversal;Island Perimeter;Find if Path Exists in Graph;Kth Largest Element in a Stream;Last Stone Weight;Climbing Stairs;Best Time to Buy and Sell Stock;Counting Bits;Assign Cookies;Lemonade Change;Meeting Rooms;Number of 1 Bits;Reverse Bits;Missing Number;Single Number;Power of Two;Plus One`.split(';'));
const problemBank=Object.entries(topicLists).flatMap(([topic,text])=>text.split('\n').map(row=>{const [title,key]=row.split('|');return {id:title.toLowerCase().replace(/[^a-z0-9]+/g,'-'),title,key,topic,difficulty:easyNames.has(title)?'Easy':hardNames.has(title)?'Hard':'Medium',core:coreNames.includes(title)}}));
const problemNotes={
'Longest Substring Without Repeating Characters':['Contiguous substring + no repeated character.','Remember the last index of each character. Set left = max(left, previous + 1), then record the best length.','abba is the counterexample: moving left backward at the last a breaks the valid window.'],
'Valid Anagram':['Order does not matter, but character multiplicities do.','Equal lengths first; increment counts for the first string and decrement for the second. Every final count must be zero.','A set loses duplicates: aab and abb contain the same letters but are not anagrams.'],
'Group Anagrams':['Different words can share one canonical identity.','Sort each word to build a signature; map that key to a growing list of original words.','Use the signature as the map key, never the unsorted original word.'],
'Subarray Sum Equals K':['Count contiguous sums; negative values prevent a monotonic window.','Store prefix-sum frequencies, seeded with 0 → 1. Add frequency(prefix − k) before recording this prefix.','A set loses repeated prefixes. Query before insert to avoid an empty subarray for k = 0.'],
'Minimum Window Substring':['Smallest contiguous segment covering a target multiset.','Count requirements; track how many required characters are satisfied. Expand until valid, shrink while valid, save the shortest.','Duplicates in the target count. Finding each distinct character once is insufficient.'],
'Permutation in String':['A permutation has the same character counts and the same length.','Keep a window of length pattern.length and compare its counts to the pattern counts.','This is fixed-size; longest-substring shrinking rules are not the same algorithm.'],
'Course Schedule':['A directed dependency graph asks whether all tasks can finish.','Compute indegrees, enqueue all zero-indegree nodes, decrement neighbors, and count processed nodes.','If processed < V, a cycle exists. A normal visited set alone does not detect a directed cycle.'],
'Course Schedule II':['Find an order obeying every prerequisite.','Use Kahn’s algorithm and append each dequeued vertex to the order. Return empty if the processed count is less than V.','Multiple valid orders may exist; do not compare only with one fixed ordering.'],
'Number of Islands':['Count disconnected components of land in a grid.','Scan all cells. On unvisited land, increment the count and flood-fill only connected land.','Mark visited before recursion or enqueueing. Clarify whether diagonal adjacency counts.'],
'Network Delay Time':['Directed nonnegative travel times from one source.','Run Dijkstra; ignore stale heap entries and relax shorter routes. Take the maximum final distance if all vertices are reachable.','BFS minimizes edges, not total cost. Negative weights invalidate Dijkstra.'],
'Cheapest Flights Within K Stops':['Weighted routes with a bound on edge count.','Use k + 1 rounds of Bellman-Ford with a cloned distance array each round.','In-place relaxation can use too many edges in a single round. Stops are one fewer than edges.'],
'Word Ladder':['Each transformation costs one step.','BFS through one-letter neighbors; mark words when added to the queue. Bidirectional BFS can reduce exploration.','DFS may find a path, but it does not guarantee the fewest transformations.'],
'Pacific Atlantic Water Flow':['Cells that can reach two boundaries.','Reverse the direction: flood-fill uphill from each ocean boundary and intersect the visited sets.','Forward-searching from every cell repeats work. Reverse traversal needs neighbor height ≥ current height.'],
'Clone Graph':['Rebuild nodes and edges, preserving identity and cycles.','Map each original node to its clone before visiting its neighbors. Reuse the clone for repeated encounters.','Mapping by value alone is unsafe if different nodes can share a value.'],
'Graph Valid Tree':['An undirected connected graph with no cycle.','Require E = V − 1 and connectivity, or use Union-Find to reject an edge joining already-connected roots.','An undirected edge back to the parent is not a new cycle in DFS.'],
'Two Sum':['Find an earlier value equal to target − current.','Look up the complement before inserting current value → index into the map.','Inserting first can match the current element to itself.'],
'Longest Consecutive Sequence':['Order in the input is irrelevant; membership matters.','Build a set. Start counting only at a number whose predecessor is absent.','Starting from every number repeats chains and can become quadratic.'],
'Container With Most Water':['Two boundary heights and distance determine the area.','Evaluate both ends; move the pointer at the shorter height inward.','Moving the taller end cannot improve the limiting height while the width shrinks.'],
'Product of Array Except Self':['Combine everything before and after each index.','Write left-prefix products to output, then multiply by a right-suffix accumulator.','Division fails when zeros appear and is usually disallowed.'],
'Maximum Subarray':['Best sum of a contiguous range.','Maintain bestEndingHere = max(value, bestEndingHere + value), then update the global best.','Initialize with the first element so all-negative input works.'],
'Maximum Product Subarray':['A negative multiplier can turn a minimum into a maximum.','Track both the largest and smallest product ending here. Use old values for both updates.','Tracking only the maximum misses two-negative flips. Zeros start fresh chains.'],
'Coin Change':['Unlimited coins, minimize how many sum to an amount.','dp[0] = 0; for each amount consider dp[amount − coin] + 1, keeping only reachable states.','Greedily taking the largest coin does not work for arbitrary coin systems.'],
'Word Break':['Can the string prefix be segmented into dictionary words?','dp[0] = true. For each ending position test earlier reachable boundaries and dictionary membership.','Greedy longest-word matching can miss a shorter valid segmentation.'],
'Decode Ways':['Count legal one-digit and two-digit endings.','Add dp[i − 1] if the last digit is 1–9 and dp[i − 2] if the last pair is 10–26.','Zero is never a valid standalone letter.'],
'Longest Palindromic Substring':['Contiguous characters symmetric around a center.','Expand around every odd and even center, keeping the longest matching range.','Even-length centers lie between characters; forgetting them misses abba.'],
'Find Median from Data Stream':['Maintain the middle of a growing set.','Use a max-heap for the smaller half and min-heap for the larger half; rebalance sizes and ordering.','For even size, cast to long or double before adding heap tops to avoid overflow.'],
'Validate Binary Search Tree':['Every node must respect all ancestor bounds.','DFS with exclusive lower and upper bounds, preferably long bounds in Java.','Comparing only with immediate children misses a deep ancestor violation.'],
'Alien Dictionary':['Character precedence is a directed partial order.','Compare adjacent words, add the first differing-character edge, then topologically order all characters.','A longer word preceding its exact prefix is invalid. Avoid counting duplicate edges twice.'],
'Merge Intervals':['Overlapping ranges can be compressed after ordering.','Sort by start; extend the current end on overlap, otherwise emit and start a new interval.','Check whether touching endpoints count as overlap in the problem definition.'],
'Jump Game':['Can the reachable frontier cover the last index?','Scan while i ≤ farthest; extend farthest = max(farthest, i + nums[i]).','A large jump at an unreachable position cannot help.'],
'Number of Connected Components in an Undirected Graph':['Count groups, not routes.','Begin with V components; every successful Union-Find merge decreases the count by one.','Isolated vertices are components too. Duplicate edges should not decrement the count.']};

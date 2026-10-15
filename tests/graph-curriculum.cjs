const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c={};vm.createContext(c);
for(const file of ['catalogue.js','teaching.js','labs.js','graph-curriculum.js','graph-patterns.js','graph-variants.js'])vm.runInContext(fs.readFileSync(__dirname+'/../'+file,'utf8'),c);
vm.runInContext('globalThis.data={problemBank,guides,graphAlgorithms,graphSheetGroups,graphTrace,visitAllJava}',c);
const {problemBank:bank,guides,graphAlgorithms,graphSheetGroups:groups,graphTrace:trace}=c.data;
assert.equal(groups.flatMap(g=>g[1]).length,43);
assert.deepEqual(Array.from(groups,g=>g[1].length),[12,7,5,8,5,3,3]);
for(const [,rows]of groups)for(const [,title,key]of rows){const p=bank.find(p=>p.title===title);assert(p,title);assert(guides[key]);assert.equal(p.key,key)}
assert.equal(new Set(bank.map(p=>p.id)).size,bank.length);
assert.equal(bank.filter(p=>p.core).length,75);
assert.equal(Object.keys(graphAlgorithms).length,22);
assert.equal(bank.find(p=>p.title==='Shortest Path Visiting All Nodes').url,'https://leetcode.com/problems/shortest-path-visiting-all-nodes/description/');
const run=(id,n,edges,source=0)=>trace(id,n,edges,source,false);
assert.equal(run('visitall',4,[[0,1,1],[0,2,1],[0,3,1]]).at(-1).vars.result,4);
assert.equal(run('visitall',4,[[0,1,1],[2,3,1]]).at(-1).vars.result,-1);
assert.equal(run('visitall',1,[]).at(-1).vars.result,0);
assert.equal(run('components',5,[[0,1,1],[2,3,1]]).at(-1).vars.components,3);
assert.deepEqual(Array.from(run('multisource',6,[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1]]).at(-1).dist),[0,1,2,2,1,0]);
// Independent oracle: all-pairs distances + subset DP over metric closure.
function oracle(n,edges){
  const d=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?0:Infinity));
  for(const [u,v]of edges)d[u][v]=d[v][u]=1;
  for(let k=0;k<n;k++)for(let i=0;i<n;i++)for(let j=0;j<n;j++)d[i][j]=Math.min(d[i][j],d[i][k]+d[k][j]);
  const dp=Array.from({length:1<<n},()=>Array(n).fill(Infinity));
  for(let i=0;i<n;i++)dp[1<<i][i]=0;
  for(let m=1;m<(1<<n);m++)for(let u=0;u<n;u++)if(m&(1<<u))for(let v=0;v<n;v++)if(!(m&(1<<v)))dp[m|(1<<v)][v]=Math.min(dp[m|(1<<v)][v],dp[m][u]+d[u][v]);
  const best=Math.min(...dp.at(-1));return best===Infinity?-1:best;
}
let cases=0;
for(let mask=0;mask<64;mask++){
  const edges=[];let bit=0;for(let u=0;u<4;u++)for(let v=u+1;v<4;v++,bit++)if(mask&(1<<bit))edges.push([u,v,1]);
  const frames=run('visitall',4,edges);assert.equal(frames.at(-1).vars.result,oracle(4,edges));
  assert(frames.every(f=>f.front.length<=8));
  assert(frames.every(f=>f.line>=0&&f.line<graphAlgorithms.visitall.code.split('\n').length));cases++;
}
console.log(`Graph curriculum passed: 43 mapped entries, ${bank.length} total entries, ${cases} exhaustive bitmask-BFS oracle comparisons.`);

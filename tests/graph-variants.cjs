const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');const c={};vm.createContext(c);
for(const f of ['catalogue.js','teaching.js','labs.js','graph-curriculum.js','graph-patterns.js','graph-variants.js'])vm.runInContext(fs.readFileSync(__dirname+'/../'+f,'utf8'),c);
const data=vm.runInContext('({graphTrace,graphPlaybooks,graphAlgorithms,problemBank,guides,familyNotes,graphSheetGroups})',c);
const {graphTrace:T,graphPlaybooks:P,graphAlgorithms:A,problemBank:B,guides:G}=data;
const final=(id,n,e,s=0,d=true,b=2)=>T(id,n,e,s,d,b).at(-1),plain=x=>JSON.parse(JSON.stringify(x));
assert.equal(B.filter(p=>p.topic==='Graphs').length,56);
for(const p of B.filter(p=>p.topic==='Graphs')){assert(P[p.title],p.title);const a=P[p.title];for(const k of ['cue','state','steps','example','trap','time','space'])assert(a[k].length>0,p.title+' '+k);assert(A[a.lab],a.lab);assert.equal(G[p.key].lab,a.lab);}
assert.equal(Object.keys(A).length,22);
// Deterministic PRNG so failures are reproducible.
let seed=90210;const rnd=n=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%n};let checks=0;
const eq=(a,b)=>{assert.deepEqual(plain(a),plain(b));checks++};
function components(n,e,removedVertex=-1,removedEdge=-1){const seen=new Set();let count=0;const visit=u=>{seen.add(u);for(let i=0;i<e.length;i++){if(i===removedEdge)continue;let [a,b]=e[i];if(a===removedVertex||b===removedVertex)continue;let v=a===u?b:b===u?a:-1;if(v>=0&&!seen.has(v))visit(v)}};for(let u=0;u<n;u++)if(u!==removedVertex&&!seen.has(u)){count++;visit(u)}return count}
function reach(n,e,s){let seen=new Set([s]),q=[s];for(let i=0;i<q.length;i++)for(const [u,v]of e)if(u===q[i]&&!seen.has(v)){seen.add(v);q.push(v)}return seen}
function hasCycle(n,e,source=null){const color=Array(n).fill(0);const visit=u=>{color[u]=1;for(const [a,b]of e)if(a===u){if(color[b]===1)return true;if(!color[b]&&visit(b))return true}color[u]=2;return false};if(source!==null)return visit(source);for(let i=0;i<n;i++)if(!color[i]&&visit(i))return true;return false}
eq(final('cycle',3,[[0,1,1],[0,2,1],[2,1,1]]).vars.cycle,'no');
eq(final('negative',4,[[2,3,-2],[3,2,1]]).vars.negativeCycle,'yes');
eq(final('bellman',4,[[2,3,-2],[3,2,1]]).vars.negativeCycle,'no');
eq(final('flights',3,[[0,1,1],[1,2,1],[0,2,10]],0,true,1).dist[2],10);
eq(final('flights',3,[[0,1,1],[1,2,1],[0,2,10]],0,true,2).dist[2],2);
assert.throws(()=>T('allpaths',2,[[0,1,1],[1,0,1]],0,true),/DAG/);
for(let z=0;z<100;z++){
 const n=2+rnd(4),e=[];for(let u=0;u<n;u++)for(let v=0;v<n;v++)if(rnd(5)===0)e.push([u,v,rnd(8)-3]);
 const cy=final('cycle',n,e);eq(cy.vars.cycle,hasCycle(n,e)?'yes':'no');
 const safe=final('safe',n,e);eq([...safe.seen].sort((a,b)=>a-b),Array.from({length:n},(_,i)=>i).filter(i=>!hasCycle(n,e,i)));
 const closure=final('closure',n,e).matrix;for(let s=0;s<n;s++){const r=reach(n,e,s);eq(closure[s],Array.from({length:n},(_,i)=>r.has(i)?1:0))}
 // Floyd diagonal is independent of relaxation order used by global Bellman detector.
 eq(final('negative',n,e).vars.negativeCycle,final('floyd',n,e).matrix.some((r,i)=>r[i]<0)?'yes':'no');
 const budget=rnd(4),source=rnd(n);let expected=Array(n).fill(Infinity);expected[source]=0;
 const walk=(u,cost,left)=>{expected[u]=Math.min(expected[u],cost);if(!left)return;for(const [a,b,w]of e)if(a===u)walk(b,cost+w,left-1)};walk(source,0,budget);
 eq(final('flights',n,e,source,true,budget).dist,expected);
 const und=e.map(([u,v,w])=>[u,v,Math.abs(w)]),base=components(n,und),low=final('lowlink',n,und,0,false);
 const bridgePairs=und.flatMap(([u,v],i)=>components(n,und,-1,i)>base?[[Math.min(u,v),Math.max(u,v)].join('-')]:[]).sort();
 eq(low.accepted.map(([u,v])=>[Math.min(u,v),Math.max(u,v)].join('-')).sort(),bridgePairs);
 const cuts=Array.from({length:n},(_,i)=>i).filter(i=>components(n,und,i)>base);
 eq(low.vars.cutVertices,cuts.length?cuts.join(', '):'none');
 // Brute simple paths independently compute minimum bottleneck on the undirected graph.
 let best=Array(n).fill(Infinity);const simple=(u,cost,seen)=>{best[u]=Math.min(best[u],cost);for(const [a,b,w]of und){const v=a===u?b:b===u?a:-1;if(v>=0&&!seen.has(v)){const next=new Set(seen);next.add(v);simple(v,Math.max(cost,w),next)}}};simple(source,0,new Set([source]));
 eq(final('minimax',n,und,source,false).dist,best);
 const mst=final('prim',n,und,source,false),kr=final('kruskal',n,und,source,false);eq(mst.vars.connected,base===1?'yes':'no');if(base===1)eq(mst.vars.cost,kr.vars.cost);
 const equiv=final('equivalence',n,und,source,false),both=und.flatMap(([u,v,w])=>[[u,v,w],[v,u,w]]);
 eq(equiv.dist,Array.from({length:n},(_,i)=>Math.min(...reach(n,both,i))));
 const dag=e.filter(([u,v])=>u<v);let count=0;const paths=u=>{if(u===n-1){count++;return}for(const [a,b]of dag)if(a===u)paths(b)};paths(source);eq(final('allpaths',n,dag,source).vars.paths,count);
 for(const id of Object.keys(A)){if(!['cycle','safe','closure','negative','flights','lowlink','minimax','prim','equivalence','allpaths'].includes(id))continue;let graph=['lowlink','minimax','prim','equivalence'].includes(id)?und:id==='allpaths'?dag:e;let frames=T(id,n,graph,source,!['lowlink','minimax','prim','equivalence'].includes(id),budget);assert(frames.every(f=>f.line>=0&&f.line<A[id].code.split('\n').length));}
}
console.log(`Graph variants passed: ${checks} oracle comparisons; all 56 graph playbooks and 22 visual models validated.`);

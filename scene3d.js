/* ===== Mô phỏng 3D thời gian thực: đoạn dây I·l, đường sức từ B, lực từ F (đọc mẫu mới nhất của D mỗi khung hình) ===== */
(()=>{
const cv=$('c3'),g=cv.getContext('2d'),V0={y:-.6,p:.45},mix=(a,b,k)=>a.map((v,i)=>v+(b[i]-v)*k),
nr=a=>{const m=Math.hypot(...a);return m>1e-9?a.map(v=>v/m):a},
cr=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],
cb=i=>[i&1?1:-1,i&2?1:-1,i&4?1:-1];
let V={...V0},S={b:[0,1,0],n:[0,0,1],B:0,F:0,m:[0,0,0]},w=0,h=0,dr=0,ph=0,dg=null;
const P=v=>{const cy=Math.cos(V.y),sy=Math.sin(V.y),cp=Math.cos(V.p),sp=Math.sin(V.p),
 x=v[0]*cy+v[2]*sy,q=v[2]*cy-v[0]*sy,y=v[1]*cp-q*sp,z=v[1]*sp+q*cp,k=4/(4-z),s=Math.min(w,h)*.24;
 return[w/2+x*k*s,h/2-y*k*s]};
function draw(){
 const r=devicePixelRatio||1,cw=cv.clientWidth,ch=cv.clientHeight;
 if(cw!=w||ch!=h||r!=dr){w=cw;h=ch;dr=r;cv.width=w*r;cv.height=h*r}
 g.setTransform(r,0,0,r,0,0);g.clearRect(0,0,w,h);g.font='bold 12px system-ui,sans-serif';g.textAlign='left';
 const cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),T=D[D.length-1],N=D.slice(-200),
 rB=Math.max(5,...N.map(p=>p.B)),rF=Math.max(.5,...N.map(p=>Math.max(Math.abs(p.F),p.Flt))),
 ln=(a,b,c,wd,d)=>{const p=P(a),q=P(b);g.strokeStyle=c;g.lineWidth=wd;g.setLineDash(d||[]);g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(q[0],q[1]);g.stroke();return[p,q]},
 ar=(a,b,c,wd,d)=>{const[p,q]=ln(a,b,c,wd,d),t=Math.atan2(q[1]-p[1],q[0]-p[0]),s=6+wd*1.5;g.fillStyle=c;g.beginPath();g.moveTo(q[0],q[1]);g.lineTo(q[0]-s*Math.cos(t-.4),q[1]-s*Math.sin(t-.4));g.lineTo(q[0]-s*Math.cos(t+.4),q[1]-s*Math.sin(t+.4));g.fill()},
 tx=(s,v,c)=>{const p=P(v);g.fillStyle=c;g.fillText(s,p[0]+7,p[1]-7)};
 if(T){const m=T.B,q=Math.hypot(...T.n);
  if(m>1e-9)S.b=nr(mix(S.b,[T.x/m,T.y/m,T.z/m],.12));
  if(q>1e-9)S.n=nr(mix(S.n,T.n.map(v=>v/q),.12));
  S.B+=(m-S.B)*.12;S.F+=(Math.abs(T.F)-S.F)*.12;if(S.b.concat(S.n).some(v=>!isFinite(v))){S.b=[0,1,0];S.n=[0,0,1]}}
 const a=Math.min(S.B/rB,1),b=S.b,hv=Math.abs(b[1])<.9?[0,1,0]:[1,0,0],u=nr(cr(b,hv)),v=cr(b,u),
 Ld=DIR(...b),I=+$('I').value||0,l=+$('l').value||0,hl=Math.min(.85,Math.max(.25,l/12)),e=k=>Ld.map((x,i)=>x*k+S.m[i]),O=[0,0,0];
 ph=(ph+.5+4*a)%19;S.m=mix(S.m,Ion?S.n.map(x=>x*.55*Math.min(S.F/rF,1)):[0,0,0],.1);
 for(let i=0;i<8;i++)for(let j=i+1;j<8;j++){const d=i^j;if(d==1||d==2||d==4)ln(cb(i),cb(j),C('--line'),1)}
 [[1,0,0,'#e03131','x'],[0,1,0,'#2f9e44','y'],[0,0,1,'#1c7ed6','z']].forEach(([x,y,z,c,s])=>{const t=[x*1.35,y*1.35,z*1.35];ar(O,t,c,1.5);tx(s,t,c)});
 if(T&&S.B>1e-3){
  g.globalAlpha=.8;g.lineDashOffset=-ph;
  for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++){
   const c=[0,1,2].map(k=>.5*(i*u[k]+j*v[k]));let t0=-9,t1=9,ok=1;
   for(let k=0;k<3;k++){if(Math.abs(b[k])>1e-9){const a1=(-1-c[k])/b[k],a2=(1-c[k])/b[k];t0=Math.max(t0,Math.min(a1,a2));t1=Math.min(t1,Math.max(a1,a2))}else if(Math.abs(c[k])>1)ok=0}
   if(!ok||t1-t0<.05)continue;
   const p0=c.map((x,k)=>x+t0*b[k]),p1=c.map((x,k)=>x+t1*b[k]);
   (i%2||j%2?ln:ar)(p0,p1,C('--b'),1+1.6*a,[10,9]);
  }
  g.globalAlpha=1;g.lineDashOffset=0;
 }
 ln(e(-hl),e(hl),C('--fg'),6);ar(e(hl-.3),e(hl+.2),C('--fg'),3);tx('I = '+I+' A',e(hl+.2),C('--fg'));
 {const dp=Ld[0]*b[0]+Ld[1]*b[1]+Ld[2]*b[2],al=Math.acos(Math.max(-1,Math.min(1,dp))),sn=Math.sin(al);
  if(T&&S.B>1e-3&&sn>.02){const q=t=>Ld.map((x,k)=>.55*(Math.sin((1-t)*al)*x+Math.sin(t*al)*b[k])/sn);
   for(let i=0;i<16;i++)ln(q(i/16),q((i+1)/16),C('--fg'),1.5);tx('α',q(.5),C('--fg'))}}
 if(T&&S.B>1e-3){const t=b.map(x=>x*(.4+.7*a));ar(O,t,C('--b'),3);tx('B',t,C('--b'))}
 if(T&&S.F/rF>.03&&!document.body.classList.contains('hs')){const t=S.n.map(x=>x*(.3+.8*Math.min(S.F/rF,1)));ar(O,t,C('--f'),3);tx('F',t,C('--f'))}
 g.fillStyle=C('--mut');
 if(T){g.fillText('α = '+f(T.a,1)+'°   |B| = '+f(T.B)+' mT',10,18);g.fillText('F đo = '+f(T.F)+' mN   F lí thuyết = '+f(T.Flt)+' mN',10,36)}
 else g.fillText('Chưa có dữ liệu: chọn Demo hoặc kết nối ESP32',10,18);
}
cv.onpointerdown=e=>{dg={x:e.clientX,y:e.clientY,a:V.y,b:V.p};cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing'};
cv.onpointermove=e=>{if(dg){V.y=dg.a+(e.clientX-dg.x)*.01;V.p=Math.max(-1.5,Math.min(1.5,dg.b+(e.clientY-dg.y)*.01))}};
cv.onpointerup=cv.onpointercancel=()=>{dg=null;cv.style.cursor='grab'};
cv.ondblclick=()=>{V={...V0}};
(function tick(){try{draw()}catch(e){}requestAnimationFrame(tick)})();
})();


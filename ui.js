function ui(){
 pend=false;const e=D[D.length-1];if(!e)return;
 const w=[];for(let i=D.length-1;i>=0&&D[i].t>e.t-.4;i--)w.push(D[i]);
 const av=k=>w.reduce((s,q)=>s+q[k],0)/w.length,x=av('x'),y=av('y'),z=av('z'),L=DIR(x,y,z),
  n=[L[1]*z-L[2]*y,L[2]*x-L[0]*z,L[0]*y-L[1]*x],c=Math.hypot(...n),
  p={x,y,z,n,B:Math.hypot(x,y,z),F:av('F'),Flt:av('Flt'),a:Math.atan2(c,L[0]*x+L[1]*y+L[2]*z)*180/Math.PI};
 [['vB',p.B],['vx',p.x],['vy',p.y],['vz',p.z],['vF',p.F],['vL',p.Flt]].forEach(([i,v])=>$(i).textContent=f(v));
 const m=Math.hypot(...p.n),k=p.n.map(Math.abs),j=k.indexOf(Math.max(...k)),ok=m>1e-9;
 $('ex').innerHTML=row('Góc α giữa dòng điện và B',f(p.a,1)+'°')+row('sin α',f(Math.sin(p.a*Math.PI/180),3))
  +rowg('Phương lực từ',ok?'trục '+'xyz'[j]:'–')+rowg('Chiều lực từ',ok?(p.n[j]>0?'+':'−')+'xyz'[j]:'–')
  +rowg('Vectơ đơn vị của F',ok?'('+p.n.map(v=>f(v/m)).join('; ')+')':'–');
 const s=D.slice(-50),[mB,sB]=ms(s.map(q=>q.B)),[mF,sF]=ms(s.map(q=>q.F)),[mL]=ms(s.map(q=>q.Flt)),dF=Math.abs(mF-mL);
 $('sd').innerHTML=row('B',f(mB)+' ± '+f(sB)+' mT')+row('F đo',f(mF)+' ± '+f(sF)+' mN')+row('F lí thuyết',f(mL)+' mN')
  +row('ΔF = |F đo − F lí thuyết|',f(dF)+' mN')+row('δF = ΔF / F lí thuyết',mL>1e-9?f(100*dF/mL,1)+' %':'–');
 $('cnt').textContent=D.length+' mẫu';
 plot($('cB'),[{k:'B',c:'--b'}]);plot($('cF'),[{k:'F',c:'--f'},{k:'Flt',c:'--f',d:1}]);
}

function plot(cv,S){
 const r=devicePixelRatio||1,w=cv.clientWidth,h=cv.clientHeight;cv.width=w*r;cv.height=h*r;
 const g=cv.getContext('2d'),cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim(),N=D.slice(-W);
 g.scale(r,r);if(N.length<2)return;
 let lo=1/0,hi=-1/0;S.forEach(s=>N.forEach(p=>{lo=Math.min(lo,p[s.k]);hi=Math.max(hi,p[s.k])}));
 if(hi-lo<1e-6){hi+=1;lo-=1}const e=(hi-lo)*.1;lo-=e;hi+=e;
 const a=N[0].t,b=N[N.length-1].t,X=t=>44+(w-54)*(t-a)/((b-a)||1),Y=v=>h-22-(h-32)*(v-lo)/(hi-lo);
 g.font='11px system-ui,sans-serif';g.lineWidth=1;
 for(let i=0;i<=4;i++){const v=lo+(hi-lo)*i/4,y=Y(v);g.strokeStyle=C('--line');g.beginPath();g.moveTo(44,y);g.lineTo(w-10,y);g.stroke();g.fillStyle=C('--mut');g.textAlign='right';g.fillText(v.toFixed(1),40,y+4)}
 g.textAlign='left';g.fillText(a.toFixed(1)+' s',44,h-6);g.textAlign='right';g.fillText(b.toFixed(1)+' s',w-10,h-6);
 S.forEach(s=>{g.strokeStyle=C(s.c);g.lineWidth=2;g.setLineDash(s.d?[6,4]:[]);g.beginPath();N.forEach((p,i)=>g[i?'lineTo':'moveTo'](X(p.t),Y(p[s.k])));g.stroke()});
 g.setLineDash([]);
}


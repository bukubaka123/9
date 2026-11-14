/* Dạy học khám phá: chế độ Học sinh/Giáo viên, bảng quan sát chiều lực từ, thí nghiệm cân dòng điện */
(()=>{
const ax=v=>{const k=v.map(Math.abs),j=k.indexOf(Math.max(...k));return(v[j]<0?'-':'+')+'xyz'[j]},
 nm=(t,s)=>t=='0'?s:t,L1=[],R2=[];let hit=false;
$('role').onchange=()=>document.body.classList.toggle('hs',$('role').value=='hs');
$('on').onclick=()=>{Ion=!Ion;$('on').textContent=Ion?'⚡ Tắt dòng điện':'⚡ Bật dòng điện'};
$('flip').onclick=()=>{sg=-sg};

/* Bảng quan sát: HS chọn hướng dây chuyển động, bấm "Kiểm chứng" mới hiện chiều lực từ thực tế */
function d1(){
 $('log').innerHTML='<tr><th>Lần</th><th>Chiều dòng điện</th><th>Chiều B</th><th>Dây chuyển động (HS quan sát)</th>'+(hit?'<th>Chiều lực từ thực tế</th><th></th>':'')+'</tr>'
 +L1.map((r,i)=>'<tr><td>'+(i+1)+'</td><td>'+r.i+'</td><td>'+r.b+'</td><td>'+nm(r.o,'không chuyển động')+'</td>'
 +(hit?'<td>'+nm(r.t,'không có lực')+'</td><td>'+(r.o==r.t?'✔':'✘')+'</td>':'')+'</tr>').join('')}
$('rec').onclick=()=>{const p=D[D.length-1];if(!p)return;const m=Math.hypot(...p.n)/(p.B||1);
 L1.push({i:ax(DIR(p.x,p.y,p.z)),b:ax([p.x,p.y,p.z]),o:$('obs').value,t:(!Ion||m<.05)?'0':ax(p.n)});d1()};
$('rev').onclick=()=>{hit=true;$('role').value='gv';$('role').onchange();d1()};

/* Thí nghiệm 2: B = F/(I·l), F = Δm·g (Δm tính bằng g thì F tính bằng mN: nhân 9,81) */
function r2(){
 const l=+$('l').value||0,ok=R2.filter(q=>q.I>0&&l>0),B=ok.map(q=>100*q.F/(q.I*l));
 $('t2').innerHTML='<tr><th>Lần</th><th>I (A)</th><th>F (mN)</th><th>B = F/(I·l) (mT)</th></tr>'
 +R2.map((q,i)=>'<tr><td>'+(i+1)+'</td><td>'+f(q.I)+'</td><td>'+f(q.F)+'</td><td>'+(q.I>0&&l>0?f(100*q.F/(q.I*l)):'–')+'</td></tr>').join('');
 if(B.length){
  const[m,sd]=ms(B),k=ok.reduce((s,q)=>s+q.I*q.F,0)/ok.reduce((s,q)=>s+q.I*q.I,0),bf=100*k/l,bs=ms(D.slice(-50).map(p=>p.B))[0];
  $('s2').innerHTML=row('B trung bình',f(m)+' ± '+f(sd)+' mT')+row('B từ hệ số góc đồ thị F–I',f(bf)+' mT')
  +row('B đo bằng cảm biến từ',isFinite(bs)?f(bs)+' mT':'–')+row('Sai lệch giữa hai cách đo',isFinite(bs)&&bs>0?f(100*Math.abs(bf-bs)/bs,1)+' %':'–');
 }else $('s2').innerHTML='';
 plot2()}
function plot2(){
 const cv=$('cI'),r=devicePixelRatio||1,w=cv.clientWidth,h=cv.clientHeight;cv.width=w*r;cv.height=h*r;
 const g=cv.getContext('2d'),cs=getComputedStyle(document.documentElement),C=n=>cs.getPropertyValue(n).trim();g.scale(r,r);
 if(!R2.length)return;
 const xm=Math.max(...R2.map(q=>q.I))*1.1||1,ym=Math.max(...R2.map(q=>q.F))*1.1||1,X=v=>44+(w-54)*v/xm,Y=v=>h-26-(h-36)*v/ym,
  k=R2.reduce((s,q)=>s+q.I*q.F,0)/(R2.reduce((s,q)=>s+q.I*q.I,0)||1);
 g.font='11px system-ui,sans-serif';g.strokeStyle=C('--line');g.beginPath();g.moveTo(44,8);g.lineTo(44,h-26);g.lineTo(w-8,h-26);g.stroke();
 g.fillStyle=C('--mut');g.fillText('F (mN)',4,14);g.fillText('I (A)',w-40,h-8);g.fillText('0',36,h-12);
 g.strokeStyle=C('--f');g.lineWidth=2;g.setLineDash([6,4]);g.beginPath();g.moveTo(X(0),Y(0));g.lineTo(X(xm),Y(k*xm));g.stroke();g.setLineDash([]);
 g.fillStyle=C('--b');R2.forEach(q=>{g.beginPath();g.arc(X(q.I),Y(q.F),4,0,7);g.fill()})}
$('add').onclick=()=>{
 const p=D[D.length-1],dm=$('dm').value;let F;
 if(dm!=='')F=Math.abs(+dm)*9.81;
 else{if(!p)return;const w=D.filter(q=>q.t>p.t-.5);F=w.reduce((s,q)=>s+q.F,0)/w.length}
 R2.push({I:Math.abs(+$('I').value||0),F});r2()};
$('del').onclick=()=>{R2.length=0;r2()};
$('l').addEventListener('change',r2);addEventListener('resize',plot2);r2();
})();

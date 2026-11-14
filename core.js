const $=i=>document.getElementById(i),f=(x,n=2)=>isFinite(x)?(+x.toFixed(n)?x.toFixed(n):(0).toFixed(n)):'–',W=200,
row=(a,b)=>'<dt>'+a+'</dt><dd>'+b+'</dd>',rowg=(a,b)=>'<dt class="gv">'+a+'</dt><dd class="gv">'+b+'</dd>',
ms=a=>{const m=a.reduce((s,v)=>s+v,0)/a.length;return[m,Math.sqrt(a.reduce((s,v)=>s+(v-m)**2,0)/Math.max(a.length-1,1))]},
ST=(on,t)=>{$('pill').className='pill'+(on?' on':'');$('stt').textContent=t},
H={demo:'Dữ liệu giả lập để thử giao diện, không cần phần cứng.',ws:'Nhập IP:cổng của ESP32 (chế độ AP thường là 192.168.4.1:81). Trang https (như trên Google) bị trình duyệt chặn ws://: hãy cho phép “Nội dung không an toàn” cho trang, hoặc mở trang do chính ESP32 phát tại http://192.168.4.1.',ser:'Cắm cáp USB, chọn cổng COM của ESP32 (115200 baud). Dùng được trên Chrome hoặc Edge máy tính.'};
const DIR=(x,y,z)=>{const v=$('dir').value;if(v!='a')return v.split(',').map(Number);
 const m=Math.hypot(x,y,z)||1,b=[x/m,y/m,z/m],h=Math.abs(b[1])<.9?[0,1,0]:[1,0,0],
 u=[b[1]*h[2]-b[2]*h[1],b[2]*h[0]-b[0]*h[2],b[0]*h[1]-b[1]*h[0]],k=Math.hypot(...u)||1,A=(+$('al').value||0)*Math.PI/180;
 return b.map((c,i)=>c*Math.cos(A)+u[i]/k*Math.sin(A))};
let Ion=false,sg=1,D=[],o={x:0,y:0,z:0,F:0},last={x:0,y:0,z:0,F:0},t0=0,tm=null,ws=null,port=null,rd=null,done=null,pend=false,rc=null;

function push(d){
 if(!d||!('Bx' in d||'By' in d||'B' in d||'F' in d))return;
 const g=k=>Number.isFinite(+d[k])?+d[k]:0;
 last={x:g('Bx'),y:('By' in d)?g('By'):g('B'),z:g('Bz'),F:g('F')};
 const kb=+$('kB').value||1,kf=+$('kF').value||1,
  x=(last.x-o.x)*kb,y=(last.y-o.y)*kb,z=(last.z-o.z)*kb,F=Math.abs((last.F-o.F)*kf),
  L=DIR(x,y,z),
  n=[L[1]*z-L[2]*y,L[2]*x-L[0]*z,L[0]*y-L[1]*x],c=Math.hypot(...n),
  I=+$('I').value||0,l=+$('l').value||0;
 if(!t0)t0=performance.now();
 D.push({t:(performance.now()-t0)/1e3,x,y,z,B:Math.hypot(x,y,z),F,Flt:c*I*l/100,n,a:Math.atan2(c,L[0]*x+L[1]*y+L[2]*z)*180/Math.PI});
 if(D.length>6000)D.splice(0,1000);
 if(!pend){pend=true;requestAnimationFrame(ui)}
}
function feed(s){s=s.trim();if(!s)return;try{if(s[0]=='{')push(JSON.parse(s));else{const a=s.split(',').map(Number);if(a.length>=4&&a.every(isFinite))push({Bx:a[0],By:a[1],Bz:a[2],F:a[3]})}}catch(e){}}


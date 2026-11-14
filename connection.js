async function stop(){
 clearInterval(tm);tm=null;clearTimeout(rc);
 if(ws){ws.onclose=ws.onerror=null;ws.close();ws=null}
 if(rd){try{await rd.cancel()}catch(e){}rd=null;try{await done}catch(e){}try{await port.close()}catch(e){}port=null}
 ST(false,'Chưa kết nối');$('go').textContent='Kết nối';
}
async function start(){
 await stop();const m=$('mode').value;
 if(m=='demo'){
  let k=0;
  tm=setInterval(()=>{k+=.1;const R=()=>Math.random()-.5,x=5*Math.sin(.5*k),y=40+25*Math.sin(.4*k),z=3*Math.cos(.3*k),
   L=DIR(x,y,z),n=[L[1]*z-L[2]*y,L[2]*x-L[0]*z,L[0]*y-L[1]*x],I=+$('I').value||0,l=+$('l').value||0;
   push({Bx:sg*(x+R()),By:sg*(y+R()),Bz:sg*(z+R()),F:(Ion?1:0)*1.03*Math.hypot(...n)*I*l/100+.1*R()})},100);
  ST(true,'Đang chạy Demo');$('go').textContent='Ngắt';
 }else if(m=='ws'){
  ST(false,'Đang kết nối…');
  try{ws=new WebSocket('ws://'+$('ip').value.trim())}catch(e){ST(false,location.protocol=='https:'?'Trình duyệt chặn ws:// trên trang https':'Địa chỉ không hợp lệ');return}
  ws.onopen=()=>{ST(true,'Đã kết nối Wi-Fi');$('go').textContent='Ngắt'};
  ws.onmessage=e=>String(e.data).split('\n').forEach(feed);
  ws.onclose=ws.onerror=()=>{if(!ws)return;ST(false,'Không kết nối được');$('go').textContent='Kết nối';ws=null;rc=setTimeout(start,2000);$('go').textContent='Ngắt';ST(false,'Mất kết nối, đang thử lại…')};
 }else{
  if(!navigator.serial){ST(false,'Trình duyệt không hỗ trợ Web Serial');return}
  try{
   port=await navigator.serial.requestPort();await port.open({baudRate:115200});
   const dec=new TextDecoderStream();done=port.readable.pipeTo(dec.writable);rd=dec.readable.getReader();
   ST(true,'Đã kết nối USB');$('go').textContent='Ngắt';
   let buf='';
   for(;;){const{value,done:dn}=await rd.read();if(dn)break;buf+=value;if(buf.length>8000)buf='';let i;while((i=buf.indexOf('\n'))>=0){feed(buf.slice(0,i));buf=buf.slice(i+1)}}
  }catch(e){ST(false,'Không mở được cổng USB')}
 }
}


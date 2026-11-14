$('go').onclick=()=>$('go').textContent=='Kết nối'?start():stop();
$('mode').onchange=()=>{$('hint').textContent=H[$('mode').value];$('ip').hidden=$('mode').value!='ws';$('mode').value=='demo'?start():stop()};
$('tare').onclick=()=>{o={...last}};
$('dir').add(new Option('theo góc α','a'));
$('al').oninput=()=>{$('alv').textContent=$('al').value;$('dir').value='a'};
['I','l'].forEach(i=>$(i).onchange=()=>{if(!(+$(i).value>=0))$(i).value=0});
navigator.serial&&navigator.serial.addEventListener('disconnect',()=>stop().then(()=>ST(false,'Đã rút cáp USB')));
$('clr').onclick=()=>{D=[];t0=0;plot($('cB'),[]);plot($('cF'),[]);$('cnt').textContent='0 mẫu'};
$('exp').onclick=()=>{
 const t='t_s,Bx_mT,By_mT,Bz_mT,B_mT,F_do_mN,F_lt_mN\n'+D.map(p=>[p.t,p.x,p.y,p.z,p.B,p.F,p.Flt].map(v=>v.toFixed(4)).join(',')).join('\n');
 $('hp').hidden=$('ta').hidden=false;$('ta').value=t;$('ta').select();
 try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv'}));a.download='tu-truong.csv';a.click()}catch(e){}
};


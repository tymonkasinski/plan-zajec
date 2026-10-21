(function(root){
  const D=typeof module!=='undefined'?require('./data.js'):root.PLAN_DATA;
  const defaults={dean:3,latin:3,language:null};
  const minutes=t=>Number(t.slice(0,2))*60+Number(t.slice(3,5));
  function addDays(day,n){const d=new Date(day+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);}
  const weekday=day=>new Date(day+'T12:00:00Z').getUTCDay();
  const monday=day=>addDays(day,-((weekday(day)+6)%7));
  function nowParts(date=new Date()){
    const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Warsaw',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date).map(x=>[x.type,x.value]));
    return {day:`${p.year}-${p.month}-${p.day}`,time:`${p.hour}:${p.minute}`,minute:Number(p.hour)*60+Number(p.minute),second:Number(p.second)};
  }
  function dayInfo(day){
    if(day<D.meta.from||day>D.meta.to)return {closed:true,reason:'Poza semestrem zimowym 2026/2027'};
    const closed=D.closures.find(x=>day>=x.from&&day<=x.to);
    if(closed)return {closed:true,reason:closed.reason};
    if([0,6].includes(weekday(day)))return {closed:true,reason:'Weekend · bez zajęć'};
    return {closed:false,day:D.substitutions[day]||weekday(day),substitution:D.substitutions[day]};
  }
  function applies(r,day,info,settings){
    if(r.day!==info.day || r.dean&&r.dean!==Number(settings.dean) || r.latin&&r.latin!==Number(settings.latin))return false;
    if(r.dates)return r.dates.includes(day);
    if(r.ranges)return r.ranges.some(([from,to])=>day>=from&&day<=to);
    return day>=(r.from||D.meta.from)&&day<=(r.to||D.meta.to);
  }
  function eventsOn(day,settings=defaults){
    settings={...defaults,...settings};const info=dayInfo(day);if(info.closed)return [];
    const rules=D.rules.filter(r=>applies(r,day,info,settings));
    const lang=settings.language;
    if(info.day===(lang?Number(lang.day):4))rules.push(lang?{
      id:'language',title:lang.name||'Język obcy I',kind:'Lektorat',color:'teal',day:Number(lang.day),start:lang.start,end:lang.end,building:'sjo',room:lang.room||'wg USOSweb',from:lang.from,to:lang.to,userConfirmed:true,note:'Termin wpisany przez użytkownika na podstawie USOSweb. Adres wg PDF: Obrońców Tobruku 3.'
    }:{id:'language-window',title:'Język obcy I · sprawdź USOS',short:'Okno lektoratu',kind:'Do potwierdzenia',color:'uncertain',day:4,start:'08:00',end:'11:15',building:'sjo',room:'ustalana w USOSweb',uncertain:true,note:'08:00–11:15 to okno z siatki PDF, a nie potwierdzony czas trwania zajęć. Dokładna godzina, sala i grupa wynikają z zapisu w USOSweb.'});
    return rules.filter(r=>!r.userConfirmed||day>=(r.from||D.meta.from)&&day<=(r.to||D.meta.to)).map(r=>({...r,date:day,key:day+':'+r.id,planDay:info.day,substitution:info.substitution,group:r.group||(r.dean?'D'+r.dean:r.latin?'Ł'+r.latin:'Cały rocznik')})).sort((a,b)=>minutes(a.start)-minutes(b.start)||a.id.localeCompare(b.id));
  }
  function eventsBetween(from,to,settings){const events=[];for(let day=from;day<=to;day=addDays(day,1))events.push(...eventsOn(day,settings));return events;}
  const weekEvents=(day,settings)=>eventsBetween(monday(day),addDays(monday(day),6),settings);
  function live(settings,now=nowParts()){
    const events=eventsBetween(now.day>D.meta.from?now.day:D.meta.from,D.meta.to,settings).filter(e=>!e.uncertain);
    return {current:events.filter(e=>e.date===now.day&&minutes(e.start)<=now.minute&&minutes(e.end)>now.minute),next:events.find(e=>e.date>now.day||minutes(e.start)>now.minute)||null};
  }
  function status(e,now,next){
    if(e.uncertain)return 'Niepotwierdzone';
    if(e.date<now.day||e.date===now.day&&minutes(e.end)<=now.minute)return 'Zakończone';
    if(e.date===now.day&&minutes(e.start)<=now.minute&&minutes(e.end)>now.minute)return 'Trwa';
    if(e.key===next?.key)return 'Najbliższe';
    return 'Zaplanowane';
  }
  function conflicts(events){return events.filter((a,i)=>!a.uncertain&&events.some((b,j)=>j!==i&&!b.uncertain&&a.date===b.date&&minutes(a.start)<minutes(b.end)&&minutes(b.start)<minutes(a.end)));}
  const api={defaults,minutes,addDays,weekday,monday,nowParts,dayInfo,eventsOn,eventsBetween,weekEvents,live,status,conflicts};
  if(typeof module!=='undefined')module.exports=api;root.PlanEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this);

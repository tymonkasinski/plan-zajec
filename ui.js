(() => {
  'use strict';
  const E=PlanEngine,D=PLAN_DATA,$=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let storage;try{storage=localStorage;}catch{}
  const preferences=PlanPreferences.load(storage);
  let settings=preferences.profiles[preferences.selectedLab];
  function persist(){preferences.selectedLab=settings.lab;preferences.profiles[settings.lab]=settings;return PlanPreferences.save(storage,preferences);}
  let now=E.nowParts(),week=E.monday(now.day),selectedDay=now.day,selectedKey=null,events=[],liveState,map,markers=[],line,focusKey=null;
  const dayNames=['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'];
  const shortNames=['Niedz.','Pon.','Wt.','Śr.','Czw.','Pt.','Sob.'];
  function fmt(day,options={day:'numeric',month:'long'}){return new Intl.DateTimeFormat('pl-PL',{timeZone:'UTC',...options}).format(new Date(day+'T12:00:00Z'));}
  const timeRange=e=>`${e.start}–${e.end}`;
  function dayEvents(){return events.filter(e=>e.date===selectedDay);}
  function selected(){return events.find(e=>e.key===selectedKey)||null;}
  function openDialog(id){const dialog=$(id);if(!dialog.open)dialog.showModal();}
  function setWeek(day,prefer){
    week=E.monday(day);selectedDay=day;selectedKey=prefer||null;render();
  }
  function pick(e,scroll=false){
    selectedDay=e.date;selectedKey=e.key;
    document.querySelectorAll('.event').forEach(b=>b.classList.toggle('selected',b.dataset.key===selectedKey));
    document.querySelectorAll('.day-heading').forEach(b=>b.classList.toggle('selected-day',b.dataset.day===selectedDay));
    renderJourney();
    if(scroll){const el=[...document.querySelectorAll('.event')].find(b=>b.dataset.key===selectedKey);el?.scrollIntoView({block:'center',inline:'nearest',behavior:'smooth'});}
  }
  function renderLive(){
    liveState=E.live(settings,now);
    const running=liveState.current[0],next=liveState.next;
    const target=running||next;
    $('#clock-time').textContent=now.time;
    $('#clock-date').textContent=fmt(now.day,{weekday:'long',day:'numeric',month:'long',year:'numeric'});
    if(running)$('#live-summary').innerHTML=`<strong>Trwa teraz · ${esc(running.title)}</strong><p>${timeRange(running)} · sala ${esc(running.room)} · ${esc(D.buildings[running.building].short)}${next?' · Dalej: '+esc(next.start)+' '+esc(next.short||next.title):''}</p>`;
    else if(next)$('#live-summary').innerHTML=`<strong>Najbliższe · ${esc(next.title)}</strong><p>${next.date===now.day?'Dzisiaj':esc(fmt(next.date,{weekday:'long',day:'numeric',month:'long'}))} · ${timeRange(next)} · sala ${esc(next.room)} · ${esc(D.buildings[next.building].short)}</p>`;
    else $('#live-summary').innerHTML='<strong>Brak kolejnych potwierdzonych zajęć w tym semestrze</strong><p>Zakres planu: 1 października 2026 – 31 stycznia 2027. Lektorat sprawdź w USOSweb.</p>';
    $('#go-live').disabled=!target;
  }
  function jumpLive(){const e=liveState.current[0]||liveState.next;if(e){setWeek(e.date,e.key);pick(e,true);}}
  function render(){
    now=E.nowParts();renderLive();events=E.weekEvents(week,settings);
    const weekEnd=E.addDays(week,6);$('#date').value=selectedDay;
    $('#week-title').textContent=`${fmt(week,{day:'numeric',month:'short'})} – ${fmt(weekEnd,{day:'numeric',month:'short',year:'numeric'})}`;
    $('#lab-group').value=settings.lab;$('#lab-summary').textContent=`Grupa ćwiczeniowa ${settings.lab}`;
    $('#group-summary').textContent=`D${settings.dean||' —'} · Ł${settings.latin||' —'}`;
    $('#profile-groups').textContent=`D${settings.dean||' —'} · Ł${settings.latin||' —'}`;
    const warnings=[];
    if(!settings.dean||!settings.latin)warnings.push(`Grupa ćw. ${settings.lab}: ${!settings.dean?'wybierz grupę D, aby dodać matematykę i IT. ':''}${!settings.latin?'Wybierz grupę Ł, aby dodać łacinę. ':''}Przydziały uzupełnisz w „Grupy i lektorat”.`);
    if(weekEnd<D.meta.from||week>D.meta.to)warnings.push('Ten tydzień jest poza zakresem planu. Dostępny semestr: 01.10.2026–31.01.2027.');
    if(week<='2026-10-05'&&weekEnd>='2026-10-05')warnings.push('5.10: PDF wymienia inaugurację wydziałową; godzina wymaga sprawdzenia w ogłoszeniu.');
    if(week<='2026-12-16'&&weekEnd>='2026-12-16')warnings.push('Do wyjaśnienia: PDF podaje 16.12 w piątkowym bloku chemii organicznej. 16.12 to środa. Nie dodano pewnego wykładu 16 ani 18.12.');
    for(let day=week;day<=weekEnd;day=E.addDays(day,1)){const info=E.dayInfo(day);if(info.substitution)warnings.push(`${fmt(day)}: obowiązuje plan ${info.substitution===1?'poniedziałkowy':'środowy'}.`);}
    if(E.conflicts(events).length)warnings.push('Uwaga: potwierdzone zajęcia nakładają się. Sprawdź przydział D/Ł lub wpisany termin lektoratu.');
    $('#week-notice').textContent=warnings.join(' ');$('#week-notice').classList.toggle('visible',!!warnings.length);
    if(!selected()){
      const todays=events.filter(e=>e.date===selectedDay);
      selectedKey=(todays.find(e=>!e.uncertain&&(e.date>now.day||e.date===now.day&&E.minutes(e.end)>now.minute))||todays[0]||null)?.key||null;
    }
    const calendar=$('#calendar');calendar.replaceChildren();
    const hourHead=document.createElement('div');hourHead.className='day-heading';hourHead.textContent='GODZ.';hourHead.title='Godziny Europe/Warsaw (CET/CEST)';calendar.append(hourHead);
    for(let i=0;i<7;i++){
      const day=E.addDays(week,i),info=E.dayInfo(day),head=document.createElement('button');
      head.className='day-heading'+(day===now.day?' today':'')+(day===selectedDay?' selected-day':'');head.dataset.day=day;
      head.innerHTML=`<span>${shortNames[E.weekday(day)]}</span><b>${Number(day.slice(-2))}</b>${info.substitution?'<small>plan '+(info.substitution===1?'pon.':'śr.')+'</small>':''}`;
      head.setAttribute('aria-label',fmt(day,{weekday:'long',day:'numeric',month:'long'}));
      head.onclick=()=>{selectedDay=day;selectedKey=events.find(e=>e.date===day)?.key||null;render();};calendar.append(head);
    }
    const gutter=document.createElement('div');gutter.className='hour-gutter';
    for(let h=7;h<=20;h++){const label=document.createElement('div');label.className='hour-label';label.style.top=`${(h-7)*76}px`;label.textContent=String(h).padStart(2,'0')+':00';gutter.append(label);}calendar.append(gutter);
    for(let i=0;i<7;i++){
      const day=E.addDays(week,i),info=E.dayInfo(day),column=document.createElement('div');
      column.className='day-column'+(day===now.day?' today':'')+([0,6].includes(E.weekday(day))?' weekend':'');column.dataset.day=day;
      const entries=events.filter(e=>e.date===day);
      if(!entries.length){const empty=document.createElement('div');empty.className='empty-day';empty.textContent=info.reason||'Bez zajęć z PDF';column.append(empty);}
      entries.forEach(e=>{
        const status=E.status(e,now,liveState.next),button=document.createElement('button');button.dataset.key=e.key;
        button.className=`event ${e.color}${status==='Zakończone'?' finished':''}${status==='Trwa'?' ongoing':''}${e.key===selectedKey?' selected':''}`;
        button.style.top=`${(E.minutes(e.start)-420)*76/60}px`;button.style.height=`${(E.minutes(e.end)-E.minutes(e.start))*76/60-4}px`;
        const overlap=entries.filter(x=>!x.uncertain&&!e.uncertain&&E.minutes(x.start)<E.minutes(e.end)&&E.minutes(e.start)<E.minutes(x.end));
        if(overlap.length>1){const idx=overlap.indexOf(e);button.style.left=`calc(${idx*100/overlap.length}% + 3px)`;button.style.width=`calc(${100/overlap.length}% - 6px)`;button.style.right='auto';}
        button.innerHTML=`<span class="event-time">${timeRange(e)}${e.uncertain?' ?':''}</span><strong>${esc(e.short||e.title)}</strong><span class="kind">${esc(e.kind)}</span><span class="room">${esc(e.uncertain?'Termin wg USOSweb':'s. '+e.room)}<br>${esc(D.buildings[e.building].short)}</span><span class="badge">${esc(status)}</span>`;
        button.title=`${e.title}\n${day} ${timeRange(e)}\n${D.buildings[e.building].address}, sala ${e.room}\n${e.group} · ${status}`;
        button.setAttribute('aria-label',button.title);button.onclick=()=>pick(e);column.append(button);
      });
      if(day===now.day&&now.minute>=420&&now.minute<1260){const line=document.createElement('div');line.className='now-line';line.style.top=`${(now.minute-420)*76/60}px`;line.innerHTML=`<span>${now.time}</span>`;column.append(line);}
      calendar.append(column);
    }
    const certain=events.filter(e=>!e.uncertain),total=certain.reduce((n,e)=>n+E.minutes(e.end)-E.minutes(e.start),0);
    const noun={one:'zajęcie',few:'zajęcia',many:'zajęć',other:'zajęć'}[new Intl.PluralRules('pl').select(certain.length)];
    $('#week-stats').textContent=`${certain.length} ${noun} · ${Math.floor(total/60)} godz. ${total%60?total%60+' min':''}${events.some(e=>e.uncertain)?' · lektorat do potwierdzenia':''}`;
    renderJourney();
  }
  function renderJourney(){
    const e=selected(),entries=dayEvents(),index=entries.findIndex(x=>x.key===selectedKey);
    $('#journey-day').textContent=fmt(selectedDay,{weekday:'long',day:'numeric',month:'long'});
    $('#event-counter').textContent=entries.length?`Zajęcia ${index+1} z ${entries.length}`:'Brak zajęć tego dnia';
    $('#prev-event').disabled=index<=0;$('#next-event').disabled=index<0||index>=entries.length-1;
    if(e){
      const b=D.buildings[e.building],status=E.status(e,now,liveState.next),prev=entries[index-1];
      const destination=encodeURIComponent(b.address),origin=prev?encodeURIComponent(D.buildings[prev.building].address):'';
      const url=`https://maps.apple.com/?daddr=${destination}&dirflg=w${origin?'&saddr='+origin:''}`;
      $('#detail').innerHTML=`<div class="detail-card ${esc(e.color)}"><span class="eyebrow">${esc(status)} · ${esc(e.group)}</span><h3>${esc(e.title)}</h3><div class="detail-time">${timeRange(e)}${e.uncertain?' ?':''}</div><div class="detail-place"><b>${esc(b.name)} · sala ${esc(e.room)}</b>${esc(b.address)}</div><p class="detail-note">${esc(e.note)}</p><a href="${url}" target="_blank" rel="noopener">${prev?'Trasa od poprzednich zajęć':'Dojście w Mapach Apple'} ↗</a><div class="source-row">${e.userConfirmed?'Termin wpisany przez użytkownika':`PDF · strona ${e.source?.page||2}${e.source?.x?' · krawędzie x: '+e.source.x.join('–')+' pt':''}`}</div></div>`;
    }else $('#detail').innerHTML=`<div class="detail-card"><h3>Chwila oddechu.</h3><p class="detail-note">${esc(E.dayInfo(selectedDay).reason||'Na ten dzień nie ma zajęć w wybranym planie.')} Wybierz inny dzień lub kolejne zajęcia.</p></div>`;
    $('#itinerary').replaceChildren();
    entries.forEach((item,i)=>{const b=document.createElement('button');b.className='journey-event'+(item.key===selectedKey?' active':'');b.innerHTML=`<span class="step">${i+1}</span><span><strong>${esc(item.short||item.title)}${item.uncertain?' ?':''}</strong><small>${timeRange(item)} · s. ${esc(item.room)}</small></span>`;b.onclick=()=>pick(item,true);$('#itinerary').append(b);});
    updateMap(entries,e);
  }
  function initMap(){
    if(typeof L==='undefined'){$('#map-message').textContent='Mapa niedostępna. Adresy budynków znajdziesz poniżej.';return;}
    map=L.map('map',{zoomControl:true,scrollWheelZoom:false}).setView([53.7568,20.461],15);
    L.control.scale({imperial:false,position:'bottomleft'}).addTo(map);
    const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    tiles.on('tileerror',()=>{$('#map-message').textContent='Brak mapy bazowej. Zapisane punkty budynków nadal działają; użyj +/− i przeciągania.';});
    tiles.on('tileload',()=>{$('#map-message').textContent='Kortowo · przeciągnij mapę lub użyj +/−. Wybierz zajęcia, aby wskazać budynek.';});
    L.rectangle([[53.751,20.447],[53.766,20.474]],{color:'#c2d2bf',weight:1,fillOpacity:0.03,interactive:false}).addTo(map);
  }
  function updateMap(entries,selectedEvent){
    if(!map)return;markers.forEach(m=>map.removeLayer(m));markers=[];if(line){map.removeLayer(line);line=null;}
    const coords=globalThis.BUILDING_COORDS||{},points=[];
    const grouped=new Map();entries.forEach((e,i)=>{if(!grouped.has(e.building))grouped.set(e.building,[]);grouped.get(e.building).push({e,i});});
    for(const [building,items] of grouped){
      const c=coords[building];if(!c)continue;
      const active=selectedEvent?.building===building,pos=[c.lat,c.lon];points.push(pos);
      const m=L.marker(pos,{icon:L.divIcon({className:'',html:`<div class="map-pin${active?' active':''}">${items.map(x=>x.i+1).join('·')}</div>`,iconSize:[25,25],iconAnchor:[12,12]})}).addTo(map);
      m.bindTooltip(`${D.buildings[building].short} · ${items.map(x=>x.e.start).join(', ')}`);
      m.on('click',()=>{const next=items.find(x=>x.e.key!==selectedKey)||items[0];pick(next.e);});markers.push(m);
    }
    const route=entries.map(e=>coords[e.building]).filter(Boolean).map(c=>[c.lat,c.lon]);
    if(route.length>1)line=L.polyline(route,{color:'#578b77',weight:2,dashArray:'5,8',opacity:.6,interactive:false}).addTo(map);
    const newFocus=selectedDay+':'+(selectedEvent?.building||'none');
    if(newFocus!==focusKey){
      if(points.length>1)map.fitBounds(points,{padding:[35,35],maxZoom:16});
      else if(points.length)map.setView(points[0],16);
      else map.setView([53.7575,20.460],14);
      focusKey=newFocus;
    }
  }
  function showSettings(){
    const form=$('#settings-form'),f=form.elements;f.dean.value=settings.dean||'';f.latin.value=settings.latin||'';f.confirmed.checked=!!settings.language;
    $('#settings-lab').textContent=settings.lab;
    $('#language-fields').disabled=!settings.language;
    const lang=settings.language;
    f.languageName.value=lang?.name||'';f.languageDay.value=lang?.day||4;f.start.value=lang?.start||'08:00';f.end.value=lang?.end||'09:30';f.room.value=lang?.room||'';f.from.value=lang?.from||D.meta.from;f.to.value=lang?.to||D.meta.to;
    $('#settings-error').textContent='';openDialog('#settings-dialog');
  }
  $('#settings-form').elements.confirmed.onchange=e=>{$('#language-fields').disabled=!e.target.checked;};
  $('#settings-form').onsubmit=event=>{
    event.preventDefault();const f=event.target.elements;
    if(f.confirmed.checked&&(f.start.value>=f.end.value||f.from.value>f.to.value)){$('#settings-error').textContent='Koniec musi być późniejszy od początku, a zakres dat musi być poprawny.';return;}
    settings={lab:settings.lab,dean:Number(f.dean.value)||null,latin:Number(f.latin.value)||null,language:f.confirmed.checked?{name:f.languageName.value.trim(),day:Number(f.languageDay.value),start:f.start.value,end:f.end.value,room:f.room.value.trim(),from:f.from.value,to:f.to.value}:null};
    if(!persist()){$('#settings-error').textContent='Nie można zapisać ustawień na dysku. Zmiany działają tylko do zamknięcia aplikacji.';render();return;}
    $('#settings-dialog').close();render();
  };
  $('#prev-week').onclick=()=>setWeek(E.addDays(selectedDay,-7));$('#next-week').onclick=()=>setWeek(E.addDays(selectedDay,7));
  $('#today').onclick=()=>setWeek(E.nowParts().day);$('#nav-plan').onclick=()=>$('#calendar-scroll').scrollIntoView({block:'nearest',behavior:'smooth'});
  $('#date').onchange=e=>{if(/^\d{4}-\d{2}-\d{2}$/.test(e.target.value))setWeek(e.target.value);};
  $('#go-live').onclick=jumpLive;$('#nav-next').onclick=jumpLive;
  $('#nav-settings').onclick=showSettings;$('#edit-groups').onclick=showSettings;$('#profile-settings').onclick=showSettings;
  $('#lab-group').onchange=event=>{
    const lab=Number(event.target.value);if(!D.groups.lab.includes(lab))return;
    preferences.profiles[settings.lab]=settings;settings=preferences.profiles[lab]||PlanPreferences.forLab(lab);
    selectedKey=null;focusKey=null;persist();render();
  };
  $('#nav-sources').onclick=()=>openDialog('#sources-dialog');$('#anomaly-info').onclick=()=>openDialog('#sources-dialog');
  document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
  $('#prev-event').onclick=()=>{const list=dayEvents(),i=list.findIndex(e=>e.key===selectedKey);if(i>0)pick(list[i-1],true);};
  $('#next-event').onclick=()=>{const list=dayEvents(),i=list.findIndex(e=>e.key===selectedKey);if(i>=0&&i<list.length-1)pick(list[i+1],true);};
  initMap();render();
  setInterval(()=>{const updated=E.nowParts();if(updated.day!==now.day||updated.time!==now.time)render();},1000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});
  // Read-only diagnostics for the macOS launch smoke test and browser checks.
  globalThis.planDiagnostics=()=>({week,selectedDay,selectedKey,events:events.length,settings,now,mapReady:!!map,errors:[]});
})();

(function(root) {
  const data = {
    meta: {
      title: 'Plan zajęć', course: 'Biotechnologia · UWM', year: 'I rok · semestr zimowy 2026/2027',
      from: '2026-10-01', to: '2027-01-31', checked: '2026-10-21', pdfDate: '2026-09-29',
      pdf: 'https://wbib.uwm.edu.pl/sites/default/files/u1170/i_bt_inz_16.pdf',
      calendar: 'https://uwm.edu.pl/ksztalcenie/ramowa-organizacja-roku-akademickiego',
      language: 'https://usosweb.uwm.edu.pl/'
    },
    groups: {lab:[1,2,3,4,5,6,7],dean:[1,2,3,4,5,6],latin:[1,2,3,4,5]},
    buildings: {
      cb: {name:'Collegium Biologiae', address:'Michała Oczapowskiego 1A, Olsztyn', short:'Oczapowskiego 1A'},
      pl1: {name:'Botanika', address:'Plac Łódzki 1, Olsztyn', short:'Plac Łódzki 1'},
      pl3: {name:'Histologia', address:'Plac Łódzki 3, Olsztyn', short:'Plac Łódzki 3'},
      pl4: {name:'Chemia', address:'Plac Łódzki 4, Olsztyn', short:'Plac Łódzki 4'},
      o5: {name:'Morfologia zwierząt', address:'Michała Oczapowskiego 5, Olsztyn', short:'Oczapowskiego 5'},
      s54: {name:'Matematyka i informatyka', address:'Słoneczna 54, Olsztyn', short:'Słoneczna 54'},
      wh: {name:'Wydział Humanistyczny', address:'Kurta Obitza 1, Olsztyn', short:'Obitza 1 · WH'},
      sjo: {name:'Studium Języków Obcych', address:'Obrońców Tobruku 3, Olsztyn', short:'Obrońców Tobruku 3'}
    },
    closures: [
      {from:'2026-11-02',to:'2026-11-02',reason:'Dzień Rektorski'},
      {from:'2026-11-11',to:'2026-11-11',reason:'Święto Niepodległości'},
      {from:'2026-12-24',to:'2027-01-06',reason:'Przerwa świąteczna'}
    ],
    substitutions: {'2027-01-07':1,'2027-01-08':3},
    rules: [
      {id:'math-w',title:'Matematyka',kind:'Wykład',color:'blue',day:1,start:'07:30',end:'09:00',building:'cb',room:'Aula',from:'2026-10-12',source:{page:1,x:[48.96,98.76]},note:'Wspólny wykład dla roku. Od 12.10.'},
      {id:'general-w',title:'Chemia ogólna',kind:'Wykład',color:'orange',day:1,start:'09:15',end:'11:30',building:'cb',room:'Aula',from:'2026-10-12',source:{page:1,x:[106.94,181.58]},note:'Wspólny wykład dla roku. Od 12.10.'},
      {id:'animal-w',title:'Morfologia funkcjonalna zwierząt',short:'Morfologia zwierząt',kind:'Wykład',color:'green',day:1,start:'11:45',end:'13:15',building:'cb',room:'Aula',from:'2026-10-12',source:{page:1,x:[189.74,239.56]},note:'Wspólny wykład. PDF: 5.10 – wydziałowa inauguracja roku, wykłady od 12.10.'},
      {id:'plant-w',title:'Morfologia funkcjonalna roślin',short:'Morfologia roślin',kind:'Wykład',color:'green',day:1,start:'14:00',end:'15:30',building:'cb',room:'P13',from:'2026-10-12',to:'2026-12-21',source:{page:1,x:[264.29,314.11]},note:'Wykład od 12.10 do 21.12. W PDF: 5.10 – wydziałowa inauguracja roku.'},
      {id:'organic-lab',title:'Chemia organiczna',kind:'Laboratorium',color:'orange',day:2,start:'08:15',end:'12:00',building:'cb',room:'327',ranges:[['2026-11-17','2026-12-15'],['2027-01-12','2027-01-26']],group:'Ćw. 3',source:{page:1,x:[73.8,198.14]},note:'Ćwiczenia: wiersz 3, nie wiersz 4. Dwa rozłączne zakresy dat.'},
      {id:'plant-lab',title:'Morfologia funkcjonalna roślin',short:'Morfologia roślin',kind:'Laboratorium',color:'green',day:2,start:'14:15',end:'16:30',building:'pl1',room:'102',from:'2026-10-13',to:'2026-12-15',group:'Ćw. 3',source:{page:1,x:[272.57,347.23]},note:'Ćwiczenia grupy 3: 13.10–15.12.'},
      {id:'animal-lab',title:'Morfologia funkcjonalna zwierząt',short:'Morfologia zwierząt',kind:'Laboratorium',color:'green',day:2,start:'17:15',end:'18:45',building:'o5',room:'265',group:'Ćw. 3',source:{page:1,x:[371.95,421.77]},note:'PDF nie podaje dodatkowego zakresu dat: przyjęto okres zajęć semestru zimowego.'},
      {id:'general-lab',title:'Chemia ogólna',kind:'Laboratorium',color:'orange',day:3,start:'11:15',end:'14:15',building:'pl4',room:'118',from:'2026-10-28',group:'Ćw. 3',source:{page:1,x:[173.18,272.68]},note:'Od 28.10. Nie mylić z wtorkowym wierszem grupy 4.'},
      {id:'hist-lab',title:'Histologia',kind:'Laboratorium',color:'purple',day:3,start:'14:45',end:'17:45',building:'pl3',room:'319',from:'2026-10-14',to:'2026-11-18',group:'Ćw. 3',source:{page:1,x:[289.13,388.63]},note:'14.10–18.11. Szczegółowy program dostępny na tablicy ogłoszeń przy sali ćwiczeń (** w PDF).'},
      {id:'hist-w',title:'Histologia',kind:'Wykład',color:'purple',day:4,start:'11:30',end:'13:00',building:'cb',room:'Aula',from:'2026-10-01',to:'2026-10-29',source:{page:2,x:[181.46,231.28]},note:'Wykłady tylko 1.10–29.10.'},
      {id:'organic-w',title:'Chemia organiczna',kind:'Wykład',color:'orange',day:5,start:'10:15',end:'12:30',building:'cb',room:'P13',dates:['2026-10-09','2026-10-23','2026-11-06','2026-11-20','2026-12-04','2027-01-15','2027-01-29'],source:{page:2,x:[140.06,214.72]},note:'Wyłącznie jednoznaczne daty z PDF. Wpis „16.12” w bloku piątkowym jest sprzeczny z kalendarzem (środa) i wymaga wyjaśnienia. Nie zamieniono go na 18.12.'},
      {id:'math-c',title:'Matematyka',kind:'Ćwiczenia',color:'blue',day:5,start:'12:45',end:'14:15',building:'s54',room:'D2/14',dean:3,source:{page:2,x:[222.89,272.69]},note:'Grupa dziekańska D3. PDF nie podaje dodatkowego zakresu dat.'},
      {id:'it-c',title:'Technologie informacyjne',kind:'Ćwiczenia',color:'teal',day:5,start:'14:30',end:'16:00',building:'s54',room:'D2/16',dean:3,source:{page:2,x:[280.85,330.67]},note:'Grupa dziekańska D3. PDF nie podaje dodatkowego zakresu dat.'},
      {id:'latin-3',title:'Łacina w naukach biologicznych',short:'Łacina',kind:'Lektorat',color:'teal',day:3,start:'08:00',end:'09:30',building:'wh',room:'16',from:'2026-11-18',to:'2026-12-16',latin:3,source:{page:1,x:[65.52,115.34]},note:'Grupa łacińska Ł3 (w PDF GR.DŁ3). Przynależność do grupy łacińskiej należy potwierdzić osobno.'}
    ]
  };
  // Każdy przedmiot laboratoryjny ma osobne wiersze grup 1–7.
  // x i y są współrzędnymi granic komórki w oryginalnym PDF (punkty typograficzne).
  const group3Y={'organic-lab':295.94,'plant-lab':284.06,'animal-lab':284.06,'general-lab':608.35,'hist-lab':608.35};
  data.rules.filter(r=>r.group==='Ćw. 3').forEach(r=>{r.lab=3;r.source.y=group3Y[r.id];});
  const subjects={
    organic:{title:'Chemia organiczna',color:'orange',building:'cb',room:'327'},
    plant:{title:'Morfologia funkcjonalna roślin',short:'Morfologia roślin',color:'green',building:'pl1',room:'102'},
    animal:{title:'Morfologia funkcjonalna zwierząt',short:'Morfologia zwierząt',color:'green',building:'o5',room:'265'},
    general:{title:'Chemia ogólna',color:'orange',building:'pl4',room:'118'},
    hist:{title:'Histologia',color:'purple',building:'pl3',room:'319'}
  };
  const labRows=[
    // przedmiot, grupa, dzień, od, do, strona, x0, x1, y, okresy [od, do]
    ['general',1,2,'08:00','11:00',1,65.52,165.02,212.30,[['2026-10-27','2027-01-31']]],
    ['plant',1,2,'11:15','13:30',1,173.18,247.84,212.30,[['2026-10-13','2026-12-15']]],
    ['animal',1,2,'15:30','17:00',1,313.99,363.79,212.30],
    ['organic',1,3,'12:00','15:45',1,198.02,322.39,513.67,[['2026-11-18','2026-12-16'],['2027-01-13','2027-01-27']]],
    ['hist',1,3,'18:00','21:00',1,396.82,492.48,490.51,[['2026-10-14','2026-11-18']]],
    ['plant',2,2,'08:45','11:00',1,90.36,165.02,242.18,[['2026-10-13','2026-12-15']]],
    ['hist',2,3,'08:15','11:15',1,73.80,173.30,535.03,[['2026-10-14','2026-11-18']]],
    ['animal',2,3,'11:30','13:00',1,181.46,231.28,535.03],
    ['general',2,3,'14:30','17:30',1,280.85,380.35,535.03,[['2026-10-28','2027-01-31']]],
    ['organic',2,4,'16:00','19:45',2,330.55,454.89,57.00,[['2026-11-19','2026-12-17'],['2027-01-14','2027-01-28']]],
    ['hist',4,2,'08:00','11:00',1,65.52,165.02,316.71,[['2026-10-13','2026-11-10']]],
    ['general',4,2,'11:15','14:15',1,173.18,272.68,316.71,[['2026-10-27','2027-01-31']]],
    ['plant',4,3,'14:00','16:15',1,264.29,338.95,666.94,[['2026-10-14','2026-12-23']]],
    ['animal',4,3,'17:00','18:30',1,363.67,413.49,666.94],
    ['organic',4,4,'11:30','15:15',2,181.46,305.83,171.26,[['2026-11-19','2026-12-17'],['2027-01-14','2027-01-28']]],
    ['organic',5,2,'12:30','16:15',1,214.61,338.95,363.89,[['2026-11-17','2026-12-15'],['2027-01-12','2027-01-26']]],
    ['general',5,2,'17:45','20:45',1,388.51,485.13,363.89,[['2026-10-27','2027-01-31']]],
    ['hist',5,3,'11:30','14:30',1,181.46,280.96,710.86,[['2026-10-14','2026-11-18']]],
    ['animal',5,3,'15:15','16:45',1,305.71,355.51,710.86],
    ['plant',5,4,'15:45','18:00',2,322.27,396.93,206.42,[['2026-10-15','2026-12-17']]],
    ['general',6,2,'14:30','17:30',1,280.85,380.35,396.65,[['2026-10-27','2027-01-31']]],
    ['animal',6,2,'19:00','20:30',1,429.94,477.82,396.65],
    ['plant',6,3,'11:30','13:45',1,181.46,256.12,747.70,[['2026-10-14','2026-12-23']]],
    ['organic',6,3,'16:00','19:45',1,330.55,454.89,758.98,[['2026-11-18','2026-12-16'],['2027-01-13','2027-01-27']]],
    ['hist',6,4,'13:15','16:15',2,239.45,338.95,234.50,[['2026-10-15','2026-11-12']]],
    ['organic',7,2,'16:15','20:00',1,338.83,463.17,458.93,[['2026-11-17','2026-12-15'],['2027-01-12','2027-01-26']]],
    ['animal',7,3,'13:30','15:00',1,247.73,297.55,783.70],
    ['general',7,3,'17:45','20:45',1,388.51,485.13,783.70,[['2026-10-28','2027-01-31']]],
    ['plant',7,4,'13:15','15:30',2,239.45,314.11,265.58,[['2026-10-15','2026-12-17']]],
    ['hist',7,4,'16:30','19:30',2,347.11,446.61,265.58,[['2026-10-15','2026-11-12']]]
  ];
  labRows.forEach(([subject,lab,day,start,end,page,x0,x1,y,ranges])=>{
    const note=ranges?'Okresy z PDF: '+ranges.map(([a,b])=>a+' – '+b).join('; ')+'.':'PDF nie podaje dodatkowego zakresu dat: przyjęto okres zajęć semestru zimowego.';
    data.rules.push({id:subject+'-lab-'+lab,...subjects[subject],kind:'Laboratorium',lab,group:'Ćw. '+lab,day,start,end,ranges,source:{page,x:[x0,x1],y},note:note+(subject==='hist'?' Szczegółowy program na tablicy przy sali ćwiczeń (** w PDF).':'')});
  });
  // Zajęcia dziekańskie są niezależne od numeru grupy laboratoryjnej.
  const maths = [[1,'12:45','14:15','E0/13',222.89,272.69,306.87],[2,'14:30','16:00','E0/13',280.85,330.67,340.73],[4,'08:15','09:45','D2/14',73.80,123.62,391.97],[5,'12:45','14:15','E1/14',222.89,272.69,418.25],[6,'14:30','16:00','E1/14',280.85,330.67,443.93]];
  maths.forEach(([dean,start,end,room,x0,x1,y])=>data.rules.push({id:'math-d'+dean,title:'Matematyka',kind:'Ćwiczenia',color:'blue',day:5,start,end,room,building:'s54',dean,source:{page:2,x:[x0,x1],y},note:'Wiersz grupy dziekańskiej D'+dean+'. Bez dodatkowych dat w PDF.'}));
  [[1,5,'08:30','10:00',82.08,131.90,306.87],[2,5,'12:45','14:15',222.89,272.69,340.73],[4,3,'11:30','13:00',181.46,231.28,666.94],[5,2,'10:15','11:45',140.06,189.86,363.89],[6,2,'12:00','13:30',198.02,247.84,396.65]].forEach(([dean,day,start,end,x0,x1,y])=>data.rules.push({id:'it-d'+dean,title:'Technologie informacyjne',kind:'Ćwiczenia',color:'teal',day,start,end,building:'s54',room:'D2/16',dean,source:{page:day===5?2:1,x:[x0,x1],y},note:'Grupa dziekańska D'+dean+'. Powtórzenia tego samego bloku D w wierszu 7 PDF pokazano tylko raz.'}));
  [[1,3,'09:45','11:15','2026-10-07','2026-11-04',123.50,173.30,490.51],[2,1,'18:30','20:00','2026-11-16','2026-12-14',413.38,463.18,77.40],[4,3,'08:00','09:30','2026-12-23','2027-01-27',65.52,115.34,666.94],[5,1,'18:30','20:00','2026-12-21','2027-01-25',413.38,463.18,153.00]].forEach(([latin,day,start,end,from,to,x0,x1,y])=>data.rules.push({id:'latin-'+latin,title:'Łacina w naukach biologicznych',short:'Łacina',kind:'Lektorat',color:'teal',day,start,end,from,to,latin,building:'wh',room:'16',source:{page:1,x:[x0,x1],y},note:'Grupa Ł'+latin+'. Uwzględniono zamiany dni 7/8.01 z przypisu PDF.'}));
  const sourceY={'general-w':61.2,'animal-w':61.2,'plant-w':61.2,'hist-w':103.2,'organic-w':367.25,'math-c':367.25,'it-c':367.25,'latin-3':608.35};
  data.rules.forEach(r=>{if(sourceY[r.id]!==undefined)r.source.y=sourceY[r.id];});
  if(typeof module!=='undefined') module.exports=data;
  root.PLAN_DATA=data;
})(typeof globalThis!=='undefined'?globalThis:this);

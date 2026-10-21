(function(root) {
  const data = {
    meta: {
      title: 'Plan Tymona', course: 'Biotechnologia · UWM', year: 'I rok · semestr zimowy 2026/2027',
      from: '2026-10-01', to: '2027-01-31', checked: '2026-10-21', pdfDate: '2026-09-29',
      pdf: 'https://wbib.uwm.edu.pl/sites/default/files/u1170/i_bt_inz_16.pdf',
      calendar: 'https://uwm.edu.pl/ksztalcenie/ramowa-organizacja-roku-akademickiego',
      language: 'https://usosweb.uwm.edu.pl/'
    },
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
  // Zajęcia dziekańskie są niezależne od numeru grupy laboratoryjnej.
  const maths = [[1,'12:45','14:15','E0/13'],[2,'14:30','16:00','E0/13'],[4,'08:15','09:45','D2/14'],[5,'12:45','14:15','E1/14'],[6,'14:30','16:00','E1/14']];
  maths.forEach(([dean,start,end,room])=>data.rules.push({id:'math-d'+dean,title:'Matematyka',kind:'Ćwiczenia',color:'blue',day:5,start,end,room,building:'s54',dean,source:{page:2},note:'Wiersz grupy dziekańskiej D'+dean+'. Bez dodatkowych dat w PDF.'}));
  [[1,5,'08:30','10:00'],[2,5,'12:45','14:15'],[4,3,'11:30','13:00'],[5,2,'10:15','11:45'],[6,2,'12:00','13:30']].forEach(([dean,day,start,end])=>data.rules.push({id:'it-d'+dean,title:'Technologie informacyjne',kind:'Ćwiczenia',color:'teal',day,start,end,building:'s54',room:'D2/16',dean,source:{page:day===5?2:1},note:'Grupa dziekańska D'+dean+' (dla grupy laboratoryjnej 7 PDF powtarza bloki D4–D6).'}));
  [[1,3,'09:45','11:15','2026-10-07','2026-11-04'],[2,1,'18:30','20:00','2026-11-16','2026-12-14'],[4,3,'08:00','09:30','2026-12-23','2027-01-27'],[5,1,'18:30','20:00','2026-12-21','2027-01-25']].forEach(([latin,day,start,end,from,to])=>data.rules.push({id:'latin-'+latin,title:'Łacina w naukach biologicznych',short:'Łacina',kind:'Lektorat',color:'teal',day,start,end,from,to,latin,building:'wh',room:'16',source:{page:1},note:'Grupa Ł'+latin+'. Uwzględniono zamiany dni 7/8.01 z przypisu PDF.'}));
  if(typeof module!=='undefined') module.exports=data;
  root.PLAN_DATA=data;
})(typeof globalThis!=='undefined'?globalThis:this);

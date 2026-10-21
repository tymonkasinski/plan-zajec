(function(root){
  const E=typeof module!=='undefined'?require('./engine.js'):root.PlanEngine;
  const KEY='plan-zajec-settings-v2',LEGACY='plan-tymona-settings-v1';
  const forLab=lab=>E.normalizeSettings({lab,dean:Number(lab)===3?3:null,latin:Number(lab)===3?3:null,language:null});
  function language(value){
    if(!value||![1,2,3,4,5].includes(Number(value.day)))return null;
    const clock=t=>typeof t==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(t);
    if(!clock(value.start)||!clock(value.end)||value.start<'07:00'||value.end>'21:00'||value.start>=value.end)return null;
    const from=value.from||'2026-10-01',to=value.to||'2027-01-31';
    if(!/^\d{4}-\d{2}-\d{2}$/.test(from)||!/^\d{4}-\d{2}-\d{2}$/.test(to)||from>to)return null;
    return {name:String(value.name||'').slice(0,80),room:String(value.room||'').slice(0,40),day:Number(value.day),start:value.start,end:value.end,from,to};
  }
  function clean(value,lab){const s=E.normalizeSettings({...value,lab});s.language=language(s.language);return s;}
  function load(storage){
    let saved,old;
    try{saved=JSON.parse(storage?.getItem(KEY)||'null');}catch{}
    if(saved&&[1,2,3,4,5,6,7].includes(Number(saved.selectedLab))&&saved.profiles&&typeof saved.profiles==='object'){
      const profiles={};
      for(let lab=1;lab<=7;lab++)if(saved.profiles[lab]&&typeof saved.profiles[lab]==='object')profiles[lab]=clean(saved.profiles[lab],lab);
      const selectedLab=Number(saved.selectedLab);profiles[selectedLab]||=forLab(selectedLab);
      return {selectedLab,profiles};
    }
    try{old=JSON.parse(storage?.getItem(LEGACY)||'null');}catch{}
    return {selectedLab:3,profiles:{3:old&&typeof old==='object'?clean(old,3):forLab(3)}};
  }
  function save(storage,state){try{if(!storage)return false;storage.setItem(KEY,JSON.stringify(state));return true;}catch{return false;}}
  const api={KEY,forLab,load,save};if(typeof module!=='undefined')module.exports=api;root.PlanPreferences=api;
})(typeof globalThis!=='undefined'?globalThis:this);

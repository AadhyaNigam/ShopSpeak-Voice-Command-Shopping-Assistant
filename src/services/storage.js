const KEY = "vsa_state_v2";
export function loadState(){
  try{
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { items: [], history: {} };
  }catch(e){
    return { items: [], history: {} };
  }
}
export function saveState(state){
  localStorage.setItem(KEY, JSON.stringify(state));
}

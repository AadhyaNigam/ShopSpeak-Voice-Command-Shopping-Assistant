import React from "react";
import { getSeasonal } from "../data/seasons";
import { getSubstitutes } from "../data/substitutes";

function Pill({ text, onClick }){
  return <button className="chip" onClick={onClick}>{text}</button>;
}

export default function SuggestionsPanel({ history, onAdd, recentAdded }){
  const topHistory = Object.entries(history || {}).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([n])=>n);
  const seasonal = getSeasonal();
  const subs = recentAdded ? getSubstitutes(recentAdded) : [];

  return (
    <div className="card" style={{height:'auto'}}>
      <h3 style={{marginTop:0}}>Smart Suggestions</h3>
      <div style={{marginTop:8}}>
        <h4 style={{margin:'8px 0 6px 0'}}>From your history</h4>
        {topHistory.length ? topHistory.map(n=> <Pill key={n} text={n} onClick={()=>onAdd(n,1)} />) : <small className="small">No history yet</small>}
      </div>

      <div style={{marginTop:12}}>
        <h4 style={{margin:'8px 0 6px 0'}}>Seasonal</h4>
        {seasonal.map(s=> <Pill key={s} text={s} onClick={()=>onAdd(s,1)} />)}
      </div>

      <div style={{marginTop:12}}>
        <h4 style={{margin:'8px 0 6px 0'}}>Substitutes {recentAdded?`(for ${recentAdded})`:''}</h4>
        {subs.length ? subs.map(s=> <Pill key={s} text={s} onClick={()=>onAdd(s,1)} />) : <small className="small">No substitutes currently</small>}
      </div>
    </div>
  );
}

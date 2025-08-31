import React from "react";
import { PRODUCTS } from "../data/products";
import { parsePriceFilter } from "../utils/priceParser";

export default function SearchPanel({ onAdd, voiceQuery }){
  const [q,setQ] = React.useState('');
  const query = voiceQuery || q;

  const priceFilter = parsePriceFilter(query);
  const brandMatch = (query||'').toLowerCase().match(/brand\s+([a-z0-9]+)/i);
  const brand = brandMatch?.[1];

  const stripped = (query||'').toLowerCase()
    .replace(/find|search|show me|under|below|less than|over|above|greater than|brand\s+[a-z0-9]+/g,'').trim();

  const results = PRODUCTS.filter(p=>{
    const matchName = stripped? (p.name.toLowerCase().includes(stripped) || (p.synonyms||[]).some(s=>s.includes(stripped))) : true;
    const brandOk = brand ? p.brand.toLowerCase().includes(brand) : true;
    let priceOk = true;
    if(priceFilter){
      if(priceFilter.type==='max') priceOk = p.price <= priceFilter.value;
      if(priceFilter.type==='min') priceOk = p.price >= priceFilter.value;
    }
    return matchName && brandOk && priceOk;
  }).slice(0,8);

  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Voice-Activated Search</h3>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="e.g., find organic apples under $5" />
        <button className="btn btn-orange" onClick={()=>setQ('')}>Clear</button>
      </div>

      <div style={{marginTop:12,display:'grid',gap:10}}>
        {results.length ? results.map(p=>(
          <div key={p.id} className="result-card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <strong>{p.name}</strong><span className="small">${p.price.toFixed(2)}</span>
            </div>
            <small className="small">{p.brand} • {p.category}</small>
            <div style={{display:'flex',gap:8,marginTop:6}}>
              <button className="btn btn-green" onClick={()=>onAdd(p.name,1)}>Add</button>
            </div>
          </div>
        )) : <small className="small">No results</small>}
      </div>
    </div>
  );
}

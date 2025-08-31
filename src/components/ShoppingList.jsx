import React from "react";
import { CATEGORIES } from "../data/categories";

export default function ShoppingList({ items, onInc, onDec, onRemove, onClear }){
  // group by category
  const grouped = items.reduce((acc,it)=>{
    acc[it.category] = acc[it.category] || [];
    acc[it.category].push(it);
    return acc;
  },{});
  return (
    <div className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h3 style={{margin:0}}>Shopping List</h3>
        <div>
          <button className="btn btn-green" onClick={onClear}>Clear</button>
        </div>
      </div>

      {Object.keys(grouped).length===0 ? <p className="small">Your list is empty — try saying "Add milk".</p> :
        Object.entries(grouped).map(([cat,arr])=>(
          <div key={cat} style={{marginBottom:12}}>
            <h4 style={{margin:'8px 0'}}>{CATEGORIES[cat] || cat}</h4>
            <ul className="list">
              {arr.map(it=>(
                <li key={it.id}>
                  <div style={{display:'flex',flexDirection:'column'}}>
                    <span className="item-name">{it.name}</span>
                    <small className="small">qty: {it.qty}</small>
                  </div>
                  <div className="item-meta">
                    <button className="qty-btn" onClick={()=>onDec(it.id)}>-</button>
                    <button className="qty-btn" onClick={()=>onInc(it.id)}>+</button>
                    <button className="remove-btn" onClick={()=>onRemove(it.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      }
    </div>
  );
}

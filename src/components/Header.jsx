import React from "react";

export default function Header(){
  return (
    <div className="card" style={{height:'auto'}}>
      <div className="header">
        <div className="hgroup">
          <h1 className="h1">🛒 Voice Command Shopping Assistant</h1>
          <p className="hsub">Say: "Add 2 milk", "दूध जोड़ो", "Find organic apples under 5"</p>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <span className="badge">Assignment</span>
        </div>
      </div>
    </div>
  );
}

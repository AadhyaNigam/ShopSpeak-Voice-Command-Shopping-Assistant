import React from "react";

export default function LanguageSelector({ lang, onChange }){
  const LANGS = [
    {code:'en','label':'English (US)'},
    {code:'hi','label':'Hindi (hi-IN)'},
    {code:'ta','label':'Tamil (ta-IN)'},
    {code:'te','label':'Telugu (te-IN)'},
    {code:'gu','label':'Gujarati (gu-IN)'}
  ];
  return (
    <select className="select" value={lang} onChange={e=>onChange(e.target.value)}>
      {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
    </select>
  );
}

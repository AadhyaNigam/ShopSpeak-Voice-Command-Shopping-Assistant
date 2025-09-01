import React, { useEffect, useState, useRef } from "react";
import { createSpeechRecognizer } from "./services/speech";
import { processVoiceCommand } from "./utils/nlp";
import { FaMicrophone, FaShoppingCart, FaLightbulb, FaUtensils, FaTrash } from "react-icons/fa";
<<<<<<< HEAD
=======
import { getCategoryForItem } from "./utils/categories";
>>>>>>> 6c3343a (Reinitialize project with NLP category fix)

/* Expanded grocery items grouped by category */
const GROCERY = {
  Dairy: ["Milk 1L","Whole Milk 1L","Almond Milk 1L","Cheese","Yogurt","Paneer"],
  Produce: ["Apples","Bananas","Mangoes","Tomatoes","Onions","Potatoes","Spinach","Cucumber"],
  Snacks: ["Potato Chips","Cookies","Chocolate","Nuts","Popcorn"],
  Beverages: ["Juice","Soda","Coffee","Tea","Water Bottle"],
  Pantry: ["Rice 5kg","Basmati Rice 5kg","Olive Oil 1L","Pasta","Tomato Ketchup","Sugar","Salt"],
  Bakery: ["Brown Bread","White Bread","Bagels","Croissant"]
};

const STORAGE_KEY = "shopspeak_state_v1";

export default function App(){
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const recRef = useRef(null);

  // shopping list state persisted
  const [shoppingList, setShoppingList] = useState(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw).shoppingList || [] : [];
    } catch(e){
      return [];
    }
  });

  useEffect(()=> {
    if(theme === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [theme]);

  useEffect(()=> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ shoppingList }));
  }, [shoppingList]);

  // theme toggle (persist)
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  // start voice recognition
  const startListening = () => {
    try {
      recRef.current = createSpeechRecognizer(language);
      setListening(true);
      recRef.current.onresult = (e) => {
        const transcript = Array.from(e.results).map(r => r[0].transcript).join(" ");
        if (e.results[0].isFinal) {
          const parsed = processVoiceCommand(transcript, language);
          handleParsed(parsed);
          setListening(false);
        }
      };
      recRef.current.onerror = () => { setListening(false); alert("Speech error"); };
      recRef.current.onend = () => setListening(false);
      recRef.current.start();
    } catch (err) {
      alert(err.message);
    }
  };

  // handle parsed command
  const handleParsed = (parsed) => {
    if(!parsed || !parsed.action) return;
    if(parsed.action === 'add'){
<<<<<<< HEAD
      addItem(parsed.item, parsed.qty || 1, parsed.category || 'General');
=======
      const category = getCategoryForItem(parsed.item); // ✅ find real category
      addItem(parsed.item, parsed.qty || 1, category);
>>>>>>> 6c3343a (Reinitialize project with NLP category fix)
    } else if(parsed.action === 'remove'){
      removeItemByName(parsed.item);
    } else if(parsed.action === 'clear'){
      clearAll();
    } else if(parsed.action === 'search'){
      // optional: show search results (not implemented)
      alert("Search: " + (parsed.search || ''));
    }
  };

  // add item
  const addItem = (name, qty=1, category='General') => {
    if(!name) return;
    const clean = name.trim();
    setShoppingList(prev => {
      const found = prev.find(p => p.name.toLowerCase() === clean.toLowerCase());
      if(found){
        return prev.map(p => p.name.toLowerCase() === clean.toLowerCase() ? {...p, qty: p.qty + qty} : p);
      }
      return [...prev, { id: Date.now().toString(36), name: clean, qty, category }];
    });
  };

  const removeItemByName = (name) => {
    if(!name) return;
    setShoppingList(prev => prev.filter(p => p.name.toLowerCase() !== name.toLowerCase()));
  };

  const updateQty = (id, delta) => {
    setShoppingList(prev => prev.map(p => p.id === id ? {...p, qty: Math.max(1, p.qty + delta)} : p));
  };

  const clearAll = () => {
    setShoppingList([]);
  };

  // helper to add from chips
  const addFromChip = (name, category) => addItem(name,1,category);

  return (
    <div className="container">
      {/* header */}
      <div className="header">
        <div className="header-left">
          <img src="/voice assistant.png" alt="ShopSpeak Logo" className="logo" />
        </div>
        <div className="title">ShopSpeak 🛒</div>
        <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        </div>
      </div>

      {/* voice strip */}
      <div className="voice-strip">
        <h2 style={{margin:0}}><FaMicrophone style={{marginRight:8}}/> Voice Search</h2>

        <button className="btn btn-blue" onClick={startListening}>
          {listening ? "Listening…" : "Speak"}
        </button>

        <select className="dropdown" value={language} onChange={(e)=>setLanguage(e.target.value)}>
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi</option>
          <option value="ta-IN">Tamil</option>
          <option value="te-IN">Telugu</option>
          <option value="gu-IN">Gujarati</option>
        </select>
      </div>

      {/* main layout */}
      <div className="main-layout">
        {/* left sidebar: suggestions + categories */}
        <div className="sidebar">
          <div className="card">
            <h3><FaLightbulb style={{marginRight:8}}/> Smart Suggestions</h3>
            <div className="chips">
              <button className="chip chip-blue" onClick={()=>addFromChip("Milk 1L","Dairy")}>Milk 1L</button>
              <button className="chip chip-pink" onClick={()=>addFromChip("Brown Bread","Bakery")}>Brown Bread</button>
              <button className="chip chip-yellow" onClick={()=>addFromChip("Eggs (12)","Pantry")}>Eggs (12)</button>
              <button className="chip chip-blue" onClick={()=>addFromChip("Almond Milk 1L","Dairy")}>Almond Milk 1L</button>
              <button className="chip chip-pink" onClick={()=>addFromChip("Basmati Rice 5kg","Pantry")}>Basmati Rice 5kg</button>
            </div>
          </div>

          <div className="card">
            <h3><FaUtensils style={{marginRight:8}}/> Grocery Categories</h3>

            {Object.entries(GROCERY).map(([cat, items]) => (
              <div key={cat} style={{marginBottom:10}}>
                <strong style={{display:'block', marginBottom:6}}>{cat}</strong>
                <div className="chips">
                  {items.map(it => (
                    <button key={it} className={`chip ${cat === 'Dairy' ? 'chip-blue' : cat === 'Produce' ? 'chip-yellow' : cat === 'Snacks' ? 'chip-pink' : (cat === 'Pantry' ? 'chip-blue' : 'chip-pink')}`} onClick={()=>addFromChip(it,cat)}>
                      {it}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* main area: shopping list */}
        <div className="main-area">
          <div className="card list-card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h3 style={{margin:0}}><FaShoppingCart style={{marginRight:8}}/> Shopping List</h3>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <button className="clear-all" onClick={clearAll}><FaTrash/> Clear All</button>
              </div>
            </div>

            <table className="list-table" style={{width:'100%', marginTop:12}}>
              <thead>
                <tr>
                  <th>Purchase</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {shoppingList.length === 0 && (
                  <tr><td colSpan="4" style={{padding:16, textAlign:'center', color:'var(--muted)'}}>Your list is empty.</td></tr>
                )}
                {shoppingList.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <div className="qty-controls">
                        <button onClick={()=>updateQty(item.id, -1)}>-</button>
                        <span style={{minWidth:26, display:'inline-block', textAlign:'center'}}>{item.qty}</span>
                        <button onClick={()=>updateQty(item.id, 1)}>+</button>
                      </div>
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <button className="remove-btn" onClick={()=>removeItemByName(item.name)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>

      {/* toast */}
      {/* simple inline toast - optional */}
    </div>
  );
}

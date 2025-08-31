import React from "react";
import { supported, getSpeechConstructor } from "../services/speech";

export default function VoiceButton({ lang, onTranscript, listening, setListening }){
  const recRef = React.useRef(null);

  const start = () => {
    if (!supported()) return alert("SpeechRecognition not supported (use Chrome/Edge).");
    const SpeechConstructor = getSpeechConstructor();
    const rec = new SpeechConstructor();
    // map language code to locale
    const localeMap = { en:'en-US', hi:'hi-IN', ta:'ta-IN', te:'te-IN', gu:'gu-IN' };
    rec.lang = localeMap[lang] || 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      const t = e.results[0][0].transcript;
      onTranscript(t);
    };
    rec.onerror = (e) => {
      console.error(e);
      setListening(false);
      alert("Speech error: " + (e.error || "unknown"));
    };
    rec.onend = () => {
      setListening(false);
      recRef.current = null;
    };
    recRef.current = rec;
    setListening(true);
    rec.start();
  };

  return (
    <button className={`btn ${listening ? 'btn-pink' : 'btn-blue'}`} onClick={start}>
      {listening ? 'Listening…' : '🎙️ Speak a Command'}
    </button>
  );
}

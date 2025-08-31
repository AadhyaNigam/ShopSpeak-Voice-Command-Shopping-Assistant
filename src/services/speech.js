// creates a browser SpeechRecognition instance
export function createSpeechRecognizer(lang = "en-US") {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) throw new Error("Web Speech API not supported in this browser.");
  const rec = new SpeechRecognition();
  rec.lang = lang;
  rec.interimResults = false;
  rec.continuous = false;
  rec.maxAlternatives = 1;
  return rec;
}

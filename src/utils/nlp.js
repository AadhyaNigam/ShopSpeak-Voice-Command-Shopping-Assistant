// Lightweight multilingual NLP for voice shopping commands.
// Returns { action, item, qty, category, search } where applicable.
//
// Supported languages: en, hi, ta, te, gu (use locale codes for SpeechRecognition but pass lang code to parser)
// Example recognized commands:
// "Add 4 apples", "I want two bottles of water", "Remove milk", "Clear list", "Find organic apples under 5"

const NUMBER_WORDS = {
  en: { one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10 },
  hi: { एक:1,दो:2,दो:2,'तीन':3,'चार':4,'पांच':5,'पाँच':5,'छह':6,'सात':7,'आठ':8,'नौ':9,'दस':10 },
  ta: { 'ஒரு':1,'ஒன்று':1,'இரண்டு':2,'மூன்று':3,'நான்கு':4,'ஐந்து':5 },
  te: { 'ఒకటి':1,'రెండు':2,'మూడు':3,'నాలుగు':4,'ఐదు':5 },
  gu: { 'એક':1,'બે':2,'ત્રણ':3,'ચાર':4,'પાંચ':5 }
};

// simple verbs mapping in many languages -> action
const ADD_WORDS = {
  en: ['add','buy','i want','i need','put','please add'],
  hi: ['जोड़ो','जोड़ें','चाहिए','मुझे','लाना'],
  ta: ['சேர்','வாங்கு','தேவை','தேவைப்பட்டால்'],
  te: ['చేర్చు','కొను','తప్పనిసరిగా'],
  gu: ['ઉમેરો','ખરીદો','મને','ચાહીએ']
};
const REMOVE_WORDS = {
  en: ['remove','delete','take off'],
  hi: ['हटाओ','निकालो','हटाएं'],
  ta: ['அகற்று','நீக்கு'],
  te: ['తొలగించు','తొలగించు'],
  gu: ['હટાવો','કાઢો']
};
const CLEAR_WORDS = {
  en: ['clear list','clear','empty list','reset'],
  hi: ['साफ करो','खाली करो'],
  ta: ['சுத்தம்','விடு'],
  te: ['సైండు','క్లియర్'],
  gu: ['ખાલી','સાફ']
};
const FIND_WORDS = {
  en: ['find','search','show me','look for'],
  hi: ['खोजो','ढूंढो'],
  ta: ['தேடு','கண்டுபிடி'],
  te: ['అన్నిక','శోధించు'],
  gu: ['શોધો','કાંઈ શોધો']
};

// helper: detect if any of words appear in text
function includesAny(text, arr){
  if(!arr || !text) return false;
  return arr.some(w => text.includes(w));
}

// convert number-words to digits
function parseNumberWords(text, lang='en'){
  if(!text) return null;
  // digits first
  const d = text.match(/(\d+)/);
  if(d) return parseInt(d[1],10);
  const dict = NUMBER_WORDS[lang] || NUMBER_WORDS['en'];
  for(const [k,v] of Object.entries(dict)){
    if(text.includes(k)) return v;
  }
  return null;
}

// normalize punctuation & whitespace
function normalize(t){
  return t.replace(/₹|\$|rs\.?/gi,'').replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
}

// map a raw item token to clean item (basic)
function getItemFromText(text){
  if(!text) return null;
  // remove common filler words
  let s = text.replace(/\b(add|buy|remove|delete|please|to my list|to the list|from my list|i want|i need|give me|find|search|for|under|below|less than|of)\b/gi,' ');
  s = s.replace(/\d+/g,' ');
  s = s.replace(/\s+/g,' ').trim();
  return s || null;
}

export function processVoiceCommand(rawText, locale='en-US'){
  if(!rawText) return {};
  // locale like en-US -> lang 'en'
  const lang = (locale || 'en').split('-')[0];
  const t = normalize(rawText.toLowerCase());

  // CLEAR?
  if(includesAny(t, CLEAR_WORDS[lang] || CLEAR_WORDS['en'])) {
    return { action: 'clear' };
  }

  // REMOVE?
  if(includesAny(t, REMOVE_WORDS[lang] || REMOVE_WORDS['en'])) {
    const item = getItemFromText(t);
    return { action: 'remove', item };
  }

  // FIND / SEARCH?
  if(includesAny(t, FIND_WORDS[lang] || FIND_WORDS['en'])) {
    const query = getItemFromText(t);
    return { action: 'search', search: query };
  }

  // ADD?
  if(includesAny(t, ADD_WORDS[lang] || ADD_WORDS['en']) || /^\d+\s/.test(t) ) {
    const qty = parseNumberWords(t, lang) || 1;
    const item = getItemFromText(t);
    return { action: 'add', item, qty };
  }

  // fallback: if starts with a number or noun, treat as add
  const qty2 = parseNumberWords(t, lang);
  if(qty2 || /^[a-z\u0900-\u097F\u0B80-\u0BFF\u0C00-\u0C7F\u0A80-\u0AFF]/i.test(t)){
    const qty = qty2 || 1;
    const item = getItemFromText(t);
    return { action: 'add', item, qty };
  }

  return { action: 'unknown' };
}

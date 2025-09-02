import { getCategoryForItem } from "./categories";

const NUMBER_WORDS = {
  en: { one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10 },
  hi: { एक:1,दो:2,'तीन':3,'चार':4,'पांच':5,'पाँच':5,'छह':6,'सात':7,'आठ':8,'नौ':9,'दस':10 },
  ta: { 'ஒரு':1,'ஒன்று':1,'இரண்டு':2,'மூன்று':3,'நான்கு':4,'ஐந்து':5 },
  te: { 'ఒకటి':1,'రెండు':2,'మూడు':3,'నాలుగు':4,'ఐదు':5 },
  gu: { 'એક':1,'બે':2,'ત્રણ':3,'ચાર':4,'પાંચ':5 }
};

const ADD_WORDS = {
  en: ["add","buy","i want","i need","put","please add"],
  hi: ["जोड़ो","जोड़ें","चाहिए","मुझे","लाना"],
  ta: ["சேர்","வாங்கு","தேவை"],
  te: ["చేర్చు","కొను"],
  gu: ["ઉમેરો","ખરીદો","મને"]
};

const REMOVE_WORDS = {
  en: ["remove","delete","take off"],
  hi: ["हटाओ","निकालो","हटाएं"],
  ta: ["அகற்று","நீக்கு"],
  te: ["తొలగించు"],
  gu: ["હટાવો","કાઢો"]
};

const CLEAR_WORDS = {
  en: ["clear list","clear","empty list","reset"],
  hi: ["साफ करो","खाली करो"],
  ta: ["சுத்தம்","விடு"],
  te: ["క్లియర్"],
  gu: ["ખાલી","સાફ"]
};

const FIND_WORDS = {
  en: ["find","search","show me","look for"],
  hi: ["खोजो","ढूंढो"],
  ta: ["தேடு","கண்டுபிடி"],
  te: ["శోధించు"],
  gu: ["શોધો"]
};

function includesAny(text, arr) {
  return arr?.some((w) => text.includes(w));
}

function parseNumberWords(text, lang="en") {
  if (!text) return null;
  const d = text.match(/(\d+)/);
  if (d) return parseInt(d[1], 10);
  const dict = NUMBER_WORDS[lang] || NUMBER_WORDS.en;
  for (const [k, v] of Object.entries(dict)) {
    if (text.includes(k)) return v;
  }
  return null;
}

function normalize(t) {
  return t.replace(/₹|\$|rs\.?/gi,"").replace(/[^\p{L}\p{N}\s]/gu," ").replace(/\s+/g," ").trim();
}

function getItemFromText(text) {
  if (!text) return null;
  let s = text.replace(/\b(add|buy|remove|delete|please|to my list|to the list|from my list|i want|i need|give me|find|search|for|under|below|less than|of)\b/gi," ");
  s = s.replace(/\d+/g," ");
  s = s.replace(/\s+/g," ").trim();
  return s || null;
}

export function processVoiceCommand(rawText, locale="en-US") {
  if (!rawText) return {};
  const lang = (locale || "en").split("-")[0];
  const t = normalize(rawText.toLowerCase());

  if (includesAny(t, CLEAR_WORDS[lang] || CLEAR_WORDS.en)) {
    return { action: "clear" };
  }
  if (includesAny(t, REMOVE_WORDS[lang] || REMOVE_WORDS.en)) {
    const item = getItemFromText(t);
    return { action: "remove", item };
  }
  if (includesAny(t, FIND_WORDS[lang] || FIND_WORDS.en)) {
    const query = getItemFromText(t);
    return { action: "search", search: query };
  }
  if (includesAny(t, ADD_WORDS[lang] || ADD_WORDS.en) || /^\d+\s/.test(t)) {
    const qty = parseNumberWords(t, lang) || 1;
    const item = getItemFromText(t);
    const category = getCategoryForItem(item);
    return { action: "add", item, qty, category };
  }

  const qty2 = parseNumberWords(t, lang);
  if (qty2 || /^[a-z\u0900-\u097F]/i.test(t)) {
    const qty = qty2 || 1;
    const item = getItemFromText(t);
    const category = getCategoryForItem(item);
    return { action: "add", item, qty, category };
  }

  return { action: "unknown" };
}

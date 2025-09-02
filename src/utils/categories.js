// Category mapping function for NLP
export function getCategoryForItem(item) {
  if (!item) return "General";
  const text = item.toLowerCase();
  if (["milk","cheese","yogurt","paneer","butter","cream","almond milk"].some(k=>text.includes(k))) return "Dairy";
  if (["apple","banana","mango","tomato","onion","potato","spinach","cucumber"].some(k=>text.includes(k))) return "Produce";
  if (["chips","cookies","chocolate","nuts","popcorn"].some(k=>text.includes(k))) return "Snacks";
  if (["juice","soda","coffee","tea","water"].some(k=>text.includes(k))) return "Beverages";
  if (["rice","oil","pasta","ketchup","sugar","salt","eggs"].some(k=>text.includes(k))) return "Pantry";
  if (["bread","bagel","croissant"].some(k=>text.includes(k))) return "Bakery";
  return "General";
}

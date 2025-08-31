export function parsePriceFilter(text){
  if(!text) return null;
  const t = text.toLowerCase();
  const m1 = t.match(/(?:under|below|less than|<=)\s*\$?\s*(\d+(?:\.\d+)?)/);
  if(m1) return { type:'max', value: parseFloat(m1[1]) };
  const m2 = t.match(/(?:over|above|greater than|>=)\s*\$?\s*(\d+(?:\.\d+)?)/);
  if(m2) return { type:'min', value: parseFloat(m2[1]) };
  const rupee = t.match(/(?:₹|rs\.?|rs)\s*(\d+)/);
  if(rupee) return { type:'max', value: parseFloat(rupee[1]) };
  return null;
}

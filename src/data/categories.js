export const CATEGORIES = {
  dairy:'Dairy',
  produce:'Produce',
  bakery:'Bakery',
  beverages:'Beverages',
  snacks:'Snacks',
  pantry:'Pantry',
  household:'Household'
};

export function categorize(name=''){
  const x = (name||'').toLowerCase();
  if(/milk|paneer|yogurt|cheese/.test(x)) return 'dairy';
  if(/apple|banana|rice|cucumber|tomato|onion|potato|spinach/.test(x)) return 'produce';
  if(/bread|bun|loaf/.test(x)) return 'bakery';
  if(/juice|soda|coffee|tea/.test(x)) return 'beverages';
  if(/chips|chocolate|cookie|biscuit/.test(x)) return 'snacks';
  if(/rice|pasta|oil|ketchup|eggs/.test(x)) return 'pantry';
  if(/soap|detergent|tissue|cleaner/.test(x)) return 'household';
  return 'pantry';
}

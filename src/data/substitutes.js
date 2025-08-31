export const SUBSTITUTES = {
  Milk:['Almond Milk','Soy Milk','Oat Milk'],
  Paneer:['Tofu'],
  'Brown Bread':['Whole Wheat Bread','Multigrain Bread'],
  'Basmati Rice':['Brown Rice','Quinoa']
};

export function getSubstitutes(item){
  if(!item) return [];
  return SUBSTITUTES[item] || [];
}

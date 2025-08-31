const SEASONAL_BY_MONTH = {
  0:['Oranges','Carrots'],
  1:['Strawberries','Spinach'],
  2:['Mango','Cucumber'],
  3:['Mango','Watermelon'],
  4:['Tomato','Berries'],
  5:['Corn','Peaches'],
  6:['Plums','Cucumber'],
  7:['Grapes','Apple'],
  8:['Apple','Pumpkin'],
  9:['Pumpkin','Sweet Potato'],
  10:['Broccoli','Cauliflower'],
  11:['Oranges','Pomegranate']
};
export function getSeasonal(now=new Date()){
  return SEASONAL_BY_MONTH[now.getMonth()] || [];
}

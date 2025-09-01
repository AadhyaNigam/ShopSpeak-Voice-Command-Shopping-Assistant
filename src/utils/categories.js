export const categories = {
  Dairy: ["milk", "cheese", "yogurt", "paneer", "butter"],
  Produce: ["apple", "banana", "mango", "tomato", "onion", "potato", "spinach", "cucumber"],
  Snacks: ["chips", "cookies", "chocolate", "nuts", "popcorn"],
  Beverages: ["juice", "soda", "coffee", "tea", "water"],
  Pantry: ["rice", "oil", "pasta", "ketchup", "sugar", "salt"],
  Bakery: ["bread", "bagel", "croissant", "bun"]
};

// Returns category for a given item name
export function getCategoryForItem(itemName) {
  if (!itemName) return "General";
  const lower = itemName.toLowerCase();
  for (const [cat, items] of Object.entries(categories)) {
    if (items.some(it => lower.includes(it))) {
      return cat;
    }
  }
  return "General";
}

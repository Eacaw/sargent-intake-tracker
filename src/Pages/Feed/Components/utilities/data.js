import { doc, getDoc, getFirestore } from "firebase/firestore";

export async function fetchFoodItemData(foodItemId) {
  const db = getFirestore();
  const foodItemRef = doc(db, "food-items", foodItemId);
  const foodItemSnap = await getDoc(foodItemRef);
  const foodItem = foodItemSnap.data();

  return {
    name: foodItem.name,
    calories: foodItem.calories,
    carbs: foodItem.carbs,
    fat: foodItem.fat,
    protein: foodItem.protein,
  };
}

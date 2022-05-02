import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { fetchFoodItemData } from "./utilities/data";
import { doc, getDoc, getFirestore } from "firebase/firestore";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutGraphRow(props) {
  const localLimits = props.limits[0];
  const localFoodItems = props.foodItems;

  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [carbsConsumed, setCarbsConsumed] = useState(0);
  const [fatConsumed, setFatConsumed] = useState(0);
  const [proteinConsumed, setProteinConsumed] = useState(0);

  let foodItemsData = [];

  useEffect(() => {
    setCaloriesConsumed(0);
    setCarbsConsumed(0);
    setFatConsumed(0);
    setProteinConsumed(0);
    foodItemsData.forEach((foodItemData) => {
      setCaloriesConsumed(caloriesConsumed + foodItemData.calories);
      setCarbsConsumed(carbsConsumed + foodItemData.carbs);
      setFatConsumed(fatConsumed + foodItemData.fat);
      setProteinConsumed(proteinConsumed + foodItemData.protein);
    });
  }, [foodItemsData]);

  localFoodItems.forEach((foodItem) => {
    fetchFoodItemData(foodItem.foodItemId).then((foodItemData) => {
      foodItemsData.push(foodItemData);
    });
  });

  return (
    <div className="margin-med flex-center">
      <div className="grid-doughnuts">
        <div>
          Calories:&nbsp;
          {Math.round(caloriesConsumed)}/{localLimits.calories}
        </div>

        <div>
          Carbs:&nbsp;
          {Math.round(carbsConsumed)}/{localLimits.carbs}
        </div>

        <div>
          Fat:&nbsp;
          {Math.round(fatConsumed)}/{localLimits.fat}
        </div>

        <div>
          Protein:&nbsp;
          {Math.round(proteinConsumed)}/{localLimits.protein}
        </div>
      </div>
    </div>
  );
}

export default DonutGraphRow;

// NXYhREAYJ7BDTsrF5nzH; - honey flakes
// Tm6RrlsDnbv8JAzpf5nS; - Protein bar
// gXebrlCSMI3kPQVZqSal; - Protein Shake

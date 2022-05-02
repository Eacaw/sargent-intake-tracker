import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { fetchFoodItemData } from "./utilities/data";
import { doc, getDoc, getFirestore } from "firebase/firestore";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutGraphRow(props) {
  const localLimits = props.limits[0];

  return (
    <div className="margin-med flex-center">
      <div className="grid-doughnuts">
        <div>
          Protein:&nbsp;
          {Math.round(props.consumptionData.protein)}/{localLimits.protein}
        </div>
        <div>
          Carbs:&nbsp;
          {Math.round(props.consumptionData.carbs)}/{localLimits.carbs}
        </div>
        <div>
          Fat:&nbsp;
          {Math.round(props.consumptionData.fat)}/{localLimits.fat}
        </div>
        <div>
          Calories:&nbsp;
          {Math.round(props.consumptionData.calories)}/{localLimits.calories}
        </div>
      </div>
    </div>
  );
}

export default DonutGraphRow;

// NXYhREAYJ7BDTsrF5nzH; - honey flakes
// Tm6RrlsDnbv8JAzpf5nS; - Protein bar
// gXebrlCSMI3kPQVZqSal; - Protein Shake

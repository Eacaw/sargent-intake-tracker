import {
  collection,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBInput,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import FoodItemBar from "../../Feed/Components/FoodItemBar";
import { iconMap } from "../../Feed/Components/utilities/icons";

function AllFoodList(props) {
  const db = getFirestore();
  const q = query(
    collection(db, "food-items"),
    orderBy("name", "asc"),
    limit(50)
  );
  const [allFoodItems] = useCollectionData(q);

  useEffect(() => {
    if (allFoodItems) {
      props.setFoodItems(allFoodItems);
      props.notifyLoaded(true);
    }
  }, [allFoodItems]);

  const foodItemHeaderBar = {
    icon: iconMap.key,
    foodItemId: "4KaklctSZPKEgV7cXANc", // Dummy ID to represent the header row
    colour: "primary",
  };

  return (
    <div className="margin-med" style={{ width: "90%" }}>
      <MDBCard border="1px solid #e0e0e0">
        <MDBCardHeader>
          <MDBCardTitle className="margin-sml">All Food Items:</MDBCardTitle>

          <FoodItemBar
            key={"headerBar"}
            foodItem={foodItemHeaderBar}
            disableTrashCan={true}
          />
          {allFoodItems &&
            allFoodItems.map((foodItem) => {
              if (foodItem.name !== "Name") {
                return (
                  <FoodItemBar
                    key={foodItem.name}
                    foodItemData={{ ...foodItem, colour: "info" }}
                    disableTrashCan={true}
                  />
                );
              } else {
                return;
              }
            })}
        </MDBCardHeader>
      </MDBCard>
    </div>
  );
}

export default AllFoodList;

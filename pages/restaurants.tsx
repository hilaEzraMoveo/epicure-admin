import Sidebar from "@/shared/components/Sidebar/Sidebar";
import GeneralTable from "../shared/components/GeneralTable/GeneralTable";
import { RestaurantColumns } from "@/data/tableColumns.data";
import { useEffect, useState } from "react";
import { IRestaurant } from "@/models/restaurant.model";
import { getRestaurants } from "@/services/restaurant.service";

const restaurants = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);

  useEffect(() => {
    fetchRestaurantsData();
  }, []);

  const fetchRestaurantsData = async () => {
    try {
      const fetchedRestaurants = await getRestaurants();
      setRestaurants(fetchedRestaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <GeneralTable data={restaurants} columns={RestaurantColumns} />
    </div>
  );
};
export default restaurants;

import Sidebar from "@/shared/components/Sidebar/Sidebar";
import GeneralTable from "../shared/components/GeneralTable/GeneralTable";
import { RestaurantColumns } from "@/data/tableColumns.data";
import { useEffect, useState } from "react";
import { IRestaurant } from "@/models/restaurant.model";
import { getRestaurants } from "@/services/restaurant.service";

const Restaurants = ({
  restaurantsData,
}: {
  restaurantsData: IRestaurant[];
}) => {
  return (
    <div className="container">
      <Sidebar />
      <GeneralTable data={restaurantsData} columns={RestaurantColumns} />
    </div>
  );
};

export default Restaurants;

export async function getServerSideProps() {
  try {
    const fetchedRestaurants = await getRestaurants();
    return {
      props: {
        restaurantsData: fetchedRestaurants,
      },
    };
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return {
      props: {
        restaurantsData: [],
      },
    };
  }
}

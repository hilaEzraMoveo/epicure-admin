import Sidebar from "@/shared/components/Sidebar/Sidebar";
import GeneralTable from "../shared/components/GeneralTable/GeneralTable";
import { DishColumns } from "@/data/tableColumns.data";
import { useEffect, useState } from "react";
import { getDishes } from "@/services/dish.service";
import { IDish } from "@/models/dish.model";
import { HttpClientService } from "@/services/HttpClient.service";

const Dishes = ({ dishesData }: { dishesData: IDish[] }) => {
  return (
    <div className="container">
      <Sidebar />
      <GeneralTable data={dishesData} columns={DishColumns} />
    </div>
  );
};

export default Dishes;

export async function getServerSideProps() {
  try {
    //const fetchedDishes = await getDishes();
    const response = await HttpClientService.get<IDish[]>("/dishes");
    const fetchedDishes = response.data;
    return {
      props: {
        dishesData: fetchedDishes,
      },
    };
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return {
      props: {
        dishesData: [],
      },
    };
  }
}

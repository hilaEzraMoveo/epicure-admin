import Sidebar from "@/shared/components/Sidebar/Sidebar";
import GeneralTable from "../shared/components/GeneralTable/GeneralTable";
import { DishColumns } from "@/data/tableColumns.data";
import { useEffect, useState } from "react";
import { getDishes } from "@/services/dish.service";
import { IDish } from "@/models/dish.model";

const dishes = () => {
  const [dishes, setDishes] = useState<IDish[]>([]);

  useEffect(() => {
    fetchDishesData();
  }, []);

  const fetchDishesData = async () => {
    try {
      const fetchedDishes = await getDishes();
      setDishes(fetchedDishes);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <GeneralTable data={dishes} columns={DishColumns} />
    </div>
  );
};
export default dishes;

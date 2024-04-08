import Sidebar from "@/shared/components/Sidebar/Sidebar";
import React, { useState } from "react";
import GeneralTable from "../shared/components/GeneralTable/GeneralTable";
import { DishColumns } from "@/data/tableColumns.data";
import { IDish } from "@/models/dish.model";
import { HttpClientService } from "@/services/HttpClient.service";
import ActionButton from "@/shared/components/ActionButton/ActionButton";
import AddIcon from "@mui/icons-material/Add";
import resources from "@/resources/resources";
import GenericDialog from "@/shared/components/GenericDialog/GenericDialog";
import { DishProps } from "@/data/editAndCreateProps.data";

const Dishes = ({ dishesData }: { dishesData: IDish[] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<IDish | null>(null);

  const handleCreateNew = () => {
    setSelectedDish(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleEdit = (rowData: IDish) => {
    setSelectedDish(rowData);
    setIsDialogOpen(true);
  };

  const handleDelete = async (rowData: IDish) => {
    try {
      const response = await HttpClientService.delete(
        `/dishes/${rowData._id}`,
        null
      );
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleCreateOrUpdateDish = async (newDishData: IDish) => {
    try {
      console.log(newDishData);
      // If editing an existing chef (newChefData contains _id)
      if (newDishData._id) {
        const response = await HttpClientService.put(
          `/dishes/${newDishData._id}`,
          {
            updatedChefData: newDishData,
          }
        );
        console.log("response:", response.data);
      } else {
        console.log("creating new dish");
        const response = await HttpClientService.post(`/dishes`, {
          title: newDishData.title,
          image: newDishData.image,
          ingredients: newDishData.ingredients,
          restaurants: [],
          status: newDishData.status,
        });
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error updating chef:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <Sidebar />
      </div>
      <div>
        <ActionButton
          label={resources.createNew}
          onClick={handleCreateNew}
          icon={<AddIcon />}
        />
        <GeneralTable
          data={dishesData}
          columns={DishColumns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <GenericDialog
          open={isDialogOpen}
          allData={dishesData}
          data={selectedDish}
          props={DishProps}
          onClose={handleCloseDialog}
          onSubmit={handleCreateOrUpdateDish}
        />
      </div>
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

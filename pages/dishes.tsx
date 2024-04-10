import Sidebar from "@/shared/components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
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
  const [updatedDishesData, setUpdatedDishesData] =
    useState<IDish[]>(dishesData);

  useEffect(() => {
    setUpdatedDishesData(dishesData);
  }, [dishesData]);

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
      if (newDishData._id) {
        // edit operation
        console.log(newDishData);
        const response = await HttpClientService.put(
          `/dishes/${newDishData._id}`,
          {
            updatedDishData: newDishData,
          }
        );
        console.log("Response:", response.data);
        const updatedData = updatedDishesData.map((dish) =>
          dish._id === newDishData._id ? (response.data as IDish) : dish
        );
        setUpdatedDishesData(updatedData);
      } else {
        // create operation
        console.log("Creating new dish");
        const response = await HttpClientService.post(`/dishes`, {
          title: newDishData.title,
          image: newDishData.image,
          ingredients: newDishData.ingredients,
          tags: newDishData.tags,
          price: newDishData.price,
          restaurant: newDishData.restaurant,
          status: newDishData.status,
        });
        console.log(response.data);

        if (response.data) {
          // Add the new dish object to the updatedDishesData state
          setUpdatedDishesData((prevData: IDish[]) => {
            const newData = response.data as IDish;
            return [...prevData, newData];
          });
        }
      }
    } catch (error) {
      console.error("Error updating dish:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <Sidebar />
      </div>
      <div style={{ overflowY: "scroll", width: "100%" }}>
        <ActionButton
          label={resources.createNew}
          onClick={handleCreateNew}
          icon={<AddIcon />}
        />
        <GeneralTable
          data={updatedDishesData} //change
          columns={DishColumns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <GenericDialog
          open={isDialogOpen}
          allData={updatedDishesData} //change
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

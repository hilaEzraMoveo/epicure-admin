import Sidebar from "@/shared/components/Sidebar/Sidebar";
import React, { useState } from "react";
import GeneralTable from "../shared/components/GeneralTable/GeneralTable";
import { RestaurantColumns } from "@/data/tableColumns.data";
import { IRestaurant } from "@/models/restaurant.model";
import { HttpClientService } from "@/services/HttpClient.service";
import ActionButton from "@/shared/components/ActionButton/ActionButton";
import AddIcon from "@mui/icons-material/Add";
import resources from "@/resources/resources";
import GenericDialog from "@/shared/components/GenericDialog/GenericDialog";
import { RestaurantProps } from "@/data/editAndCreateProps.data";

const Restaurants = ({
  restaurantsData,
}: {
  restaurantsData: IRestaurant[];
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<IRestaurant | null>(null);

  const handleCreateNew = () => {
    setSelectedRestaurant(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleEdit = (rowData: IRestaurant) => {
    setSelectedRestaurant(rowData);
    setIsDialogOpen(true);
  };

  const handleDelete = async (rowData: IRestaurant) => {
    try {
      const response = await HttpClientService.delete(
        `/restaurants/${rowData._id}`,
        null
      );
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const handleCreateOrUpdateRestaurant = async (
    newRestaurantData: IRestaurant
  ) => {
    try {
      let response;
      // create operation
      if (!selectedRestaurant) {
        console.log(newRestaurantData);
        response = await HttpClientService.post("/restaurants", {
          title: newRestaurantData.title,
          image: newRestaurantData.image,
          chef: newRestaurantData.chef,
          rating: newRestaurantData.rating,
          dishes: [],
          signatureDish: {},
          isPopular: newRestaurantData.isPopular,
          status: newRestaurantData.status,
        });
      } else {
        // update operation
        response = await HttpClientService.put(
          `/restaurants/${selectedRestaurant._id}`,
          newRestaurantData
        );
      }
      console.log("Restaurant created/updated:", response.data);
    } catch (error) {
      console.error("Error creating/updating restaurant:", error);
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
          data={restaurantsData}
          columns={RestaurantColumns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <GenericDialog
          open={isDialogOpen}
          allData={restaurantsData}
          data={selectedRestaurant}
          props={RestaurantProps}
          onClose={handleCloseDialog}
          onSubmit={handleCreateOrUpdateRestaurant}
        />
      </div>
    </div>
  );
};

export default Restaurants;

export async function getServerSideProps() {
  try {
    //const fetchedRestaurants = await getRestaurants();
    const response = await HttpClientService.get<IRestaurant[]>("/restaurants");
    const fetchedRestaurants = response.data;
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

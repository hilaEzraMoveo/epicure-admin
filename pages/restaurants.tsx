import Sidebar from "@/shared/components/Sidebar/Sidebar";
import React, { useState, useEffect } from "react";
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
  currentPage,
  totalPages,
}: {
  restaurantsData: IRestaurant[];
  currentPage: number;
  totalPages: number;
}) => {
  const [restaurantsToDisplay, setRestaurantsToDisplay] =
    useState(restaurantsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<IRestaurant | null>(null);
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(currentPage);
    setRestaurantsToDisplay(restaurantsData);
  }, [currentPage, restaurantsData]);

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
          signatureDish: null,
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

  const handleLoadMore = async () => {
    try {
      const nextPage = page + 1;
      const limit = 3; // Or use the same limit as defined in the props
      const response = await HttpClientService.get<IRestaurant[]>(
        "/restaurants",
        {
          params: { nextPage: nextPage, limit: limit },
        }
      );

      const additionalRestaurants = response.data;
      setPage(nextPage);
      setRestaurantsToDisplay((prevRestaurants) => [
        ...prevRestaurants,
        ...additionalRestaurants,
      ]);
    } catch (error) {
      console.error("Error loading more restaurants:", error);
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
          data={restaurantsToDisplay}
          columns={RestaurantColumns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {restaurantsData.length < 9 && (
          <button onClick={handleLoadMore}>Load More</button>
        )}
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

export async function getServerSideProps(context: { query: any }) {
  try {
    const { query } = context;
    const nextPage = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 3;

    const response = await HttpClientService.get<IRestaurant[]>(
      "/restaurants",
      {
        params: { nextPage, limit },
      }
    );
    const fetchedRestaurants = response.data;
    return {
      props: {
        restaurantsData: fetchedRestaurants,
        currentPage: nextPage,
        totalPages: Math.ceil(fetchedRestaurants.length / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return {
      props: {
        restaurantsData: [],
        currentPage: 1,
        totalPages: 1,
      },
    };
  }
}

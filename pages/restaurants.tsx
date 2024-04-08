import Sidebar from "@/shared/components/Sidebar/Sidebar";
import GeneralTable from "../shared/components/GeneralTable/GeneralTable";
import { RestaurantColumns } from "@/data/tableColumns.data";
import { IRestaurant } from "@/models/restaurant.model";
import { HttpClientService } from "@/services/HttpClient.service";
import ActionButton from "@/shared/components/ActionButton/ActionButton";
import AddIcon from "@mui/icons-material/Add";
import resources from "@/resources/resources";

const Restaurants = ({
  restaurantsData,
}: {
  restaurantsData: IRestaurant[];
}) => {
  const handleEdit = (rowData: IRestaurant) => {};

  const handleDelete = async (rowData: IRestaurant) => {
    try {
      const response = await HttpClientService.delete(
        `/restaurants/${rowData._id}`,
        null
      );
    } catch (error) {
      console.error("Error deleting Restaurant:", error);
    }
  };

  function handleCreateNew(): void {
    throw new Error("Function not implemented.");
  }

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
      </div>
    </div>
  );
};

export default Restaurants;

export async function getServerSideProps() {
  try {
    //const fetchedRestaurants = await getRestaurants();
    const response = await HttpClientService.get<IRestaurant[]>("/restaurants");
    console.log(response.data);
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

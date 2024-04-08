import Sidebar from "@/shared/components/Sidebar/Sidebar";
import GeneralTable from "../shared/components/GeneralTable/GeneralTable";
import { DishColumns } from "@/data/tableColumns.data";
import { IDish } from "@/models/dish.model";
import { HttpClientService } from "@/services/HttpClient.service";
import ActionButton from "@/shared/components/ActionButton/ActionButton";
import AddIcon from "@mui/icons-material/Add";

const Dishes = ({ dishesData }: { dishesData: IDish[] }) => {
  const handleEdit = (rowData: IDish) => {
    console.log("Editing dish:", rowData);
  };

  const handleDelete = async (rowData: IDish) => {
    try {
      const response = await HttpClientService.delete(
        `/dishes/${rowData._id}`,
        null
      );
      if (response.status === 200) {
        console.log("Dish deleted successfully:", rowData);
      } else {
        console.error("Failed to delete dish:", rowData);
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
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
          label="Create New"
          onClick={handleCreateNew}
          icon={<AddIcon />}
        />
        <GeneralTable
          data={dishesData}
          columns={DishColumns}
          onEdit={handleEdit}
          onDelete={handleDelete}
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

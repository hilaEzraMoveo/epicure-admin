import Sidebar from "@/shared/components/Sidebar/Sidebar";
import GeneralTable from "../shared/components/GeneralTable/GeneralTable";
import { DishColumns } from "@/data/tableColumns.data";
import { IDish } from "@/models/dish.model";
import { HttpClientService } from "@/services/HttpClient.service";
import ActionButton from "@/shared/components/ActionButton/ActionButton";
import AddIcon from "@mui/icons-material/Add";
import resources from "@/resources/resources";
const Dishes = ({ dishesData }: { dishesData: IDish[] }) => {
  const handleEdit = (rowData: IDish) => {};

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

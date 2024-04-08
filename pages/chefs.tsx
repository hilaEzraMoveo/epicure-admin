import Sidebar from "@/shared/components/Sidebar/Sidebar";
import React from "react";
import GeneralTable from "../shared/components/GeneralTable/GeneralTable";
import { chefColumns } from "../data/tableColumns.data";
import { IChef } from "@/models/chef.model";
import { HttpClientService } from "@/services/HttpClient.service";
import ActionButton from "@/shared/components/ActionButton/ActionButton";
import AddIcon from "@mui/icons-material/Add";
import resources from "@/resources/resources";

const Chefs = ({ chefsData }: { chefsData: IChef[] }) => {
  function handleCreateNew(): void {
    throw new Error("Function not implemented.");
  }

  const handleEdit = (rowData: IChef) => {
    // TODO :  create a edit func
  };

  const handleDelete = async (rowData: IChef) => {
    try {
      const response = await HttpClientService.delete(
        `/chefs/${rowData._id}`,
        null
      );
    } catch (error) {
      console.error("Error deleting chef:", error);
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
          data={chefsData}
          columns={chefColumns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Chefs;

export async function getServerSideProps() {
  try {
    // const fetchedChefs = await getChefs();
    const response = await HttpClientService.get<IChef[]>("/chefs");
    const fetchedChefs = response.data;
    return {
      props: {
        chefsData: fetchedChefs,
      },
    };
  } catch (error) {
    console.error("Error fetching chefs:", error);
    return {
      props: {
        chefsData: [],
      },
    };
  }
}

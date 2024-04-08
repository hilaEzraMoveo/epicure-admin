import Sidebar from "@/shared/components/Sidebar/Sidebar";
import React, { useState } from "react";
import GeneralTable from "../shared/components/GeneralTable/GeneralTable";
import { chefColumns } from "../data/tableColumns.data";
import { IChef } from "@/models/chef.model";
import { HttpClientService } from "@/services/HttpClient.service";
import ActionButton from "@/shared/components/ActionButton/ActionButton";
import AddIcon from "@mui/icons-material/Add";
import resources from "@/resources/resources";
import GenericDialog from "@/shared/components/GenericDialog/GenericDialog";
import { chefProps } from "@/data/editAndCreateProps.data";

const Chefs = ({ chefsData }: { chefsData: IChef[] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedChef, setSelectedChef] = useState<IChef | null>(null);

  const handleCreateNew = () => {
    setSelectedChef(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleEdit = (rowData: IChef) => {
    setSelectedChef(rowData);
    console.log(rowData);
    setIsDialogOpen(true);
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

  const handleCreateOrUpdateChef = async (newChefData: IChef) => {
    try {
      if (newChefData._id) {
        // edit operation
        const response = await HttpClientService.put(
          `/chefs/${newChefData._id}`,
          {
            updatedChefData: newChefData,
          }
        );
        console.log("response:", response.data);
      } else {
        //create operation
        console.log("creating new chef");
        const response = await HttpClientService.post(`/chefs`, {
          title: newChefData.title,
          image: newChefData.image,
          description: newChefData.description,
          restaurants: [],
          isChefOfTheWeek: newChefData.isChefOfTheWeek,
          status: newChefData.status,
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
          data={chefsData}
          columns={chefColumns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <GenericDialog
          open={isDialogOpen}
          allData={chefsData}
          data={selectedChef}
          props={chefProps}
          onClose={handleCloseDialog}
          onSubmit={handleCreateOrUpdateChef}
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

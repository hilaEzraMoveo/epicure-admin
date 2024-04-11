import Sidebar from "@/shared/components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
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
  const [updateChefsData, setUpdatedChefsData] = useState<IChef[]>(chefsData);

  useEffect(() => {
    setUpdatedChefsData(chefsData);
  }, [chefsData]);

  const handleCreateNew = () => {
    setSelectedChef(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedChef(null);
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
        const updatedData = updateChefsData.map((chef) =>
          chef._id === newChefData._id ? newChefData : chef
        );
        setUpdatedChefsData(updatedData);
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
        if (response.data) {
          // Add the new dish object to the updatedDishesData state
          setUpdatedChefsData((prevData: IChef[]) => {
            const newData = response.data as IChef;
            return [...prevData, newData];
          });
        }
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
      <div className="table-container">
        <ActionButton
          label={resources.createNew}
          onClick={handleCreateNew}
          icon={<AddIcon />}
        />
        <GeneralTable
          data={updateChefsData}
          columns={chefColumns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <GenericDialog
          open={isDialogOpen}
          allData={updateChefsData}
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

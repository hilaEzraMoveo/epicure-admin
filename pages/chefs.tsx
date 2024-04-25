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
import ProtectedRoute from "@/shared/components/ProtectedRoute/ProtectedRoute";
import LogoutButton from "@/shared/components/LogOutButton/LogOutButton";
import HomeButton from "@/shared/components/HomeButton/HomeButton";

const Chefs = ({ chefsData }: { chefsData: IChef[] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedChef, setSelectedChef] = useState<IChef | null>(null);
  const [updateChefsData, setUpdatedChefsData] = useState<IChef[]>(chefsData);
  const [chefOfTheWeek, setChefOfTheWeek] = useState<IChef | null>(null);

  useEffect(() => {
    setUpdatedChefsData(chefsData);
    const chefOfTheWeek = chefsData.find((chef) => chef.isChefOfTheWeek);
    setChefOfTheWeek(chefOfTheWeek ? chefOfTheWeek : null);
    console.log("chefOfTheWeek " + chefOfTheWeek?.title);
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
      if (chefOfTheWeek?._id === rowData._id) {
        setChefOfTheWeek(null);
        console.log("chef of the week after delete: " + chefOfTheWeek);
      }
      const response = await HttpClientService.delete(
        `/chefs/${rowData._id}`,
        null
      );

      console.log("response: ");
      console.log(response.data);
      //assume - to display the restaurant name after delete- do populate to restaurant in backend.
      const updatedData = updateChefsData.map((chef) =>
        chef._id === rowData._id ? (response.data as IChef) : chef
      );
      setUpdatedChefsData(updatedData);
    } catch (error) {
      console.error("Error deleting chef:", error);
    }
  };

  const handleCreateOrUpdateChef = (newChefData: IChef) => {
    try {
      if (newChefData._id) {
        editChef(newChefData);
      } else {
        createChef(newChefData);
      }
    } catch (error) {
      console.error("Error updating chef:", error);
    }
  };

  const editChef = async (newChefData: IChef) => {
    if (
      newChefData.isChefOfTheWeek.toString() === "true" &&
      chefOfTheWeek !== null &&
      chefOfTheWeek._id !== newChefData._id
    ) {
      alert(
        "There is already a chef of the week. You cannot set another chef as chef of the week."
      );
      return;
    }

    const response = await HttpClientService.put(`/chefs/${newChefData._id}`, {
      updatedChefData: newChefData,
    });
    console.log("response:", response.data);
    const updatedData = updateChefsData.map((chef) =>
      chef._id === newChefData._id ? newChefData : chef
    );
    setUpdatedChefsData(updatedData);

    if (
      newChefData.isChefOfTheWeek.toString() === "false" &&
      newChefData._id === chefOfTheWeek?._id
    ) {
      setChefOfTheWeek(null);
    }

    if (
      newChefData.isChefOfTheWeek.toString() === "true" &&
      chefOfTheWeek === null
    ) {
      setChefOfTheWeek(response.data as IChef);
    }
  };

  const createChef = async (newChefData: IChef) => {
    if (
      newChefData.isChefOfTheWeek.toString() === "true" &&
      chefOfTheWeek !== null
    ) {
      alert(
        "There is already a chef of the week. You cannot set another chef as chef of the week."
      );
      return;
    }

    const response = await HttpClientService.post(`/chefs`, {
      title: newChefData.title || "unknown",
      image:
        newChefData.image ||
        "https://cdn4.iconfinder.com/data/icons/people-14/24/Anonymous-2-512.png",
      description: newChefData.description || "none",
      restaurants: [],
      isChefOfTheWeek: newChefData.isChefOfTheWeek || false,
      status: newChefData.status || "active",
    });
    if (response.data) {
      // Add the new dish object to the updatedDishesData state
      setUpdatedChefsData((prevData: IChef[]) => {
        const newData = response.data as IChef;
        return [...prevData, newData];
      });

      if (newChefData.isChefOfTheWeek.toString() === "true") {
        setChefOfTheWeek(response.data as IChef);
      }
    }
  };

  return (
    <ProtectedRoute>
      <HomeButton />
      <LogoutButton />
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
    </ProtectedRoute>
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

import Sidebar from "@/shared/components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import GeneralTable from "../shared/components/GeneralTable/GeneralTable";
import { chefColumns } from "../data/tableColumns.data";
import { getChefs } from "@/services/chef.servise";
import { IChef } from "@/models/chef.model";

const chefs = () => {
  const [chefs, setChefs] = useState<IChef[]>([]);

  useEffect(() => {
    fetchChefsData();
  }, []);

  const fetchChefsData = async () => {
    try {
      const fetchedChefs = await getChefs();
      setChefs(fetchedChefs);
    } catch (error) {
      console.error("Error fetching chefs:", error);
    }
  };

  return (
    <div className="container">
      <Sidebar></Sidebar>
      <GeneralTable data={chefs} columns={chefColumns} />
    </div>
  );
};

export default chefs;

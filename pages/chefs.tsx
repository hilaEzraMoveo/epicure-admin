import Sidebar from "@/shared/components/Sidebar/Sidebar";
import React from "react";
import GeneralTable from "../shared/components/GeneralTable/GeneralTable";
import { chefColumns } from "../data/tableColumns.data";
import { getChefs } from "@/services/chef.service";
import { IChef } from "@/models/chef.model";

const Chefs = ({ chefsData }: { chefsData: IChef[] }) => {
  return (
    <div className="container">
      <Sidebar />
      <GeneralTable data={chefsData} columns={chefColumns} />
    </div>
  );
};

export default Chefs;

export async function getServerSideProps() {
  try {
    const fetchedChefs = await getChefs();
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

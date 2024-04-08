import Head from "next/head";
import Sidebar from "@/shared/components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to the Admin System</h1>
        <h2>Here you can create/edit/delete data of your app.</h2>
        <h3>Please choose collection you want to change.</h3>
      </div>
    </div>
  );
}

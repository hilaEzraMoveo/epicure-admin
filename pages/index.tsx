import Head from "next/head";
import Sidebar from "@/shared/components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to the Admin System</h1>
      </div>
    </div>
  );
}

import Sidebar from "@/shared/components/Sidebar/Sidebar";
import ProtectedRoute from "@/shared/components/ProtectedRoute/ProtectedRoute";
import LogoutButton from "@/shared/components/LogOutButton/LogOutButton";
export default function Home() {
  return (
    <ProtectedRoute>
      <LogoutButton />

      <div className="container">
        <Sidebar />
        <div className="main-content">
          <h1 className="main-title">Welcome to the Admin System </h1>
          <h2 className="sub-title">
            Here you can create/edit/delete data of your app.
          </h2>
          <h3 className="sub-heading">
            Please choose collection you want to change.
          </h3>
        </div>
      </div>
    </ProtectedRoute>
  );
}

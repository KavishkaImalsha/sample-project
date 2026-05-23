import AdminDashboardSideNav from "../../components/navbar/AdminDashboardSideNav";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminDashboardSideNav />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

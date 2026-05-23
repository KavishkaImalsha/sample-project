import { Package, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { useNavigate } from "react-router";

const AdminDashboardSideNav = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Dashboard",
      path: "#",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Products",
      path: "/dashboard/products",
      icon: <Package size={20} />,
    },
    { name: "Settings", path: "#", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col justify-between py-8 px-4">
      {/* Top Section */}
      <div>
        <div className="flex items-center gap-2 px-4 mb-10">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-xl font-bold text-gray-900">POS System</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all duration-200 group"
            >
              <span className="group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
};

export default AdminDashboardSideNav;

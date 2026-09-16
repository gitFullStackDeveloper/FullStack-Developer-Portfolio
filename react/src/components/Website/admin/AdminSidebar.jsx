import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminSidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: "fa-solid fa-gauge-high",
      label: "Dashboard",
    },
    { path: "/admin/projects", icon: "fa-solid fa-folder", label: "Projects" },
    {
      path: "/admin/services",
      icon: "fa-solid fa-briefcase",
      label: "Services",
    },
    {
      path: "/admin/analytics",
      icon: "fa-solid fa-chart-simple",
      label: "Analytics",
    },
    {
      path: "/admin/contacts",
      icon: "fa-solid fa-envelope",
      label: "Contacts",
    },
    { path: "/admin/settings", icon: "fa-solid fa-gear", label: "Settings" },
    { path: "/admin/profile", icon: "fa-solid fa-user", label: "Profile" },
    {
      path: "/admin/signup",
      icon: "fa-solid fa-user-plus",
      label: "Add Admin",
    },
    {
      path: "/admin/certifications",
      icon: "fa-solid fa-award",
      label: "Certifications",
    },
  ];

  return (
    <div className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="admin-sidebar-header">
        <i className="fa-solid fa-gear"></i>
        {!collapsed && <span>Admin Panel</span>}
      </div>
      <button className="admin-collapse-btn" onClick={onToggle}>
        <i className={`fa-solid fa-angles-${collapsed ? "right" : "left"}`}></i>
      </button>
      <nav className="admin-sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`admin-sidebar-link ${location.pathname.startsWith(item.path) ? "active" : ""}`}
          >
            <i className={item.icon}></i>
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}

        <div style={{ flex: 1 }} />

        <button
          onClick={handleLogout}
          className="admin-sidebar-link admin-logout-btn"
          title="Logout"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;

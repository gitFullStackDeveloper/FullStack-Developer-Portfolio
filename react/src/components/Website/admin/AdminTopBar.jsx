import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";

const AdminTopBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-profile-dropdown">
      <div className="admin-profile-trigger">
        <div className="admin-avatar-text">
          {user?.full_name?.charAt(0) || user?.email?.charAt(0) || "A"}
        </div>
        <span>{user?.full_name || user?.email}</span>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
      <div className="admin-dropdown-menu">
        <Link to="/admin/profile">
          <i className="fa-solid fa-user"></i> Profile
        </Link>
        <Link to="/admin/settings">
          <i className="fa-solid fa-gear"></i> Settings
        </Link>
        <button onClick={handleLogout} className="admin-dropdown-logout">
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminTopBar;

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const UserDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="user-menu">
      <img
        src={user.photoURL || "/default-avatar.png"}
        alt="User Avatar"
        onClick={() => setOpen(!open)}
        className="avatar"
      />
      {open && (
        <div className="dropdown">
          <p>{user.displayName}</p>
          <p>{user.email}</p>
          <button onClick={logout}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const UserDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { logout } = useContext(AuthContext);

 
  if (!user) return null;

  return (
    <div className="user-menu" style={{ position: "relative", display: "inline-block" }}>
      <img
        src={user.photoURL || "https://i.pinimg.com/280x280_RS/8a/74/c7/8a74c7f1be69d2a8a95f26e0dea33ed9.jpg"}
        alt="User Avatar"
        onClick={() => setOpen(!open)}
        className="avatar"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />

      {open && (
        <div
          className="dropdown"
          style={{
            position: "absolute",
            top: "50px",
            right: "0",
            background: "#fff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            padding: "10px",
            minWidth: "180px",
            textAlign: "left",
            zIndex: 999,
          }}
        >
          <p style={{ margin: "5px 0", fontWeight: "bold" }}>
            {user.displayName || "Unnamed User"}
          </p>
          <p style={{ margin: "5px 0", fontSize: "0.9rem", color: "#555" }}>
            {user.email}
          </p>
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            style={{
              marginTop: "10px",
              background: "#ff4d4d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "8px 12px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

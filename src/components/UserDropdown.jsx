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
        <div
          className="dropdown"
          style={{
           
            padding: "6px",
            
           
          }}
          >
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            style={{
              marginTop: "10px",
               background: "black",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "6px",
              cursor: "pointer",
             
            }}
          >
            LogOut
          </button>
        </div>
      
    </div>
  );
};

export default UserDropdown;

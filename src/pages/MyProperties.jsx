import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const res = await axios.get("http://localhost:3000/properties");
        const userProps = res.data.filter(
          (item) => item.userEmail === user?.email
        );
        setProperties(userProps);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchMyProperties();
    }
  }, [user]);

  
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:3000/properties/${id}`);

        if (res.data.deletedCount > 0) {
         
          setProperties((prev) => prev.filter((p) => p._id !== id));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your property has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete property. Try again later.",
        });
      }
    }
  };

  if (loading)
    return <p className="text-center mt-8 text-gray-600">Loading your properties...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        My Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t added any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition-shadow"
            >
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-3">{property.name}</h3>
              <p className="text-gray-600">{property.category}</p>
              <p className="font-semibold text-blue-600">${property.price}</p>
              <p className="text-sm text-gray-500">{property.location}</p>
              <p className="text-xs text-gray-400 mt-1">
                Posted:{" "}
                {property.createdAt
                  ? new Date(property.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/details/${property._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  View Details
                </button>

                <button
                  onClick={() => navigate(`/update-property/${property._id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(property._id)}
                  className="bg-red-300 hover:bg-red-400 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;

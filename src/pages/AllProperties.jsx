
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  // 
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://home-nest-server-sigma.vercel.app/properties?search=${search}&sort=${sortField}&order=${sortOrder}`
        );
        setProperties(res.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [search, sortField, sortOrder]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading properties...</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8">

      <h2 className="text-3xl font-bold text-center mb-6">
        All Properties
      </h2>


      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by property name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/3"
        />

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="price">Price</option>
          <option value="createdAt">Posted Date</option>
          <option value="propertyName">Property Name</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>


      {properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
            >

              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover rounded-t"
              />


              <div className="p-4">
                <h3 className="text-lg font-bold mb-1 text-gray-800">
                  {property.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">{property.category}</p>
                <p className="text-blue-600 font-semibold mb-2">${property.price}</p>
                <p className="text-sm text-gray-600 mb-2">{property.location}</p>


                <p className="text-xs text-gray-400 mb-3">
                  Posted by:{" "}
                  <span className="font-medium text-gray-700">
                    {property.userName || "Unknown"}
                  </span>
                </p>


                <button
                  onClick={() => navigate(`/details/${property._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProperties;

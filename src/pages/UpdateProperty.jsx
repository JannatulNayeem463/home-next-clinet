
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const UpdateProperty = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    propertyName: "",
    description: "",
    category: "",
    price: "",
    location: "",
    image: "",
  });

  // Fetch 
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`https://home-nest-server-sigma.vercel.app/properties/${id}`);
        setProperty(res.data);
        setFormData({
          propertyName: res.data.propertyName || "",
          description: res.data.description || "",
          category: res.data.category || "",
          price: res.data.price || "",
          location: res.data.location || "",
          image: res.data.image || "",
        });
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        userName: user.name,
        userEmail: user.email,
      };
      await axios.patch(`https://home-nest-server-sigma.vercel.app/properties/${id}`, updatedData);
      Swal.fire("Success!", "Property updated successfully.", "success");
      navigate(`/details/${id}`);
    } catch (error) {
      Swal.fire("Error!", "Failed to update property.", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading property data...</p>;

  if (!property) return <p className="text-center mt-10 text-red-500">Property not found!</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Property</h2>

      <form
        onSubmit={handleUpdate}
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {/* Editable Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Property Name</label>
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 mb-1">User Name</label>
          <input
            type="text"
            value={formData.name}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">User Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;

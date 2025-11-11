import React, { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const AddProperty = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Rent",
    price: "",
    location: "",
    image: "",
    userEmail: user?.email || "",
    userName: user?.displayName || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //
    const propertyData = {
      ...formData,
      userEmail: user?.email,
      userName: user?.displayName,
    };

    try {
      await axios.post("http://localhost:3000/properties", propertyData);
      Swal.fire({
        icon: "success",
        title: "Property Added!",
        text: "Your property has been successfully added.",
        timer: 2000,
        showConfirmButton: false,
      });
      setFormData({
        name: "",
        description: "",
        category: "Rent",
        price: "",
        location: "",
        image: "",
        userEmail: user?.email || "",
        userName: user?.displayName || "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add property. Please try again.",
      });
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4 shadow-md p-6 rounded-lg">
        
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="Rent">Rent</option>
          <option value="Sale">Sale</option>
          <option value="Commercial">Commercial</option>
          <option value="Land">Land</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />

        <input
          type="text"
          name="location"
          placeholder="Location (city, area, or address)"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />

        <input
          type="email"
          name="userEmail"
          value={formData.userEmail}
          readOnly
          className="w-full border rounded p-2 "
        />

        <input
          type="text"
          name="userName"
          value={formData.userName}
          readOnly
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700  py-2 rounded"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const DetailsPropertie = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  // ✅ Fetch property + reviews
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // Get property details
        const res = await axios.get(`http://localhost:3000/properties/${id}`);
        setProperty(res.data);

        // Get reviews
        const reviewsRes = await axios.get(
          `http://localhost:3000/reviews?propertyId=${id}`
        );
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

 
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0 || review.trim() === "") {
      Swal.fire("Warning", "Please provide a rating and review.", "warning");
      return;
    }

    const newReview = {
      propertyId: id,
      userName: user.name,
      userEmail: user.email,
      rating,
      review,
      createdAt: new Date(),
    };

    try {
      const res = await axios.post("http://localhost:3000/reviews", newReview);
      
      setReviews([newReview, ...reviews]);
      setRating(0);
      setReview("");
      Swal.fire("Success", "Your review has been submitted!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to submit review.", "error");
      console.error(error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading property details...</p>;
  }

  if (!property) {
    return <p className="text-center mt-10">Property not found.</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Property Image */}
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-96 object-cover rounded-lg"
        />

        
        <div>
          <h2 className="text-3xl font-bold mb-2">{property.name}</h2>
          <p className="text-gray-600 mb-2">{property.category}</p>
          <p className="text-blue-600 font-semibold text-xl mb-2">
            ${property.price}
          </p>
          <p className="text-gray-600 mb-2">{property.location}</p>
          <p className="text-gray-700 mb-2">{property.description}</p>
          <p className="text-xs text-gray-400 mb-1">
            Posted on: {new Date(property.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-700">
            Posted by: {property.userName} ({property.userEmail})
          </p>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Ratings & Reviews</h3>

        {/* Submit Review  */}
        {user ? (
          <form
            onSubmit={handleSubmitReview}
            className="mb-8 border p-4 rounded-lg shadow-sm"
          >
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Rating (1 to 5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border rounded px-2 py-1 w-20"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Review</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="border rounded w-full px-2 py-1"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-gray-500">Log in to submit a review.</p>
        )}

        {/* Display Reviews */}
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div
                key={r._id || r.createdAt}
                className="border p-3 rounded shadow-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium">{r.userName}</p>
                  <p className="text-yellow-500 font-semibold">{r.rating}⭐</p>
                </div>
                <p className="text-gray-700">{r.review}</p>
                <p className="text-xs text-gray-400">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPropertie;
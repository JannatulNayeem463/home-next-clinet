import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyRatings = () => {
  const { user } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRatings = async () => {
      try {
      
        const res = await axios.get(
          `http://localhost:3000/reviews?userEmail=${user?.email}`
        );
        const userRatings = res.data;

   
        const ratingsWithProperty = await Promise.all(
          userRatings.map(async (rating) => {
            const propRes = await axios.get(
              `http://localhost:3000/properties/${rating.propertyId}`
            );
            return { ...rating, property: propRes.data };
          })
        );

        setRatings(ratingsWithProperty);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchMyRatings();
  }, [user]);

  if (loading)
    return <p className="text-center mt-10">Loading your ratings...</p>;

  if (ratings.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        You have not submitted any ratings yet.
      </p>
    );

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        My Ratings & Reviews
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ratings.map((rating) => (
          <div
            key={rating._id}
            className="border rounded-lg shadow-sm p-4 bg-white"
          >
           
            <img
              src={rating.property.image}
              alt={rating.property.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl text-black font-bold mt-3">
              {rating.property.name}
            </h3>
            <p className="text-gray-600">{rating.property.category}</p>

         
            <p className="text-yellow-500 font-semibold mt-2">
              {rating.rating}⭐
            </p>
            <p className="text-gray-700 mt-1">{rating.review}</p>

            <p className="text-xs text-gray-400 mt-1">
              Reviewed on: {new Date(rating.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Reviewer: {rating.userName} ({rating.userEmail})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRatings;
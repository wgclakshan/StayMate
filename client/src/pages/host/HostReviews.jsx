import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import defaultProfileImg from "../../assets/profile.jpg";

const HostReviews = () => {
  const { token } = useAuth();
  const [guestReviews, setGuestReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/reviews/userreviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGuestReviews(data);
        const avgRating = data.reduce((acc, review) => acc + review.rating, 0) / data.length;
        setAverageRating(avgRating.toFixed(2));
      } catch (error) {
        console.error("Error fetching guest reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserReviews();
    }
  }, [token]);

  const extractNameFromEmail = (email) =>
    email.substring(0, email.indexOf("@")) || email;

  const renderStars = (rating) =>
    Array.from({ length: rating }, (_, i) => (
      <span key={i} className="text-xl text-yellow-400">⭐</span>
    ));

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <section className="mb-8">
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-700">
            <h2 className="text-2xl font-bold">Total Reviews</h2>
            <p className="text-3xl font-semibold">{guestReviews.length}</p>
          </div>
          <div className="text-gray-700">
            <h2 className="text-2xl font-bold">Average Rating</h2>
            <p className="text-3xl font-semibold">{averageRating}</p>
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guestReviews.map(
          ({ _id, user, rating, comment, property, createdAt }) => (
            <div
              key={_id}
              className="bg-white border rounded-lg shadow-md p-6 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <img
                  src={defaultProfileImg}
                  alt="Profile"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-gray-900 font-semibold">
                    {extractNameFromEmail(user.email)}
                  </h3>
                  <div className="flex mt-1">{renderStars(rating)}</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{comment}</p>
              <p className="text-gray-600 font-semibold mb-2">{property.title}</p>
              <div className="text-sm text-gray-500">
                {new Date(createdAt).toLocaleDateString()}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HostReviews;
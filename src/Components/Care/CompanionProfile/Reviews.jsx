// src/Components/Reviews/Reviews.js
import React, { useState } from "react";
import "./Reviews.css"; // for styling

const Reviews = () => {
  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem("reviews")) || [
      {
        reviewer: "John Doe",
        feedback: "Great service!",
        photo:
          "https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg",
      },
      {
        reviewer: "Garry Lee",
        feedback: "Very caring Doctors.",
        photo:
          "https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg",
      },
    ];
  });

  const [newReview, setNewReview] = useState({
    reviewer: "",
    feedback: "",
    photo: "https://img.freepik.com/free-vector/user-flat-icon_1053-1288.jpg", // default
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.reviewer || !newReview.feedback) return;

    const updated = [...reviews, newReview];
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
    setNewReview({
      reviewer: "",
      feedback: "",
      photo: "https://img.freepik.com/free-vector/user-flat-icon_1053-1288.jpg",
    });
  };

  return (
    <div className="reviews">
      <h2>What People Say</h2>

      {/* Carousel wrapper */}
      <div className="reviews-carousel">
        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <img src={r.photo} alt={r.reviewer} className="review-photo" />
            <h4>{r.reviewer}</h4>
            <p>"{r.feedback}"</p>
          </div>
        ))}
      </div>

      {/* Add Review Form
      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          placeholder="Your Name"
          value={newReview.reviewer}
          onChange={(e) =>
            setNewReview({ ...newReview, reviewer: e.target.value })
          }
        />
        <textarea
          placeholder="Your Feedback"
          value={newReview.feedback}
          onChange={(e) =>
            setNewReview({ ...newReview, feedback: e.target.value })
          }
        />
        <button type="submit">Submit Review</button>
      </form> */}
    </div>
  );
};

export default Reviews;

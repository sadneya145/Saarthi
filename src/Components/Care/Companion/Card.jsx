import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/care/${props.type}/${props.name}`)
  }

  return (
    <div className="profile-card p-4 my-3" onClick={handleClick}>
      <img src={props.img} alt="Nurse" className="nurse-photo mb-1" />
      <h2 className="mt-3">{props.name}</h2>
      <p className="mt-3" style={{textAlign: 'justify'}}> {props.bio} </p>
      <p>
        <strong>Experience:</strong> {props.experience}
      </p>
      <p>
        <strong>Gender:</strong> {props.gender}
      </p>
      <p>
        <strong>Location:</strong> {props.location}
      </p>
    </div>
  );
}

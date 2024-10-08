import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Essentials/Header';
import Footer from '../Essentials/Footer';

const PatientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { address, patients } = location.state || {};

  const handleConfirm = () => {
    navigate('/confirmation', { state: { address, patients } });
  };

  if (!address || !patients) {
    return <div>No data available. Please go back and submit the form again.</div>;
  }

  return (
    <div>
      <Header/>
      <div className="p-3">
      <h2>Patient Details</h2>

      <h3>Address</h3>
      <p>{address.address1}, {address.address2}</p>
      <p>{address.city}, {address.state}, {address.zip}</p>

      <h3>Patients</h3>
      {patients.map((patient, index) => (
        <div key={index} role="region" aria-labelledby={`patient-${index}`}>
          <h4 id={`patient-${index}`}>Patient {index + 1}</h4>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>
        </div>
      ))}

      <button className="btn btn-primary mt-3" onClick={handleConfirm}>
        Confirm Booking
      </button>
    </div>
    <Footer/>
    </div>
  );
};

PatientDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      address: PropTypes.shape({
        address1: PropTypes.string.isRequired,
        address2: PropTypes.string,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zip: PropTypes.string.isRequired,
      }),
      patients: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          age: PropTypes.number.isRequired,
          diagnosis: PropTypes.string.isRequired,
        })
      ).isRequired,
    }),
  }),
};

export default PatientDetails;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Header from "../Essentials/Header";
import Footer from "../Essentials/Footer";
import axios from 'axios';

export default function Forms() {
  const params = useParams();
  const title = params.type;

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    serviceCategory: title,
  });

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFiles(uploadedFiles);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the form data and files
    const data = new FormData();

    // Append form fields to FormData
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Append files only if they exist
    if (files.length > 0) {
      files.forEach(fileData => {
        data.append("documents", fileData.file); // Append each file
      });
    }

    try {
      const res = await axios.post('http://localhost:5000/api/service/submit', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(res.data.message); // Use a success message from the server
      // Reset the form or do something else on success
      setFormData({
        name: '',
        degree: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        serviceCategory: title,
      });
      setFiles([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <Form className="p-3" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter your full name" 
              name="name" 
              value={formData.name}
              onChange={handleChange} 
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formDegree">
            <Form.Label>Degree</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Degree" 
              name="degree" 
              value={formData.degree}
              onChange={handleChange} 
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control 
            placeholder="1234 Main St" 
            name="address" 
            value={formData.address}
            onChange={handleChange} 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control 
            placeholder="Apartment, studio, or floor" 
            name="address2" 
            value={formData.address2}
            onChange={handleChange} 
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control 
              name="city" 
              value={formData.city}
              onChange={handleChange} 
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select name="state" value={formData.state} onChange={handleChange} required>
              <option>Choose...</option>
              {/* Add state options here */}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control 
              name="zip" 
              value={formData.zip}
              onChange={handleChange} 
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Service Category</Form.Label>
          <Form.Select disabled>
            <option>{title}</option>
          </Form.Select>
        </Form.Group>

        {/* Multiple File Upload Section */}
        <Form.Group className="mb-3" controlId="formFileMultiple">
          <Form.Label>Upload documents (Optional)</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </Form.Group>

        {/* Display Uploaded Files as Links */}
        <div className="mb-3">
          <h6>Uploaded documents:</h6>
          {files.length > 0 ? (
            <ul>
              {files.map((fileData, index) => (
                <li key={index}>
                  <a href={fileData.url} target="_blank" rel="noopener noreferrer">
                    {fileData.file.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No files uploaded yet</p>
          )}
        </div>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="I agree to the terms and conditions" required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Footer />
    </div>
  );
}

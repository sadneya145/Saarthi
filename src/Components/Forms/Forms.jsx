import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Header from "../Essentials/Header";
import Footer from "../Essentials/Footer";

export default function Forms() {
  const params = useParams();
  const title = params.type;

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  return (
    <div>
      <Header />
      <Form className="p-3">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your full name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formDegree">
            <Form.Label>Degree</Form.Label>
            <Form.Control type="text" placeholder="Degree" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
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
          <Form.Label>Upload documents</Form.Label>
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
          <Form.Check type="checkbox" label="I agree to the terms and conditions" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>


      </Form>
      <Footer />
    </div>
  );
}

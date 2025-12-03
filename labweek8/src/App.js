// Name: Shayan Pourahmad
// Student ID: 101474651
// Lab 08 - COMP3123



import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    province: '',
    postalCode: ''
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    // Reset form after submission if needed
    // setFormData({
    //   email: '',
    //   fullName: '',
    //   address: '',
    //   city: '',
    //   province: '',
    //   postalCode: ''
    // });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>COMP 3123 - Lab Week 10</h1>
        <h2>Data Entry Form</h2>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="data-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="province">Province:</label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

        {submittedData && (
          <div className="submitted-data">
            <h3>Submitted Information:</h3>
            <table className="data-table">
              <tbody>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{submittedData.email}</td>
                </tr>
                <tr>
                  <td><strong>Full Name:</strong></td>
                  <td>{submittedData.fullName}</td>
                </tr>
                <tr>
                  <td><strong>Address:</strong></td>
                  <td>{submittedData.address}</td>
                </tr>
                <tr>
                  <td><strong>City:</strong></td>
                  <td>{submittedData.city}</td>
                </tr>
                <tr>
                  <td><strong>Province:</strong></td>
                  <td>{submittedData.province}</td>
                </tr>
                <tr>
                  <td><strong>Postal Code:</strong></td>
                  <td>{submittedData.postalCode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
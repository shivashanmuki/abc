import React, { useEffect, useState } from 'react';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8088/services');
        const data = await response.json();
        if (data.statusCode === 200) {
          setServices(data.data);
        } else {
          console.error('Failed to fetch services:', data.statusMessage);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-center my-5">Our Services</h1>
      <div className="search-container" style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: '8px',
            width: '300px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
      </div>
      <div className="services-table-container">
        <table className="services-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Service Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <tr key={index}>
                  <td>{service.title}</td>
                  <td>{service.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No services found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;

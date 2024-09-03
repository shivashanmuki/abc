import React, { useState } from 'react';
import './Facility.css';
import dineInImage from './img/The-Rising-Value-of-Food-Delivery.jpg'
import Delivery from './img/online-reservation-system(1).png'
import Reservation from './img/online-reservation-system.png'
const facilities = [
  {
    id: 1,
    title: 'Dine-In Service',
    description: 'The restaurant provides a comfortable and inviting atmosphere for guests to enjoy their meals on-site. The dine-in facility is designed with a variety of seating arrangements, including family booths, intimate tables for couples, and larger tables for groups. The ambiance is enhanced with tasteful decor, lighting, and background music to create a pleasant dining experience.',
    image: Reservation
  },
  {
    id: 2,
    title: 'Online Reservation System',
    description: 'Customers can conveniently book a table online through the restaurant’s website or mobile app. The online reservation system allows users to select their preferred date, time, and seating arrangement. It also offers features like booking modifications, cancellation options, and special requests, ensuring a hassle-free dining experience.',
    image: Delivery
  },
  {
    id: 3,
    title: 'Home Delivery Service',
    description: 'The restaurant offers a reliable home delivery service for customers who prefer to enjoy their meals in the comfort of their own homes. The delivery service is fast and efficient, with a dedicated team ensuring that the food is delivered hot and fresh. Customers can place orders via the restaurant’s website, app, or phone, and track their orders in real-time.',
    image: dineInImage
  }
];

const Facility = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFacilities = facilities.filter(facility =>
    facility.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    facility.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="facility-page">
      <h1 className="text-center my-5">Our Facilities</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search facilities..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="facility-list">
        {filteredFacilities.length > 0 ? (
          filteredFacilities.map((facility) => (
            <div key={facility.id} className="facility-card">
              <img src={facility.image} alt={facility.title} className="facility-image" />
              <div className="facility-info">
                <h2>{facility.title}</h2>
                <p>{facility.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-facilities">No facilities found</p>
        )}
      </div>
    </div>
  );
};

export default Facility;

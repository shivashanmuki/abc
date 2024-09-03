import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './MyReservations.css';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('email');

    if (email) {
      fetch(`http://localhost:8088/reservations/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.statusCode === 200) {
            setReservations(data.data);
          }
        })
        .catch(error => console.error('Error fetching reservations:', error));
    } else {
      console.error('No email found in localStorage.');
    }
  }, []);

  const handleCancel = (id) => {
    fetch(`http://localhost:8088/reservations/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setReservations(reservations.filter(reservation => reservation.id !== id));
          alert('Reservation canceled successfully!');
        } else {
          alert('Failed to cancel reservation');
        }
      })
      .catch(error => console.error('Error canceling reservation:', error));
  };

  return (
    <div className="my-reservations-container">
      <h2 className="my-reservations-title">My Reservations</h2>
      <Table bordered hover>
  <thead className="table-dark">
    <tr>
      <th>Date</th>
      <th>Time</th>
      <th>Service</th>
      <th>Number of People</th>
      <th>Product</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {reservations.map((reservation) => (
      <tr key={reservation.id}>
        <td>{reservation.date}</td>
        <td>{reservation.time}</td>
        <td>{reservation.service}</td>
        <td>{reservation.numberOfPeople}</td>
        <td>
          {Object.entries(reservation.product).map(([key, value]) => (
            <div
              key={key}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '5px',
                marginBottom: '5px',
                backgroundColor: '#f8f9fa',
              }}
            >
              {key}: {value}
            </div>
          ))}
        </td>
        <td>
          {reservation.status ? (
            <Button variant="success" disabled>
              Accepted
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={() => handleCancel(reservation.id)}
            >
              Cancel
            </Button>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</Table>



    </div>
  );
};

export default MyReservations;

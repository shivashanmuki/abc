import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Button } from 'react-bootstrap'; 
import './Reservations.css';

const Reservation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [reservationType, setReservationType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [foodDetails, setFoodDetails] = useState(state?.foodDetails || '');
  const [paymentMethod, setPaymentMethod] = useState('COD');

  useEffect(() => {
    fetch('http://localhost:8088/services')
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setServices(data.data);
          setReservationType(data.data[0]?.title || '');
        }
      })
      .catch((error) => console.error('Error fetching services:', error));
  }, []);
  function parseFoodDetails(foodDetails) {
    const productDetails = {};

    if (!foodDetails) return productDetails;
    const items = foodDetails.split(',').map(item => item.trim());
    items.forEach(item => {
        const match = item.match(/(.+?) - Rs\. (\d+) (\d+)$/);
        if (match) {
            const [, name, priceStr, idStr] = match;
            const price = parseFloat(priceStr);
            const id = parseInt(idStr, 10);

            if (!isNaN(price) && !isNaN(id)) {
                productDetails[id] = price;
            }
        }
    });

    return productDetails;
}

  const handleReservation = (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email'); 
    const reservationData = {
      time: new Date(`${date}T${time}`).toISOString(),
      specialRequests: specialRequests,
      paymentMethod: paymentMethod,
      numberOfPeople: numberOfPeople,
      userId: email,
      serviceId: services.find(service => service.title === reservationType)?.id,
      product: parseFoodDetails(state?.foodDetails)
  };
  console.log(foodDetails)

    fetch('http://localhost:8088/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.statusCode === 200) {
            alert('Reservation successful!');
            navigate('/confirmation', { state: { reservationId: data.data.id } });
        } else {
            alert('Failed to make reservation: ' + data.message);
        }
    })
    .catch(error => console.error('Error making reservation:', error));
};


  return (
    <div className="reservation-container">
      <h2 className="reservation-title">Online Reservation</h2>
      <form className="reservation-form" onSubmit={handleReservation}>
        <div className="form-group">
          <label htmlFor="reservationType">Reservation Type:</label>
          <select
            id="reservationType"
            className="reservation-select"
            value={reservationType}
            onChange={(e) => setReservationType(e.target.value)}
          >
            {services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Reservation Date:</label>
          <input
            type="date"
            id="date"
            className="reservation-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Reservation Time:</label>
          <input
            type="time"
            id="time"
            className="reservation-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfPeople">Number of People:</label>
          <div className="number-of-people-container">
            <button
              type="button"
              className="number-of-people-button"
              onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
            >
              -
            </button>
            <input
              type="text"
              id="numberOfPeople"
              className="reservation-input text-center"
              value={numberOfPeople}
              readOnly
            />
            <button
              type="button"
              className="number-of-people-button"
              onClick={() => setNumberOfPeople(numberOfPeople + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="form-group">
  <label>Food Details:</label>
  {foodDetails ? (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Product ID</th>
          </tr>
        </thead>
        <tbody>
          {foodDetails.split(',').map((item, index) => {
            const match = item.match(/(.+?) - Rs\. (\d+) (\d+)$/);
            if (match) {
              const [, name, priceStr, idStr] = match;
              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{priceStr}</td>
                  <td>{idStr}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-muted">No food details provided.</p>
  )}
  {!foodDetails && (
    <Button
      variant="warning"
      onClick={() => navigate('/menu')}
      className="mt-2"
    >
      Go to Menu
    </Button>
  )}
</div>


        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            className="reservation-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery (COD)</option>
            <option value="CreditCard">Credit Card</option>
          </select>
        </div>

        <button type="submit" className="reservation-button">Reserve</button>
        <button
        style={{marginTop:'20px'}}
          type="button"
          className="reservation-button"
          onClick={() => navigate('/my-reservations')}
        >
          My Reservation
        </button>
      </form>
    </div>
  );
};

export default Reservation;

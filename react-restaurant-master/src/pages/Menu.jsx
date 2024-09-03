import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Menu.css';
import { Card, CardBody, CardText, CardTitle, Button } from 'react-bootstrap';
import BreakfastImg from '../utils/img/breakfast.jpg';
import LunchImg from '../utils/img/lunch.jpg';
import DinnerImg from '../utils/img/dinner.jpg';
import DessertImg from '../utils/img/dessert.jpg';

const categoryImages = {
  breakfast: BreakfastImg,
  lunch: LunchImg,
  dinner: DinnerImg,
  dessert: DessertImg,
};

function Menu() {
  const [menuItems, setMenuItems] = useState({});
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:8088/product');
        const data = await response.json();
        if (data.statusCode === 200) {
          const productsByCategory = data.data.reduce((acc, product) => {
            const category = product.category.toLowerCase();
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(product);
            return acc;
          }, {});
          setMenuItems(productsByCategory);
        } else {
          console.error('Failed to fetch products:', data.statusMessage);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    const foodDetails = cart.map(item => `${item.name} - Rs. ${item.price} ${item.id}`).join(', ');
    navigate('/reservations', { state: { foodDetails } });
  };

  return (
    <div className="menu-page">
       <header className="mt-5">
        <div className="container h-100 d-flex align-items-center justify-content-center">
          <h1 className="text-light">Menu</h1>
        </div>
      </header>

      {Object.entries(menuItems).map(([category, items]) => (
        <div className={`${category} my-5`} key={category}>
          <div className="container">
            <h2 className="text-center fs-1 mb-4 mb-lg-5 text-uppercase fw-bold text-success">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <div className="row flex-column-reverse flex-lg-row">
              <div className="col-lg-6 d-flex justify-content-center">
                <img
                  src={
                    category === "breakfast"
                      ? BreakfastImg
                      : category === "lunch"
                      ? LunchImg
                      : category === "dinner"
                      ? DinnerImg
                      : DessertImg
                  }
                  className="img-fluid w-75 mt-4 mt-lg-0"
                  alt={category}
                />
              </div>
              <div className="col-lg-6 d-flex flex-column justify-content-around">
                {items.map((item) => (
                  <div key={item.id}>
                    <Card className="border-0">
                      <CardBody>
                        <CardTitle className="text-center fs-3">
                          {item.name}
                        </CardTitle>
                        <CardText className="text-center fs-5">
                          {item.description}
                        </CardText>
                        <CardText className="text-center fs-3 fw-bold text-success">
                          Rs. {item.price}
                        </CardText>
                        <div className="d-flex justify-content-center">
                          <Button
                            className="add-to-cart-button"
                            variant="success"
                            onClick={() => addToCart(item)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="cart my-5">
        <div className="container">
          <h2 className="text-center fs-1 mb-4 mb-lg-5 text-uppercase fw-bold text-success">Your Cart</h2>
          {cart.length > 0 ? (
            <div>
              {cart.map((item, index) => (
                <div key={index}>
                  <Card className="border-0 mb-3">
                    <CardBody>
                      <CardTitle className="text-center fs-3">{item.name}</CardTitle>
                      <CardText className="text-center fs-5">{item.description}</CardText>
                      <CardText className="text-center fs-3 fw-bold text-success">Rs. {item.price}</CardText>
                    </CardBody>
                  </Card>
                </div>
              ))}
              <div className="text-center fs-3 fw-bold">
                Total: Rs. {calculateTotal()}
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Button className="checkout-button" variant="primary" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-center fs-4">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;

import React, { useEffect, useState } from 'react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:8088/product')
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 200) {
          setProducts(data.data);
        } else {
          console.error('Failed to fetch products:', data.statusMessage);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="products-page">
      <h1 style={{marginTop:'70px'}}>Our Products</h1>
      <div className="product-table-container" style={{ overflowX: 'auto' }}>
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Availability</th>
            </tr>
            <tr style={{ backgroundColor: '#f9f9f9' }}>
              <th colSpan="5">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    boxSizing: 'border-box',
                    border: '1px solid #ddd'
                  }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>{`Rs. ${product.price}`}</td>
                  <td>{product.isAvailable ? 'In Stock' : 'Out of Stock'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;

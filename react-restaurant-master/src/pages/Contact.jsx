import React, { useState } from 'react';
import './Contact.css';
import { ContactInfo } from '../components/ContactInfo';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Reviews } from '../components/Reviews';

function Contact() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [comments, setComments] = useState('');
    const isLoggedIn = !!localStorage.getItem('token'); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const enquiryData = {
            providedEmail: email, 
            email: localStorage.getItem('email') ,
            phone: phone,
            comments: comments,
        };

        fetch('http://localhost:8088/enquiries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(enquiryData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.statusCode === 200) {
                alert('Enquiry sent successfully!');
                navigate('/comments-history'); 
            } else {
                alert('Failed to send enquiry. Please try again.');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className='contact-page'>
            <header className='mt-5'>
                <div className='container h-100 d-flex align-items-center justify-content-center text-center'>
                    <h1 className='text-light'>Get in Touch with Us</h1>
                    <p className='text-light lead'>We’d love to hear from you! Fill out the form below or give us a call.</p>
                </div>
            </header>

            <div className='container my-5'>
                <div className='row'>
                    <div className='col-lg-6 d-flex align-items-center justify-content-center'>
                        <ContactInfo />
                    </div>
                    <div className='col-lg-6 d-flex justify-content-center'>
                        <Form className='w-100 p-4 shadow-lg rounded' style={{ backgroundColor: '#f9f9f9' }} onSubmit={handleSubmit}>
                            <Form.Group className='row mb-3'>
                                <div className='col-md-6'>
                                    <Form.Label htmlFor='email-address' className='font-weight-bold'>Email Address</Form.Label>
                                    <Form.Control 
                                        type='email' 
                                        id='email-address' 
                                        placeholder='john.doe@example.com' 
                                        className='p-2 rounded border-0'
                                        style={{ backgroundColor: '#eef2f7' }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <Form.Label htmlFor='phone-number' className='font-weight-bold'>Phone Number</Form.Label>
                                    <Form.Control 
                                        type='tel' 
                                        id='phone-number' 
                                        placeholder='+1 234 567 8901' 
                                        className='p-2 rounded border-0'
                                        style={{ backgroundColor: '#eef2f7' }}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </Form.Group>

                            {isLoggedIn ? (
                                <>
                                    <Form.Group className='mb-4'>
                                        <Form.Label htmlFor='comments' className='font-weight-bold'>Comments</Form.Label>
                                        <Form.Control 
                                            as='textarea' 
                                            id='comments' 
                                            rows={4} 
                                            placeholder='Write your message here...' 
                                            className='p-3 rounded border-0'
                                            style={{ backgroundColor: '#eef2f7' }}
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                        />
                                        <button 
                                            type='submit' 
                                            className='btn btn-success btn-lg w-100 mt-3 shadow-sm'
                                            style={{
                                                backgroundColor: '#28a745',
                                                borderColor: '#28a745',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Send Enquiries
                                        </button>
                                    </Form.Group>
                                    <button
                                        type="button"
                                        className="btn btn-outline-info btn-lg w-100 mt-2"
                                        onClick={() => navigate('/comments-history')}
                                    >
                                        View Enquiries History
                                    </button>
                                </>
                            ) : (
                                <div className="text-center mt-4">
                                    <p 
                                        className="text-danger font-weight-bold" 
                                        style={{
                                            fontSize: '1.2rem',
                                            backgroundColor: '#ffe5e5',
                                            padding: '10px 15px',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        Please log in to leave a comment.
                                    </p>
                                </div>
                            )}
                        </Form>
                    </div>
                </div>
            </div>

            <div className='bg-dark text-light py-5'>
                <div className='container'>
                    <h2 className='text-center mb-4'>What Our Customers Say</h2>
                    <Reviews />
                </div>
            </div>
        </div>
    );
}

export default Contact;

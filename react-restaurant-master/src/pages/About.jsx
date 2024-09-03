import React from 'react';
import './About.css';
import AboutChef1 from '../utils/img/about-chef1.jpg';
import AboutChef2 from '../utils/img/about-chef2.jpg';
import { ImageGallery } from '../components/ImageGallery';
import { Reviews } from '../components/Reviews';

function About() {
    return (
        <div className='about-page'>
            <header className='mt-5'>
                <div className='container h-100 d-flex align-items-center justify-content-center'>
                    <h1 className='text-light'>About</h1>
                </div>
            </header>

            <div className='container my-5'>
                <p>The ABC Experience-

Dining at ABC Restaurant is more than just a meal; it’s an experience. From the moment you step through our doors, you’ll be greeted with warm smiles and an inviting atmosphere. Our interior design blends modern elegance with cozy charm, making it the perfect setting for any occasion – be it a romantic dinner, a family gathering, or a night out with friends.

Our attentive staff is here to ensure that your time with us is nothing short of exceptional. We understand that each guest is unique, and we strive to cater to your individual preferences and needs. Whether you have dietary restrictions, special requests, or are simply seeking recommendations, our team is dedicated to making your dining experience tailored to you.</p>
                <p>Join Us-

Whether you’re a longtime patron or a first-time visitor, we invite you to join us at ABC Restaurant for an experience that is sure to delight your senses. Come savor the flavors, enjoy the ambiance, and create lasting memories with us. Thank you for choosing ABC Restaurant – where every meal is a celebration!</p>

                <div className='row'>
                    <div className='col-lg-6'>
                        <img src={AboutChef1} className='img-fluid my-4' alt="" />
                    </div>
                    <div className='col-lg-6'>
                        <img src={AboutChef2} className='img-fluid my-4' alt="" />
                    </div>
                </div>

                <p>Community and Sustainability-

At ABC Restaurant, we believe in giving back to the community that has supported us over the years. We actively participate in local events and initiatives, and we are committed to sustainability in all aspects of our operations. From sourcing locally grown ingredients to minimizing waste, we strive to make a positive impact on our environment and community.</p>
            </div>

            <div className='bg-dark text-light'>
                <ImageGallery />
            </div>

            <div className='my-5'>
                <Reviews />
            </div>
        </div>
    )
}

export default About;
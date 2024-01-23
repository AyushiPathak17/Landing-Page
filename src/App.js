import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://api.practo.com/doctors/';
const TESTIMONIALS_ENDPOINT = 'https://api.example.com/testimonials';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    city: '',
    company: '',
    complaints: '',
    physioExperience: false,
  });

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');

    
    if (cityParam) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        city: cityParam,
      }));
      
      // Fetch doctors for the updated city
      fetchDoctors(cityParam);
    } else {
      // Fetch doctors using the default formData.city
      fetchDoctors(formData.city);
    }

    // Fetch testimonials
    fetchTestimonials();
  }, [formData.city]); // Trigger the effect when formData.city changes

  const fetchDoctors = async (city) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}?city=${city}`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      
    }
  };

  const fetchTestimonials = async () => {
    try {
      const testimonialsResponse = await axios.get(TESTIMONIALS_ENDPOINT);
      setTestimonials(testimonialsResponse.data);
      setError(null); 
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Form Data Submitted:', formData);

      // Check for previous experience with physiotherapy based on age
      if (parseInt(formData.age, 10) < 40) {
        setFormData({ ...formData, physioExperience: false });
      }

      setError(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form. Please try again later.');
    }
  };

  const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    const body = document.body;
    body.classList.toggle('dark-theme', !isDarkTheme);
  };
  
  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <span>
          <a href="#hero">Home</a>
          <a href="#consult-form">Consultation Form</a>
          <a href="#testimonial">Testimonials</a>
        </span>
        <button className="toggle-theme-button" onClick={toggleDarkTheme}>
          {isDarkTheme ? (
            <>
              <i className="fas fa-sun"></i>
            </>
          ) : (
            <>
              <i className="fas fa-moon"></i>
            </>
          )}
        </button>
      </div>

      {/* Hero Section */}
      <section className="hero-section" id="hero">
      <h1>"At Fix Health, we redefine healthcare by combining cutting-edge expertise with compassionate care. Your path to optimal wellness begins with us – join us in creating a healthier future together."</h1>
        <img src="https://worldline.com/content/dam/worldline/global/images/blog-content-images/prior-blogs/img-older-person-with-doctor.jpg/jcr:content/renditions/Desktop.jpeg" alt="Hero" />
      </section>

      {/* Header Section */}
      <section className="header-section">
        <h2>Welcome to Fix Health</h2>
        <p>Your path to a healthier life starts here.</p>
      </section>

      {/* Consultation Booking Form */}
      
      <section className="booking-form-section" id="consult-form">
      <h2>Book a Consultation</h2>
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              placeholder="Enter your name here"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              placeholder="Enter your Phone Number here"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </label>
          <label>
            Age:
            <input
              type="text"
              placeholder="Enter your Age here"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              placeholder="Enter your City here"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </label>
          <label>
            Company:
            <input
              type="text"
              placeholder="Enter your Company here"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </label>
          <label>
            Chief Complaints:
            <textarea 
            placeholder="Write your complaints here( If any)..."              
            value={formData.complaints}
              onChange={(e) => setFormData({ ...formData, complaints: e.target.value })}
            />
          </label>
          {parseInt(formData.age, 10) >= 40 && (
            <label>
              Previous Experience with Physiotherapy:
              <input
                type="checkbox"
                checked={formData.physioExperience}
                onChange={() =>
                  setFormData({ ...formData, physioExperience: !formData.physioExperience })
                }
              />
            </label>
          )}
          <h3>Available Doctors</h3>
          <ul>
            {doctors.map((doctor) => (
              <li key={doctor.name}>
                {doctor.name} - {doctor.expertise} - {doctor.city}
              </li>
            ))}
          </ul>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Book Now</button>
        </form>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonial">
        <h2>Testimonials</h2>
        <div className="testimonial-container">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial">
              <p className="quote">{testimonial.quote}</p>
              <p className="author">- {testimonial.author}</p>
            </div>
          ))}
        </div>
        {error && <p className="error-message">{error}</p>}
      </section>

      {/* Footer Section */}
      <section className="footer-section">
        <p>&copy; 2024 Fix Health. All rights reserved.</p>
      </section>
    </div>
  );
};

export default App;

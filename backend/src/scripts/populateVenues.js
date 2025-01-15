const axios = require('axios');

const API_URL = 'http://192.168.1.102:5000/api';
const VENUE_URL = `${API_URL}/venues`;

const venues = [
  {
    name: "Sunny Sports Center",
    location: "123 Sports Avenue, Cityville",
    sport_id: 1,
    availability: "9:00 AM - 9:00 PM",
    rentalCost: 50.00,
    contactInfo: "email@example.com, +1234567890",
  },
  {
    name: "Green Valley Arena",
    location: "45 Valley Road, Sportstown",
    sport_id: 2,
    availability: "8:00 AM - 10:00 PM",
    rentalCost: 70.00,
    contactInfo: "contact@greenvalley.com, +9876543210",
  },
];

const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/csrf-token`);
    return response.data.csrfToken;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error.response?.data || error.message);
    throw error;
  }
};

const populateVenues = async () => {
  try {
    const csrfToken = await fetchCsrfToken();
    console.log('Fetched CSRF token:', csrfToken);

    for (const venue of venues) {
      try {
        const response = await axios.post(VENUE_URL, venue, {
          headers: {
            'X-CSRF-Token': csrfToken,
            'Content-Type': 'application/json',
          },
        });
        console.log(`Added venue: ${response.data.name}`);
      } catch (error) {
        console.error(
          `Failed to add venue: ${venue.name}`,
          error.response?.data || error.message
        );
      }
    }
  } catch (error) {
    console.error('Error during venue population:', error.message);
  }
};

populateVenues();

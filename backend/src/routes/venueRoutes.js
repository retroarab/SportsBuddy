const express = require('express');
const router = express.Router();
const venueController = require('../controllers/venueController');

// Routes for venues
router.get('/', venueController.listVenues);                 // List all venues
router.post('/', venueController.addVenue);                  // Add a new venue
router.get('/:id', venueController.getVenueDetails);         // Get specific venue details
router.post('/:id/book', venueController.bookVenue);         // Book a venue
router.get('/:id/reviews', venueController.listVenueReviews);// List reviews for a venue
router.post('/:id/reviews', venueController.addVenueReview); // Add a new review for a venue

module.exports = router;

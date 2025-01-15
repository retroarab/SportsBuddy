const prisma = require('../prisma');

exports.listVenues = async (req, res) => {
  try {
    const venues = await prisma.venue.findMany();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list venues' });
  }
};

exports.addVenue = async (req, res) => {
  const { name, location, sport_id, availability, rentalCost, contactInfo } = req.body;

  try {
    const venue = await prisma.venue.create({
      data: {
        name,
        location,
        sport_id, // Match the foreign key field in your schema
        availability,
        rental_cost: rentalCost, // Match the exact column name in your schema
        contact_info: contactInfo, // Match the exact column name in your schema
      },
    });
    res.status(201).json(venue);
  } catch (error) {
    console.error('Error in addVenue:', error);
    res.status(500).json({ error: 'Failed to add venue' });
  }
};


exports.getVenueDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await prisma.venue.findUnique({ where: { venue_id: parseInt(id) } });
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json(venue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get venue details' });
  }
};

exports.bookVenue = async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;
  try {
    const booking = await prisma.booking.create({
      data: {
        venue_id: parseInt(id),
        date,
        time,
      },
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to book venue' });
  }
};

exports.listVenueReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await prisma.review.findMany({ where: { venue_id: parseInt(id) } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list reviews' });
  }
};

exports.addVenueReview = async (req, res) => {
  const { id } = req.params;
  const { rating, reviewText } = req.body;
  try {
    const review = await prisma.review.create({
      data: {
        venue_id: parseInt(id),
        rating,
        reviewText,
      },
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
};

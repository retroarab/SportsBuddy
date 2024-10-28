// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(csurf({ cookie: true }));

// Set CSRF token in a cookie
app.use((req, res, next) => {
  res.cookie("mytoken", req.csrfToken());
  next();
});

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const matchRoutes = require('./src/routes/matchRoutes');
const venueRoutes = require('./src/routes/venueRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

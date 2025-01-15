// app.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Enable CSRF protection
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

// CSRF Token route
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Import other routes
const userRoutes = require('./src/routes/userRoutes');
const venueRoutes = require('./src/routes/venueRoutes');

app.use('/api/users', userRoutes);
app.use('/api/venues',venueRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

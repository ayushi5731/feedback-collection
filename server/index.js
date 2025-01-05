const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

// Import keys.js file for secrets (e.g., cookieKey)
const keys = require('./config/keys'); // Make sure this file exists and exports `cookieKey`

// Import models and services
require('./models/Users');
require('./services/passport');

// Middleware to use cookies for authentication
app.use(
    cookieSession({
        // Cookie expires after 30 days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // Key for encrypting cookie
        keys: [keys.cookieKey],
    })
);

// Passport middleware for handling authentication
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/EmailyDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Monitor Mongoose connection status
const db = mongoose.connection;

// Log connection events
db.on('connected', () => {
    console.log('Connected to EmailyDB successfully!');
});

db.on('error', (err) => {
    console.error(`Error connecting to EmailyDB: ${err}`);
});

db.on('disconnected', () => {
    console.log('Disconnected from EmailyDB.');
});

db.on('reconnected', () => {
    console.log('Reconnected to EmailyDB.');
});

// Import routes
require('./routes/authRoutes')(app);

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

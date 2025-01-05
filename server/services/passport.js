const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require("mongoose");

// Requiring the User model
const Users = mongoose.model("users");

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user.id); // Use the MongoDB `_id` as the serialized user ID
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
    Users.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            console.error("Error deserializing user:", err);
            done(err, null);
        });
});

// Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'http://localhost:5000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Check if user already exists in the database
    Users.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if (existingUser) {
                // User already exists, pass the user to Passport
                return done(null, existingUser);
            } else {
                // Save the new user to the database
                new Users({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user)); // Return the new user to Passport
            }
        })
        .catch(err => {
            console.error("Error during Google strategy:", err);
            done(err, null);
        });
}));

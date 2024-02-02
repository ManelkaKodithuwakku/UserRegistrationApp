const mongoose = require('mongoose');

/**
 * Function to connect to MongoDB using Mongoose.
 */
module.exports = () => {
    try {
        // Attempt to connect to the MongoDB using the provided URI.
        mongoose.connect(process.env.DB_URI);

        // Log a success message when the connection is established.
        console.log("Connected to the database successfully");
    } catch (err) {
        // Log any errors that occur during the connection attempt.
        console.log(err);
        
        // Log a failure message when the connection cannot be established.
        console.log("Could not connect to the database");
    }
}

require('dotenv').config()
const mongoose = require('mongoose');
const saveDays = require('./seeders/daysSeeder');
const saveMonth = require('./seeders/monthSeeder');
const defaultUser = require('./seeders/defaultUser');

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to the database.');

        // Run the seeder function
        await saveDays();
        await saveMonth();
        await defaultUser();
        // Close the database connection
        mongoose.disconnect();
        process.exit(0);
    })
    .catch(error => {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    });

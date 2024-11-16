const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust path as necessary

// Seeder function to save the admin user
async function saveAdminUser() {
  try {
    const adminEmail = 'admin@gmail.com';
    const defaultPassword = '987654321';

    // Check if the admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      // Create and save the admin user
      const adminUser = new User({
        fullname: 'Admin',
        email: adminEmail,
        phone: '12345678911', // Use a valid, unique phone number
        role: 'admin',
        password: hashedPassword,
      });

      await adminUser.save();
      console.log('Admin user saved successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    console.error('Error saving admin user:', error);
  }
}

module.exports = saveAdminUser;

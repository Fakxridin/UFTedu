const Day = require('../models/Day');

// Seeder function to save the days
async function saveDays() {
  try {
    // Define the days and their order
    const days = [
      { name: 'Dushanba', index: 1 },
      { name: 'Seshanba', index: 2 },
      { name: 'Chorshanba', index: 3 },
      { name: 'Payshanba', index: 4 },
      { name: 'Juma', index: 5 },
      { name: 'Shanba', index: 6 },
    ];

    // Create and save each day
    for (let day of days) {
      const existingDay = await Day.findOne({ name: day.name });
      if (!existingDay) {
        const newDay = new Day(day);
        await newDay.save();
        console.log(`${day.name} saved successfully.`);
      }
    }
  } catch (error) {
    console.error('Error saving days:', error);
  }
}

module.exports = saveDays;

const Month = require('../models/Month');

const months = [
  { name: 'Yanvar', index: 1 },
  { name: 'Fevral', index: 2 },
  { name: 'Mart', index: 3 },
  { name: 'Aprel', index: 4 },
  { name: 'May', index: 5 },
  { name: 'Iyun', index: 6 },
  { name: 'Iyul', index: 7 },
  { name: 'Avgust', index: 8 },
  { name: 'Sentabr', index: 9 },
  { name: 'Oktabr', index: 10 },
  { name: 'Noyabr', index: 11 },
  { name: 'Dekabr', index: 12 },
];

async function seedMonths() {
  try {
    for (const month of months) {
      const existingMonth = await Month.findOne({ name: month.name });
      if (!existingMonth) {
        const newMonth = new Month(month);
        await newMonth.save();
      }
    }
    console.log('Months seeded successfully');
  } catch (error) {
    console.error('Error seeding months:', error);
  } 
}

module.exports = seedMonths;

const router = require('express').Router();

const userRoutes = require('./UserRoutes');         // Import user routes
const lessonRoutes = require('./LessonRoutes');     // Import lesson routes
const dayRoutes = require('./dayRoutes');           // Import day routes
const fineRoutes = require('./fineRoutes');         // Import fine routes
const fineRegisterRoutes = require('./fineRegRoutes'); // Import fine register routes
const groupRoutes = require('./groupRoutes');       // Import group routes
const attendanceRoutes = require('./attendanceRoutes'); // Import attendance routes
const monthRoutes = require('./monthRoutes'); // Import month routes
const lessonPaymentRoutes = require('./lessonPayRoutes'); // Import lesson payment routes
const paymentRegisterRoutes = require('./paymentregRoutes'); // Import payment register routes
const scheduleRoutes = require('./scheduleRoutes');

router.use('/users', userRoutes);                    // User routes
router.use('/lessons', lessonRoutes);                 // Lesson routes
router.use('/days', dayRoutes);                       // Days routes
router.use('/fines', fineRoutes);                     // Fines routes
router.use('/fine-registers', fineRegisterRoutes);    // Fine register routes
router.use('/groups', groupRoutes);                   // Group routes
router.use('/attendance', attendanceRoutes);          // Attendance routes
router.use('/months', monthRoutes);                             // Month routes
router.use('/payments', lessonPaymentRoutes);
router.use('/payment-registers', paymentRegisterRoutes); // Payment register routes       // Lesson payment routes
router.use('/schedules', scheduleRoutes);
module.exports = router
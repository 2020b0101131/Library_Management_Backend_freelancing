const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const questionRoutes = require('./routes/questionRoutes');  // Import question routes
const statusRoutes = require('./routes/statusRoutes');      // Import status routes
const subjectRoutes = require('./routes/subjectRoutes');    // Import subject routes
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Middleware (e.g., authentication)
const auth = require('./middleware/authMiddleware');

// Routes
app.use('/api/users', userRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/questions', questionRoutes);   // Add route for questions
app.use('/api/statuses', statusRoutes);      // Add route for statuses
app.use('/api/subjects', subjectRoutes);     // Add route for subjects

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
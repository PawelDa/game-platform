const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Initialize Middleware
app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('API running')
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/tables', require('./routes/api/tables'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

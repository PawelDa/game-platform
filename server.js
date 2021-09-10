const express = require('express');
const connectDb = require('./config/db');

const app = express();

connectDb();

app.get('/', (req, res) => {
    res.send('API running')
});

// Define Routes
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

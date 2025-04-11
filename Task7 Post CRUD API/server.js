const express = require('express');
const connectDB = require('./config/db');
const postRoutes = require('./routes/posts');

const app = express();

app.use(express.json());

connectDB();

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

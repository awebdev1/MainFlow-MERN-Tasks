const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/loginApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

const createTestUser = async () => {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({
      email: 'test@example.com',
      password: hashedPassword,
    });
    await user.save();
    console.log('Test user created:', user);
  } catch (err) {
    console.error('Error creating test user:', err);
  } finally {
    mongoose.connection.close();
  }
};

createTestUser();
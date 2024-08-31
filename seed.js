const mongoose = require('mongoose');
const User = require('./src/models/User');
// Adjust the path if User.js is located elsewhere

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/elitegamerboost', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Seed data
const users = [
    {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
    },
    {
        username: 'jane_doe',
        email: 'jane@example.com',
        password: 'password123',
    },
    {
        username: 'alice_smith',
        email: 'alice@example.com',
        password: 'password123',
    },
    {
        username: 'bob_jones',
        email: 'bob@example.com',
        password: 'password123',
    },
];

// Function to seed the database
const seedUsers = async () => {
    try {
        // Clear the users collection before seeding
        await User.deleteMany({});
        console.log('Users collection cleared');

        // Add the sample users
        for (let i = 0; i < users.length; i++) {
            const user = new User(users[i]);
            await user.save();
            console.log(`User ${user.username} saved`);
        }

        console.log('Database seeded with users');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding users:', err);
        mongoose.connection.close();
    }
};

// Run the seeding function
seedUsers();

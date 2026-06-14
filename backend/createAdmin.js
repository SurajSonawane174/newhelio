require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const setupAdmin = async () => {
    try {
        // 1. Connect to the database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB Atlas');

        const username = 'HelioCoder174'; // Your admin username

        // 2. Check if the admin already exists so we don't duplicate it
        const existingAdmin = await Admin.findOne({ username: username });
        if (existingAdmin) {
            console.log('⚠️ Admin account already exists in the database.');
            process.exit(0);
        }

        // 3. Register the new admin
        // The .register method automatically hashes the password and saves the user
        const newAdmin = new Admin({ username: username });
        await Admin.register(newAdmin, 'Silver@9527'); // <-- CHANGE THIS PASSWORD
        
        console.log(`🎉 Admin account '${username}' created successfully!`);

    } catch (error) {
        console.error('❌ Error creating admin:', error);
    } finally {
        // 4. Close the connection so the script finishes and exits the terminal
        mongoose.connection.close();
    }
};

setupAdmin();
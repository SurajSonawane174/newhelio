const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    headline: { type: String, required: true },
    bio: { type: String },
    email: { type: String, required: true },
    socialLinks: {
        github: { type: String },
        linkedin: { type: String },
        twitter: { type: String }
    },
    resumeUrl: { type: String },
    
    // New Fields Added
    numberOfProjects: { type: Number, default: 0 },
    yearsOfExperience: { type: Number, default: 0 }
    
}, { timestamps: true });

module.exports = mongoose.model('Personal', personalSchema);
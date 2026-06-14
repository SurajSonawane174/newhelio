const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }], // Array of strings, e.g., ['React', 'Node.js', 'MongoDB']
    githubLink: { type: String },
    liveLink: { type: String },
    // Store the public URLs from your Supabase buckets here
    attachmentUrls: [{ type: String }], 
    isFeatured: { type: Boolean, default: false } // Handy for highlighting top projects
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
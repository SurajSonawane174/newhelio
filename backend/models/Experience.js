const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    companyLogo: { type: String }, // NEW: Optional image URL
    startDate: { type: Date, required: true },
    endDate: { type: Date }, 
    isCurrent: { type: Boolean, default: false },
    description: [{ type: String }], 
    technologiesUsed: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);    
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    direction: { type: String, enum: ['inbound', 'outbound'], required: true },
    from: { type: String, required: true }, // e.g. whatsapp:+14155238886
    to: { type: String, required: true },   // e.g. whatsapp:+919876543210
    body: { type: String, required: true },
    status: { type: String },
    sid: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
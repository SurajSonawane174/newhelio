const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new mongoose.Schema({}); 

// We append .default here to bypass the wrapper object
adminSchema.plugin(passportLocalMongoose.default);

module.exports = mongoose.model('Admin', adminSchema);
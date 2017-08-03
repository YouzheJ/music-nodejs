import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/music');
exports.mongoose = mongoose;
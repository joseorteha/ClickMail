const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  targetAudience: {
    type: String,
    required: true,
    trim: true
  },
  generatedEmail: {
    type: String,
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);

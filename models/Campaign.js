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
  },
  status: {
    type: String,
    enum: ['borrador', 'enviada', 'programada', 'completada'],
    default: 'borrador'
  },
  sentAt: {
    type: Date,
    default: null
  },
  scheduledFor: {
    type: Date,
    default: null
  },
  stats: {
    totalSent: { type: Number, default: 0 },
    successful: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
    opens: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    bounces: { type: Number, default: 0 },
    openRate: { type: String, default: '0%' },
    clickRate: { type: String, default: '0%' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);

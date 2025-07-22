import mongoose from 'mongoose';

const claimHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  pointsAwarded: {
    type: Number,
    required: true
  },
  claimedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ClaimHistory', claimHistorySchema);
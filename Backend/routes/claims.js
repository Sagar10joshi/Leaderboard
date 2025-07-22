import express from 'express';
import User from '../models/User.js';
import ClaimHistory from '../models/ClaimHistory.js';

const router = express.Router();

// Claim points for a user
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Generate random points (1-10)
    const pointsAwarded = Math.floor(Math.random() * 10) + 1;
    
    // Update user points
    user.points += pointsAwarded;
    await user.save();
    
    // Create claim history
    const claimHistory = new ClaimHistory({
      userId: user._id,
      userName: user.name,
      pointsAwarded
    });
    await claimHistory.save();
    
    res.json({
      user,
      pointsAwarded,
      totalPoints: user.points
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get claim history
router.get('/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .sort({ claimedAt: -1 })
      .limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
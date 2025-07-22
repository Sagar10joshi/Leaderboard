// import express from 'express';
// import User from '../models/User.js';

// const router = express.Router();

// // Get all users with rankings
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find().sort({ points: -1 });
    
//     // Add rank to each user
//     const usersWithRank = users.map((user, index) => ({
//       ...user.toObject(),
//       rank: index + 1
//     }));
    
//     res.json(usersWithRank);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Add new user
// router.post('/', async (req, res) => {
//   try {
//     const { name } = req.body;
    
//     if (!name) {
//       return res.status(400).json({ error: 'Name is required' });
//     }
    
//     // Check if user already exists
//     const existingUser = await User.findOne({ name: name.trim() });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists' });
//     }
    
//     const newUser = new User({ name: name.trim() });
//     await newUser.save();
    
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get user by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;
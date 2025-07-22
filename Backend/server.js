import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import userRoutes from './routes/users.js';
// import claimRoutes from './routes/claims.js';
import User from './models/User.js';
import ClaimHistory from './models/ClaimHistory.js';
import dbConnect from './models/dbConnect.js'

// dotenv.config();
dotenv.config({
    path : "./.env"
})

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

// CORS middleware configuration
const corsOptions = {
    origin: 'https://leaderboard-jbk4.vercel.app/',  // Allow only your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true  // Allow cookies or credentials if needed
  };
  
  app.use(cors(corsOptions));
  
// app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// app.use(cors());
// app.use(express.json());

// app.get('/',(req,res)=>{
//     res.json("Welcome to Server")
// })

app.get('/claims/history',(req,res)=>{
    res.json("Welcome to Server")
})



const initializeUsers = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const defaultUsers = [
        { name: 'Rahul', points: 1134590 },
        { name: 'Pritesh', points: 1614546 },
        { name: 'Krishu Rajput', points: 942034 },
        { name: 'Kamal', points: 558378 },
        { name: 'Sanak', points: 503042 },
        { name: 'David', points: 352250 },
        { name: 'Gobind', points: 346392 },
        { name: 'Rajput', points: 343892 },
        { name: 'Ishul', points: 321932 },
        { name: 'Devil', points: 0 }
      ];

      await User.insertMany(defaultUsers);
      console.log('Default users created');
    }
  } catch (error) {
    console.error('Error initializing users:', error);
  }
};
 dbConnect()
// // Routes
// app.use('/users', userRoutes);
// app.use('/claims', claimRoutes);






// Get all users with rankings
app.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    
    // Add rank to each user
    const usersWithRank = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1
    }));
    
    res.json(usersWithRank);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new user
app.post('/users', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const existingUser = await User.findOne({ name: name.trim() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ name: name.trim() });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
app.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Claim points for a user
app.post('/', async (req, res) => {
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
app.get('/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .sort({ claimedAt: -1 })
      .limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});










app.post('/',(req,res)=>{
  res.send("hello")
})

export default app;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
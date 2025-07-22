import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import claimRoutes from './routes/claims.js';
import User from './models/User.js';
import dbConnect from './models/dbConnect.js'

// dotenv.config();
dotenv.config({
    path : "./.env"
})

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

const corsOptions = {
    origin: '*', // Allow all origins
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
  };
  
  app.use(cors(corsOptions));
  
// app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// app.use(cors());
// app.use(express.json());

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
// Routes
app.use('/api/users', userRoutes);
app.use('/api/claims', claimRoutes);

app.post('/',(req,res)=>{
  res.send("hello")
})

export default app;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
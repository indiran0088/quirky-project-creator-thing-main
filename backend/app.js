// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Something broke!' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });



const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { testConnection } = require('./config/db');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const invitationRoutes = require('./routes/invitationRoutes');

// Initialize Express
const app = express();

// ======================
// 1. Configuration Check
// ======================
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

// ======================
// 2. Middleware
// ======================
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL?.split(',') || 'http://localhost:8080',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// ======================
// 3. Database Connection
// ======================
let dbReady = false;

const initializeDatabase = async () => {
    try {
      const { testConnection, syncModels } = require('./config/db');
      
      if (!await testConnection()) {
        throw new Error('Database connection failed');
      }
  
      // Sync models
      if (process.env.NODE_ENV !== 'production') {
        await syncModels();
      }
      
      return true;
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      return false;
    }
  };

// ======================
// 4. Routes
// ======================
app.use('/api/auth', authRoutes);
app.use('/api/invitations', invitationRoutes);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const dbStatus = dbReady ? 'connected' : 'disconnected';
  res.status(dbReady ? 200 : 503).json({ 
    status: dbReady ? 'healthy' : 'unhealthy',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// ======================
// 5. Error Handling
// ======================
app.use((req, res, next) => {
  if (!dbReady) {
    return res.status(503).json({
      status: 'error',
      message: 'Service unavailable - Database not connected'
    });
  }
  next();
});

app.use((err, req, res, next) => {
  console.error('⚠️ Error:', err.stack);
  
  const response = {
    status: 'error',
    message: process.env.NODE_ENV === 'development' ? 
      err.message : 'Something went wrong'
  };

  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      ...response,
      message: 'Validation Error',
      errors: err.errors 
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ 
      ...response,
      message: 'Invalid token' 
    });
  }

  res.status(500).json(response);
});

app.use('*', (req, res) => {
  res.status(404).json({ 
    status: 'error',
    message: 'Endpoint not found' 
  });
});

// ======================
// 6. Server Startup
// ======================
const PORT = process.env.PORT || 5000;

initializeDatabase().then(async (success) => {
    if (success) {
      // Sync models after successful connection
      await require('./config/db').syncModels();
      
      app.listen(PORT, () => {
        console.log(`🚀 Server running...`);
      });
    }
  });
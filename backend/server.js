const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Database connection
const connectDB = require('./config/database');

// Route files
const todos = require('./routes/todos');

// Middleware
const errorHandler = require('./middleware/errorHandler');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware - Allow Vite dev server
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging Middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ✅ FIX: Mount routers BEFORE basic routes
app.use('/api/todos', todos);

// ✅ FIX: Health check route - harus sebelum catch-all route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// ✅ FIX: Root route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: '🚀 MERN Stack Todo API is running!',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      todos: {
        'GET /api/todos': 'Get all todos',
        'POST /api/todos': 'Create new todo',
        'GET /api/todos/:id': 'Get single todo',
        'PUT /api/todos/:id': 'Update todo',
        'PATCH /api/todos/:id/toggle': 'Toggle todo status',
        'DELETE /api/todos/:id': 'Delete todo',
        'GET /api/todos/stats/overview': 'Get statistics'
      }
    }
  });
});

// ✅ FIX: Root path
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to MERN Todo API!',
    documentation: 'Visit /api for available endpoints'
  });
});

// Error handler middleware (harus diakhir, setelah routes)
app.use(errorHandler);

// ✅ FIX: 404 handler - harus di paling akhir
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    available_endpoints: [
      'GET /api',
      'GET /api/health',
      'GET /api/todos',
      'POST /api/todos',
      'GET /api/todos/:id',
      'PUT /api/todos/:id',
      'PATCH /api/todos/:id/toggle',
      'DELETE /api/todos/:id',
      'GET /api/todos/stats/overview'
    ]
  });
});

const server = app.listen(PORT, () => {
  console.log(`\n🎯 Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🔗 Base URL: http://localhost:${PORT}`);
  console.log(`🌐 CORS Enabled for: Vite (5173) & React (3000)`);
  console.log(`🚀 Ready to accept requests!\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
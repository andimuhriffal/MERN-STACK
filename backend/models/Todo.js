const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Todo text is required'],
    trim: true,
    minlength: [1, 'Todo text must be at least 1 character long'],
    maxlength: [500, 'Todo text cannot exceed 500 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    default: null
  },
  category: {
    type: String,
    default: 'general',
    trim: true
  }
}, {
  timestamps: true // createdAt dan updatedAt otomatis
});

// Index untuk pencarian yang lebih cepat
todoSchema.index({ completed: 1, createdAt: -1 });
todoSchema.index({ category: 1 });

// Method untuk toggle status complete
todoSchema.methods.toggleComplete = function() {
  this.completed = !this.completed;
  return this.save();
};

// Static method untuk mendapatkan todos yang belum selesai
todoSchema.statics.getPendingTodos = function() {
  return this.find({ completed: false }).sort({ createdAt: -1 });
};

// Static method untuk mendapatkan todos berdasarkan kategori
todoSchema.statics.getTodosByCategory = function(category) {
  return this.find({ category: new RegExp(category, 'i') }).sort({ createdAt: -1 });
};

module.exports = mongoose.model('Todo', todoSchema);
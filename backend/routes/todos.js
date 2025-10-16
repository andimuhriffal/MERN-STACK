const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// @desc    Get all todos dengan filter dan sort
// @route   GET /api/todos
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      completed, 
      category, 
      priority, 
      sortBy = 'createdAt', 
      order = 'desc',
      search 
    } = req.query;

    // Build filter object
    let filter = {};
    
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    
    if (category) {
      filter.category = new RegExp(category, 'i');
    }
    
    if (priority) {
      filter.priority = priority;
    }
    
    if (search) {
      filter.text = { $regex: search, $options: 'i' };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = order === 'desc' ? -1 : 1;

    const todos = await Todo.find(filter).sort(sort);
    
    res.json({
      success: true,
      count: todos.length,
      data: todos
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching todos',
      error: error.message
    });
  }
});

// @desc    Get single todo by ID
// @route   GET /api/todos/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: todo
    });

  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Create new todo
// @route   POST /api/todos
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { text, priority, dueDate, category } = req.body;

    // Validation
    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Todo text is required'
      });
    }

    const todoData = {
      text: text.trim(),
      priority: priority || 'medium',
      category: category || 'general'
    };

    if (dueDate) {
      todoData.dueDate = new Date(dueDate);
    }

    const todo = new Todo(todoData);
    const savedTodo = await todo.save();

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: savedTodo
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating todo',
      error: error.message
    });
  }
});

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { text, completed, priority, dueDate, category } = req.body;

    const updateData = {};
    if (text !== undefined) updateData.text = text.trim();
    if (completed !== undefined) updateData.completed = completed;
    if (priority !== undefined) updateData.priority = priority;
    if (category !== undefined) updateData.category = category;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, // Return updated document
        runValidators: true 
      }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: todo
    });

  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Error updating todo',
      error: error.message
    });
  }
});

// @desc    Toggle todo complete status
// @route   PATCH /api/todos/:id/toggle
// @access  Public
router.patch('/:id/toggle', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    const updatedTodo = await todo.toggleComplete();

    res.json({
      success: true,
      message: `Todo marked as ${updatedTodo.completed ? 'completed' : 'incomplete'}`,
      data: updatedTodo
    });

  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Error toggling todo',
      error: error.message
    });
  }
});

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    await Todo.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });

  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error.message
    });
  }
});

// @desc    Get todos statistics
// @route   GET /api/todos/stats/overview
// @access  Public
router.get('/stats/overview', async (req, res) => {
  try {
    const totalTodos = await Todo.countDocuments();
    const completedTodos = await Todo.countDocuments({ completed: true });
    const pendingTodos = await Todo.countDocuments({ completed: false });
    
    const priorityStats = await Todo.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const categoryStats = await Todo.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        total: totalTodos,
        completed: completedTodos,
        pending: pendingTodos,
        completionRate: totalTodos > 0 ? (completedTodos / totalTodos * 100).toFixed(1) : 0,
        byPriority: priorityStats,
        byCategory: categoryStats
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

module.exports = router;
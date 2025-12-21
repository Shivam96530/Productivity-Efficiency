import express from 'express';
import Task from '../models/Task.js';
import ProductivityRecord from '../models/ProductivityRecord.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/productivity/daily
// @desc    Get daily productivity
// @access  Private
router.get('/daily', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tasks = await Task.find({
      userId: req.user.id,
      createdAt: { $gte: today, $lt: tomorrow }
    });

    const totalPlannedTime = tasks.reduce((sum, task) => sum + task.plannedTime, 0);
    const totalActualTime = tasks.reduce((sum, task) => sum + task.actualTime, 0);
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const totalTasks = tasks.length;

    let efficiency = 0;
    if (totalPlannedTime > 0) {
      const completedActualTime = tasks
        .filter(task => task.status === 'completed')
        .reduce((sum, task) => sum + task.actualTime, 0);
      efficiency = (completedActualTime / totalPlannedTime) * 100;
    }

    res.json({
      success: true,
      data: {
        date: today,
        totalPlannedTime,
        totalActualTime,
        completedTasks,
        totalTasks,
        efficiency: Math.round(efficiency * 100) / 100
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching daily productivity'
    });
  }
});

// @route   GET /api/productivity/weekly
// @desc    Get weekly productivity
// @access  Private
router.get('/weekly', async (req, res) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const tasks = await Task.find({
      userId: req.user.id,
      createdAt: { $gte: startOfWeek, $lt: endOfWeek }
    });

    const totalPlannedTime = tasks.reduce((sum, task) => sum + task.plannedTime, 0);
    const totalActualTime = tasks.reduce((sum, task) => sum + task.actualTime, 0);
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const totalTasks = tasks.length;

    let efficiency = 0;
    if (totalPlannedTime > 0) {
      const completedActualTime = tasks
        .filter(task => task.status === 'completed')
        .reduce((sum, task) => sum + task.actualTime, 0);
      efficiency = (completedActualTime / totalPlannedTime) * 100;
    }

    res.json({
      success: true,
      data: {
        startDate: startOfWeek,
        endDate: endOfWeek,
        totalPlannedTime,
        totalActualTime,
        completedTasks,
        totalTasks,
        efficiency: Math.round(efficiency * 100) / 100
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching weekly productivity'
    });
  }
});

// @route   GET /api/productivity/overall
// @desc    Get overall productivity
// @access  Private
router.get('/overall', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    const totalPlannedTime = tasks.reduce((sum, task) => sum + task.plannedTime, 0);
    const totalActualTime = tasks.reduce((sum, task) => sum + task.actualTime, 0);
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const totalTasks = tasks.length;

    let efficiency = 0;
    if (totalPlannedTime > 0) {
      const completedActualTime = tasks
        .filter(task => task.status === 'completed')
        .reduce((sum, task) => sum + task.actualTime, 0);
      efficiency = (completedActualTime / totalPlannedTime) * 100;
    }

    res.json({
      success: true,
      data: {
        totalPlannedTime,
        totalActualTime,
        completedTasks,
        totalTasks,
        efficiency: Math.round(efficiency * 100) / 100
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching overall productivity'
    });
  }
});

// @route   GET /api/productivity/stats
// @desc    Get comprehensive stats
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    const stats = {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
      pendingTasks: tasks.filter(t => t.status === 'pending').length,
      totalPlannedTime: tasks.reduce((sum, task) => sum + task.plannedTime, 0),
      totalActualTime: tasks.reduce((sum, task) => sum + task.actualTime, 0),
      highPriorityTasks: tasks.filter(t => t.priority === 'high').length,
      mediumPriorityTasks: tasks.filter(t => t.priority === 'medium').length,
      lowPriorityTasks: tasks.filter(t => t.priority === 'low').length
    };

    let efficiency = 0;
    if (stats.totalPlannedTime > 0) {
      const completedActualTime = tasks
        .filter(task => task.status === 'completed')
        .reduce((sum, task) => sum + task.actualTime, 0);
      efficiency = (completedActualTime / stats.totalPlannedTime) * 100;
    }

    stats.efficiency = Math.round(efficiency * 100) / 100;

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching stats'
    });
  }
});

export default router;


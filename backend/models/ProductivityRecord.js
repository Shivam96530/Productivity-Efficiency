import mongoose from 'mongoose';

const productivityRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  totalPlannedTime: {
    type: Number, // in minutes
    default: 0
  },
  totalActualTime: {
    type: Number, // in minutes
    default: 0
  },
  completedTasks: {
    type: Number,
    default: 0
  },
  totalTasks: {
    type: Number,
    default: 0
  },
  efficiency: {
    type: Number, // percentage
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
productivityRecordSchema.index({ userId: 1, date: -1 });

export default mongoose.model('ProductivityRecord', productivityRecordSchema);


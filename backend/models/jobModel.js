import { Schema, model } from 'mongoose';

const jobSchema = new Schema({
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  skills: {
    type: [String],
    default: [],
  },
  budget: {
    type: Number, 
    required: false,
  },
  location: String,
  tags: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('Job', jobSchema);

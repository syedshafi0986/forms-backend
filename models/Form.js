import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'multiple_choice', 'checkbox', 'rating'],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [OptionSchema],
    default: [],
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const FormSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },

    questions: {
      type: [QuestionSchema], // ✅ SCHEMA, NOT MODEL
      default: [],
    },

    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Form', FormSchema);

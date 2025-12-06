import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { _id: true }
);

const QuestionSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
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
  },
  { timestamps: true }
);
const Question = mongoose.model('Question', QuestionSchema);

export default Question;
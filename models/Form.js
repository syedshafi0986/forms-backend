import mongoose from 'mongoose';
import Question from './Question.js';

const FormSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
      questions: { type: [Question], default: [] },

    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Form = mongoose.model('Form', FormSchema);
export default Form;

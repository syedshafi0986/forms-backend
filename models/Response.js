// models/Response.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const answerSchema = new Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    // Can be string (text), array (checkbox), number (rating), etc.
    answer: {
      type: Schema.Types.Mixed,
      required: true
    }
  },
  { _id: false }
);

const responseSchema = new Schema(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: 'Form',
      required: true
    },
    // null if anonymous
    responderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    answers: {
      type: [answerSchema],
      required: true
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: false }
);

const Response = model('Response', responseSchema);

export default Response;

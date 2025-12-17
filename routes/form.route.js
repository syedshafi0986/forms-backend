import express from 'express';
import {
  createForm,
  getFormById,
  getFormsByUser,
  updateForm,
  deleteForm,
  addQuestion,
  updateQuestion,
  deleteQuestion
} from '../controllers/form.controller.js';

import { auth } from '../middleware/auth.js';

const router = express.Router();

/* ---------------- FORM ---------------- */

// Create form
router.post('/', auth, createForm);

// Get form (public – for filling)
router.get('/:formId', getFormById);

// Get all forms created by a user
router.get('/user/:userId', auth, getFormsByUser);

// Update form
router.put('/:formId', auth, updateForm);

// Delete form
router.delete('/:formId', auth, deleteForm);

/* ---------------- QUESTIONS (embedded) ---------------- */

// Add question
router.post('/:formId/questions', auth, addQuestion);

// Update question
router.put('/:formId/questions/:questionId', auth, updateQuestion);

// Delete question
router.delete('/:formId/questions/:questionId', auth, deleteQuestion);

export default router;

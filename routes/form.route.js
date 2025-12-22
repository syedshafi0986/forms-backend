import express from 'express';
import { createForms,
    updateForm,
    deleteForm,
    getForm,
    getUserForm } from '../controllers/FormController.js';
import { createQuestion,
    updateQuestion,
    DeleteQuestion } from '../controllers/QuestionsController.js';

import { auth } from '../middleware/auth.js';

const router = express.Router();

/* ---------------- FORM ---------------- */

// Create form
router.post('/', auth, createForms);

// Get form (public – for filling)
router.get('/:formId', getForm);

// Get all forms created by a user
router.get('/user/:userId', auth, getUserForm);

// Update form
router.put('/:formId', auth,updateForm);

// Delete form
router.delete('/:formId', auth, deleteForm);

/* ---------------- QUESTIONS (embedded) ---------------- */

// Add question
router.post('/:formId/questions', auth, createQuestion);

// Update question
router.put('/:formId/questions/:questionId', auth, updateQuestion);

// Delete question
router.delete('/:formId/questions/:questionId', auth, DeleteQuestion);

export default router;

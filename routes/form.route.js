import express from 'express';
import { createForms,
    updateForm,
    deleteForm,
    getForm,
    getUserForm } from '../controllers/FormController.js';
import { createQuestion,
    updateQuestion,
    DeleteQuestion } from '../controllers/QuestionsController.js';

import { requireAuth } from '../middleware/requireAuth.js';
const router = express.Router();

/* ---------------- FORM ---------------- */

// Create form
router.post('/', requireAuth, createForms);

// Get form (public – for filling)
router.get('/:formId', getForm);

// Get all forms created by a user
router.get('/user/:userId', requireAuth, getUserForm);

// Update form
router.put('/:formId', requireAuth,updateForm);

// Delete form
router.delete('/:formId', requireAuth, deleteForm);

/* ---------------- QUESTIONS (embedded) ---------------- */

// Add question
router.post('/:formId/questions', requireAuth, createQuestion);

// Update question
router.put('/:formId/questions/:questionId', requireAuth, updateQuestion);

// Delete question
router.delete('/:formId/questions/:questionId', requireAuth, DeleteQuestion);

export {router};

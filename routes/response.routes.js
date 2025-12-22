import express from 'express';
import { submitResponse,
  getResponse } from '../controllers/ResponseController.js';

import { router as authroute } from './authRoutes.js';

const router = express.Router();

/* ---------------- RESPONSES ---------------- */

// Submit response
// - Works for anonymous users
// - responderId set only if logged in
router.post('/forms/:formId/responses', submitResponse);

// Get all responses of a form (creator only)
router.get('/forms/:formId/responses', auth, getResponsesByForm);

// Get single response (creator only)
router.get('/responses/:responseId', auth, getSingleResponse);

export default router;

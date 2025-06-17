import express from 'express';
import { createUser } from '../controllers/user/create';
import { authUser } from '../controllers/user/auth';
import { insertLabReport } from '../controllers/user/insertLabReport';
import { insertAiReport } from '../controllers/user/insertAIReport';
import { deleteUser } from '../controllers/user/delete';
import { readUserById } from '../controllers/user/read';
import { asyncCatch } from '../utils/catchAsync';

const router = express.Router();

// Wrap all controller functions with asyncCatch
router.post('/register', asyncCatch(createUser));
router.post('/login', asyncCatch(authUser));
router.post('/lab', asyncCatch(insertLabReport));
router.post('/ai', asyncCatch(insertAiReport));
router.get('/:userId', asyncCatch(readUserById));
router.delete('/:userId', asyncCatch(deleteUser));

export default router;

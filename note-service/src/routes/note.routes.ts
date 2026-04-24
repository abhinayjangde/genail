import express from 'express';
import { create, getAll, remove } from '../controllers/note.controller.js';
import type { Router } from 'express';

const router: Router = express.Router();
router.post('/',        create);
router.get('/',         getAll);
router.delete('/:id',   remove);

export default router;
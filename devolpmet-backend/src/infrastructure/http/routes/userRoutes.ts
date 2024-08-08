import { Router } from 'express';
import { register } from '../../../interface/controllers/userControllers';

const router = Router();

router.post('/register', register);

export default router;

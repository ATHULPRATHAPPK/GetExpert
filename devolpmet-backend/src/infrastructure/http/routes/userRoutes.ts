import { Router } from 'express';
import { register,verifyOtp } from '../../../interface/controllers/userControllers';



const router = Router();

router.post('/register', register);
router.post('/otp-verify',verifyOtp)

export default router;


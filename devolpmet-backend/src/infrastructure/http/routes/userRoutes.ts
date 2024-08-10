import { Router } from 'express';
import { register,verifyOtp,userLogin } from '../../../interface/controllers/userControllers';



const router = Router();

router.post('/register', register);
router.post('/otp-verify',verifyOtp)
router.post('/login',userLogin)


export default router;


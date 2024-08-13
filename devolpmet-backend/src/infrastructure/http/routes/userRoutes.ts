import { Router } from 'express';
import { register,verifyOtp,userLogin,userProfile } from '../../../interface/controllers/userControllers';



const router = Router();

router.post('/register', register);
router.post('/otp-verify',verifyOtp)
router.post('/login',userLogin)
router.post('/profile',userProfile)


export default router;


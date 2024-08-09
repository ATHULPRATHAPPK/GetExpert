import { Request, Response } from "express";
import { registerUser,verifyUserOtp,} from "../../application/services/userService";

//==================================user registration===================//
export const register = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const user = await registerUser(req.body);
    console.log(user);

    res
      .status(201)
      .json(
        "User registration successful. Please verify the OTP sent to your email."
      );
  } catch (err) {
    console.log(err);
    const errorMessage = (err as Error).message;
    res.status(400).json({ error: errorMessage });
  }
};

//=========================================verify otp =================//
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const result = await verifyUserOtp(email, otp);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    const errorMessage = (err as Error).message;
    res.status(400).json({ error: errorMessage });
  }
};

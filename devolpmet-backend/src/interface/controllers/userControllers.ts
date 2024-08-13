import { Request, Response } from "express";
import { verifyToken } from "../../infrastructure/http/middlewares/authMiddleware";
import {
  registerUser,
  verifyUserOtp,
  loginUser
} from "../../application/services/userService";



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
  console.log("reached here");
  console.log(req.body);

  try {
    const result = await verifyUserOtp(email, otp);
    console.log("result", result);
      res.status(200).json(result);
  } catch (err) {
    console.log(err);
    const errorMessage = (err as Error).message;
    res.status(400).json({ error: errorMessage });
  }
};

//=========================================user login=================//
export const userLogin = async (req: Request, res: Response) => {
  console.log("Reached userLogin function.");
  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password,res);
    console.log("Login result:", result);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(401).json(result);
    }
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage = (error as Error).message;
    return res.status(500).json({ success: false, message: errorMessage });
  }
};

//=========================================user profile=================//
export const userProfile = async (req: Request, res: Response) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
      return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
      const result = verifyToken(accessToken, refreshToken);
      console.log(result, "result");

      if (result.success) {
          if (result.newAccessToken) {
              // Set the new access token in the cookie
              res.cookie('accessToken', result.newAccessToken, { httpOnly: true, secure: true });
              return res.status(200).json({ success: true, message: 'TOKEN UPDATED SUCCESS' });
          }
          return res.status(200).json({ success: true, message: 'Valid access token' });
      } else {
          return res.status(401).json({ success: false, message: 'Invalid token' });
      }
  } catch (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
  }
};
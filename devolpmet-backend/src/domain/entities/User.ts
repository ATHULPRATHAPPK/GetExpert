export interface LoginResult {
  success: boolean;
  message: string;
  tokenSet?: boolean;  
  userDetails?: {
      userName: string;
      email: string;
  };
  tokens?: {
      accessToken: string;
      refreshToken: string;
  };
}


export interface UpdateProfileResult {
  success: boolean;
  message: string;
  updatedUser?: any; 
}

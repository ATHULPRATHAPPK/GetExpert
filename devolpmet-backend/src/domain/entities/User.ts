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

export interface IUser {
  email: string;
  password: string;
  fullName?: string;
  avatar?: string;
}

export interface ILoginUser {
  email: IUser['email'];
  password: IUser['password'];
}

export interface ISignupUser extends ILoginUser {
  fullName?: IUser['fullName'];
  avatar?: Blob;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<IUser, 'password'>;
}

export interface ILogoutResponse {
  refreshToken: string;
}

export interface IUserGeneralData {
  fullName: string;
  avatar: string;
  joinedTime: Date;
  quizzesPassed: number;
  quizzesCreated: number;
  quizzesPublished: number;
  correctNumber: number;
  incorrectNumber: number;
  notAnswered: number;
  totalAnswers: number;
}

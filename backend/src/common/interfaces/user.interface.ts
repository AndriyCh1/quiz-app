export interface IGetUserGeneralDataResponse {
  fullName: string;
  avatar: string;
  quizzesPassed: number;
  quizzesCreated: number;
  quizzesPublished: number;
  joinedTime: Date;
  correctNumber: number;
  incorrectNumber: number;
  notAnswered: number;
  totalAnswers: number;
}

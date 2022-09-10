import { IQuiz } from '../../common/interfaces';

const quizList: IQuiz[] = [
  {
    id: 1,
    title: 'Math 101: Counting, Shapes',
    score: 10,
    type: 'single-choice',
    time: 600, // seconds
    content: 'Mathematics test lorem ipsum lorem ipsum, lorem ipsum',
    questions: [
      {
        id: 1,
        active: true,
        type: 'single-choice',
        content: 'What multiplication sentence matches 4+4+4+4+4 ?',
        score: 2,
        time: 30,
        answers: [
          {
            id: 1,
            active: true,
            content: '4 x 5 ',
            correct: true,
          },
          {
            id: 2,
            active: true,
            content: '4 x 4',
            correct: false,
          },
          {
            id: 3,
            active: true,
            content: '4 x 6',
            correct: false,
          },
          {
            id: 4,
            active: true,
            content: '20',
            correct: false,
          },
        ],
      },
      {
        id: 2,
        active: true,
        type: 'single-choice',
        content:
          'If Jake has 12 fish and then gets 5 times as many fish, how many fish does Jake have now?',
        score: 4,
        time: 30,
        answers: [
          {
            id: 1,
            active: true,
            content: '430',
            correct: false,
          },
          {
            id: 2,
            active: true,
            content: '95',
            correct: false,
          },
          {
            id: 3,
            active: true,
            content: '60',
            correct: true,
          },
          {
            id: 4,
            active: true,
            content: '50',
            correct: false,
          },
        ],
      },
    ],
  },
];

const createdQuizList: IQuiz[] = [
  {
    id: 1,
    title: 'Biology: created by myself',
    score: 10,
    type: 'single-choice',
    time: 600, // seconds
    content: 'Biology test lorem ipsum lorem ipsum, lorem ipsum',
    questions: [
      {
        id: 1,
        active: true,
        type: 'single-choice',
        content: 'What ghgh werertr dfdfd dfd ?',
        score: 2,
        time: 30,
        answers: [
          {
            id: 1,
            active: true,
            content: 'qwerty',
            correct: true,
          },
          {
            id: 2,
            active: true,
            content: 'tail',
            correct: false,
          },
        ],
      },
    ],
  },
];

const getAll = () => quizList;
const getAllCreated = () => createdQuizList;

// const quizzes = [...quizList, ...createdQuizList];
// const findBySlug = (slug: string) => quizzes.find((item) => item.slug === slug);

export default { getAll, getAllCreated };

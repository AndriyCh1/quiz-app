import React from 'react';
import { useNavigate } from 'react-router-dom';

import QuizItem from './quiz-item';
import { IQuiz } from '../common/interfaces';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { quizzesActions } from '../store/quizzes';

interface IProps {
  quizzes: IQuiz[];
}

const QuizList: React.FC<IProps> = ({ quizzes }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const handleDeleteQuiz = (id: IQuiz['id']) => {
    dispatch(quizzesActions.deleteById(id));
  };

  const checkIfQuizBelongsCurrentUser = (quiz: IQuiz): boolean => {
    if (quiz.user?.email === undefined || user?.email === undefined) {
      return false;
    }

    return quiz.user?.email === user?.email;
  };

  return (
    <div className="quiz-list">
      {quizzes.map((item, index) => (
        <div key={item.id} className="quiz-list__item">
          <QuizItem
            title={item.title}
            type={item.type}
            content={item.content}
            questionCount={item.questions.length}
            onClick={() => navigate(`/quiz/${item.id}`)}
            onStart={() => navigate(`/quiz/${item.id}/start`)}
            onDelete={
              checkIfQuizBelongsCurrentUser(item) ? () => handleDeleteQuiz(item.id) : undefined
            }
            onEdit={
              checkIfQuizBelongsCurrentUser(item)
                ? () => navigate(`/quiz/${item.id}/edit`)
                : undefined
            }
          />
        </div>
      ))}
    </div>
  );
};

export default QuizList;

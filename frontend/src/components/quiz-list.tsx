import React from 'react';
import { useNavigate } from 'react-router-dom';

import QuizItem from './quiz-item';
import { IQuiz } from '../common/interfaces';

interface IProps {
  quizzes: IQuiz[];
}

const QuizList: React.FC<IProps> = ({ quizzes }) => {
  const navigate = useNavigate();
  console.log(quizzes, 'QuizList');
  return (
    <div className="quiz-list">
      {quizzes.map((item, index) => (
        <div key={index} className="quiz-list__item">
          <QuizItem
            title={item.title}
            type={item.type}
            content={item.content}
            questionCount={item.questions?.length || 0} // TODO: find out why occurs here if to remove ? and || 0
            onClick={() => navigate(`/quiz/${item.id}`)}
            onButtonClick={() => navigate(`/quiz/${item.id}/start`)}
          />
        </div>
      ))}
    </div>
  );
};

export default QuizList;

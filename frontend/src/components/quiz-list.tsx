import React from 'react';
import { useNavigate } from 'react-router-dom';

import QuizItem from './quiz-item';

interface IProps {
  quizzes: any[];
}

const QuizList: React.FC<IProps> = ({ quizzes }) => {
  const navigate = useNavigate();

  return (
    <div className="quiz-list">
      {quizzes.map((item, index) => (
        <div key={index} className="quiz-list__item">
          <QuizItem
            title={item.title}
            type={item.quizType}
            content={item.content}
            questionCount={item.questions.length}
            onClick={() => navigate(`/quiz/${item.slug}`)}
            onButtonClick={() => navigate(`/quiz/${item.slug}/start`)}
          />
        </div>
      ))}
    </div>
  );
};

export default QuizList;

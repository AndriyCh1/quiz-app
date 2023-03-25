import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import QuizItem from './quiz-item';
import { IQuiz } from '../common/interfaces';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { quizzesActions } from '../store/quizzes';
import Modal from './modal';
import QuizDetails from '../pages/quiz-details';

interface IProps {
  quizzes: IQuiz[];
}

const QuizList: React.FC<IProps> = ({ quizzes }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showQuizDetailsModal, setShowQuizDetailsModal] = useState(false);
  const [quizIdForDetails, setQuizIdForDetails] = useState<string | null>(null);

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

  const handleGetQuizDetails = (id: IQuiz['id']) => {
    setQuizIdForDetails(id);
    setShowQuizDetailsModal(true);
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
            onClick={() => handleGetQuizDetails(item.id)}
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

      <Modal
        className="quiz-list__modal"
        onClose={() => setShowQuizDetailsModal(false)}
        show={showQuizDetailsModal}
        title=""
      >
        {quizIdForDetails ? <QuizDetails quizId={quizIdForDetails} /> : <div>No quiz chosen</div>}
      </Modal>
    </div>
  );
};

export default QuizList;

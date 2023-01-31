import React, { Fragment, useState } from 'react';
import ExpandDown from './expand-down';
import TakeSummary from './take-summary';
import { formatDate } from '../utils/format-date';
import Modal from './modal';
import TakeResultTable from './take-result-table';

interface IProps {
  quizId: string | number | null;
  quizTitle: string;
  quizTakes: {
    id: string;
    correctNumber: number;
    incorrectNumber: number;
    notAnswered: number;
    questionsNumber: number;
    score: number;
    totalScore: number;
    spentTime: number;
    takeDate: Date;
  }[];
}

const takeDataResponseMock = [
  {
    id: '3443',
    question: 'question 1',
    answer: 'incorrect answer 1',
    correctAnswer: 'correct answer 1',
    isCorrect: false,
    isAttempted: true,
  },
  {
    id: '7834',
    question: 'question 2',
    answer: 'correct answer 2',
    correctAnswer: 'correct answer 2',
    isCorrect: true,
    isAttempted: true,
  },
  {
    id: '8754',
    question: 'question 3',
    answer: null,
    correctAnswer: 'correct answer 3',
    isCorrect: null,
    isAttempted: false,
  },
];

const QuizSummary: React.FC<IProps> = (summary) => {
  const [showTakeDetailsModal, setShowTakeDetailsModal] = useState(false);

  const toggleTakeDetailsModal = () => setShowTakeDetailsModal((state) => !state);

  const getTakeDetails = (takeId: string) => console.log(takeId);

  return (
    <Fragment>
      <div className="profile-takes">
        <ExpandDown
          key={summary.quizId}
          className="profile-takes__take"
          topic={summary.quizTitle}
          extraInfo={`${summary.quizTakes.length} attempt(s)`}
        >
          <div className="profile-takes__summary">
            {summary.quizTakes.map((takeSummary, index) => (
              <Fragment key={takeSummary.id}>
                <TakeSummary
                  title={`Attempt ${index + 1} (${formatDate(new Date(takeSummary.takeDate))})`}
                  correct={takeSummary.correctNumber}
                  incorrect={takeSummary.incorrectNumber}
                  notAnswered={takeSummary.notAnswered}
                  totalQuestions={takeSummary.questionsNumber}
                  score={takeSummary.score}
                  totalScore={takeSummary.totalScore}
                />
                <p
                  className="profile-takes__summary__show-details"
                  onClick={() => {
                    toggleTakeDetailsModal();
                    getTakeDetails(takeSummary.id);
                  }}
                >
                  see details
                </p>
              </Fragment>
            ))}
          </div>
        </ExpandDown>
      </div>
      <Modal title="Take info" onClose={toggleTakeDetailsModal} show={showTakeDetailsModal}>
        <TakeResultTable
          titles={['Question', 'Status', 'Correct', 'Answer', 'Correct answer']}
          data={takeDataResponseMock}
        />
      </Modal>
    </Fragment>
  );
};

export default QuizSummary;

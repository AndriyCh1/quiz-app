import React, { useState } from 'react';
import { AiFillEye as OpenedEyeIcon, AiFillEyeInvisible as ClosedEyeIcon } from 'react-icons/ai';

interface ITakeResultItem {
  id: string;
  question: string;
  isAttempted: boolean;
  isCorrect: boolean | null;
  answer: string | null;
  correctAnswer: string;
}

interface IProps {
  titles: string[];
  data: ITakeResultItem[];
}

// TODO: implement separate table component, pass two arrays
const TakeResultTable: React.FC<IProps> = ({ data, titles }) => {
  const [revealedAnswersSet, setRevealedAnswersSet] = useState<Set<number>>(new Set<number>());

  const addRevealedAnswerIndex = (index: number) => {
    setRevealedAnswersSet((revealedAnswers) => new Set(revealedAnswers.add(index)));
  };

  const removeRevealedAnswerIndex = (index: number) => {
    setRevealedAnswersSet((revealedAnswers) => {
      const newRevealedAnswers = new Set(revealedAnswers);
      newRevealedAnswers.delete(index);
      return newRevealedAnswers;
    });
  };

  return (
    <table className="take-result-table">
      <thead>
        <tr>
          {titles.map((title, index) => (
            <th style={{ width: `${100 / titles.length}%` }} key={index}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.question}</td>
            <td>{item.isAttempted ? 'attempted' : 'not answered'}</td>
            <td>
              {item.isCorrect === false ? 'incorrect' : item.isCorrect !== null ? 'correct' : '-'}
            </td>
            <td>{item.answer !== null ? item.answer : '-'}</td>
            <td>
              {revealedAnswersSet.has(index) ? (
                <>
                  {item.correctAnswer}
                  <OpenedEyeIcon onClick={() => removeRevealedAnswerIndex(index)} />
                </>
              ) : (
                <ClosedEyeIcon onClick={() => addRevealedAnswerIndex(index)} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TakeResultTable;

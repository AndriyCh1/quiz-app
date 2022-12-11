import React, { useEffect, useState } from 'react';

import { BsPlusLg as AddIcon } from 'react-icons/bs';
import Button from '../components/button';
import SingleChoiceQuestion from '../components/single-choice-question';

import { generateUniqueId } from '../utils/generate-unique-id';
import { IQuestion } from '../common/interfaces';

const QUIZ_TYPE = 'single-choice';
const TEMP_QUIZ_TIME = 100;

interface IProps {
  data: IQuestion[];
  onChange?: (data: IQuestion[]) => void;
  onError?: (err: string) => void;
}

const SingleChoice: React.FC<IProps> = ({ data, onError, onChange }) => {
  const [questions, setQuestions] = useState<IQuestion[]>(data);
  const [errorMessage, setErrorMessage] = useState('');

  const propQuestion = {
    active: true,
    content: '',
    answers: [],
    score: 0,
    id: generateUniqueId(),
    queryConfig: {
      status: 'new',
    },
  } as IQuestion;

  const handleAddQuestion = () => {
    setQuestions((state) => [...state, propQuestion]);
  };

  const handleChangeQuestion = (question: IQuestion) => {
    setQuestions((state) => {
      return state.map((item) => {
        if (item.queryConfig.status === 'fetched') {
          return item.id === question.id
            ? { ...question, queryConfig: { status: 'edited' } }
            : item;
        }
        return item.id === question.id ? question : item;
      });
    });
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions((state) => {
      const stateWithStatuses = state.map((item) => {
        if (item.queryConfig.status === 'fetched' && item.id === id) {
          return { ...item, queryConfig: { status: 'deleted' } } as IQuestion;
        }

        return item;
      });

      return stateWithStatuses.filter(
        (item) => item.id !== id || item.queryConfig.status === 'deleted',
      );
    });
  };

  useEffect(() => {
    if (onError) {
      onError(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    setQuestions(data);
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(questions);
    }
  }, [questions]);

  return (
    <>
      {questions.map((item) => {
        if (item.queryConfig.status !== 'deleted') {
          return (
            <SingleChoiceQuestion
              key={item.id}
              id={item.id}
              content={item.content}
              score={item.score}
              active={item.active}
              answers={item.answers}
              type={QUIZ_TYPE}
              time={TEMP_QUIZ_TIME}
              defaultAnswers={item.answers}
              onRemove={() => handleRemoveQuestion(item.id)}
              onError={(message) => setErrorMessage(message)}
              onChange={(content, answers, active, score) =>
                handleChangeQuestion({ ...item, content, answers, active, score })
              }
            />
          );
        }
      })}
      <div className="single-choice__add-question-wrapper">
        <Button className="single-choice__add-question-btn" onClick={handleAddQuestion}>
          <AddIcon className="single-choice__add-question-btn__icon" /> Add new question
        </Button>
      </div>
    </>
  );
};

export default SingleChoice;

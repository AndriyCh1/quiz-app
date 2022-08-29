import React from 'react';
import Container from '../components/container';
import Helmet from '../components/helmet';
import Wrapper from '../components/wrapper';

import differentTypesImg from 'assets/images/different-types-quiz.png';
import singleChoiceImg from 'assets/images/single-choice-quiz.png';
import multipleChoiceImg from 'assets/images/multiple-choice.png';
import fillInImg from 'assets/images/fill-in-quiz.png';
import importImg from 'assets/images/import-quiz.png';

const CreateQuiz = () => {
  return (
    <Helmet title="Create a quiz">
      <Container className="create-quiz">
        <Wrapper className="create-quiz-wrapper">
          <div className="create-quiz__info">
            <h1>Create a Quiz</h1>
            <h3>Create an amazing quiz from scratch or by using importing functionality. </h3>
          </div>
          <div className="create-quiz__actions">
            <div className="create-quiz__actions__card">
              <div className="create-quiz__actions__card__img">
                <img src={differentTypesImg} alt="" />
              </div>
              <div className="create-quiz__actions__card__text">
                With different types of answers
              </div>
            </div>
            <div className="create-quiz__actions__card">
              <div className="create-quiz__actions__card__img">
                <img src={singleChoiceImg} alt="" />
              </div>
              <div className="create-quiz__actions__card__text">Single-choice</div>
            </div>
            <div className="create-quiz__actions__card">
              <div className="create-quiz__actions__card__img">
                <img src={multipleChoiceImg} alt="" />
              </div>
              <div className="create-quiz__actions__card__text">Multiple-choice</div>
            </div>
            <div className="create-quiz__actions__card">
              <div className="create-quiz__actions__card__img">
                <img src={fillInImg} alt="" />
              </div>
              <div className="create-quiz__actions__card__text">Fill-in quiz</div>
            </div>
            <div className="create-quiz__actions__card">
              <div className="create-quiz__actions__card__img">
                <img src={importImg} alt="" />
              </div>
              <div className="create-quiz__actions__card__text">
                <span>Import</span>
              </div>
            </div>
          </div>
        </Wrapper>
      </Container>
    </Helmet>
  );
};

export default CreateQuiz;

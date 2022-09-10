import { ChangeEvent, useEffect, useState } from 'react';

import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import Button from '../components/button';
import QuizList from '../components/quiz-list';

import { BsSearch as SearchIcon } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { quizzesActions } from '../store/quizzes';

const VisitorHome = () => {
  const dispatch = useAppDispatch();

  const allQuizzes = useAppSelector((state) => state.quizzes.quizzes);

  const [inputValue, setInputValue] = useState('');
  const [quizzes, setQuizzes] = useState(allQuizzes);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    setQuizzes(
      allQuizzes.filter((item) =>
        inputValue.trim() ? item.title.toLowerCase().includes(inputValue.toLowerCase()) : true,
      ),
    );
  };

  useEffect(() => {
    dispatch(quizzesActions.getAll());
  }, []);

  useEffect(() => {
    setQuizzes(allQuizzes);
  }, [allQuizzes]);

  return (
    <Helmet title="Home">
      <Container className="home">
        <div className="home-search">
          <div className="home-search__input">
            <SearchIcon className="home-search__input__icon" />
            <input type="text" onChange={handleChangeInput} value={inputValue} />
            <Button className="home-search__input__button" onClick={handleSearchClick}>
              Search
            </Button>
          </div>
        </div>
        <Wrapper className="home-result-wrapper">
          <QuizList quizzes={quizzes} />
        </Wrapper>
      </Container>
    </Helmet>
  );
};

export default VisitorHome;

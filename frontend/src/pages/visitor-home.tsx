import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import Button from '../components/button';
import QuizList from '../components/quiz-list';

import { BsSearch as SearchIcon } from 'react-icons/bs';

import quizList from '../assets/data/quiz-list';
import { ChangeEvent, useState } from 'react';

const VisitorHome = () => {
  const publicQuizzes = [...quizList.getAll()];

  const [inputValue, setInputValue] = useState('');
  const [quizzes, setQuizzes] = useState(publicQuizzes);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    setQuizzes(
      publicQuizzes.filter((item) =>
        inputValue.trim() ? item.title.toLowerCase().includes(inputValue.toLowerCase()) : true,
      ),
    );
    console.log(quizzes, 'quizzes');
  };
  console.log(inputValue, 'inputValue');
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

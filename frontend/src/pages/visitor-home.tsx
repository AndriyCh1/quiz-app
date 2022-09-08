import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import Button from '../components/button';
import QuizList from '../components/quiz-list';

import { BsSearch as SearchIcon } from 'react-icons/bs';

import quizList from '../assets/data/quiz-list';

const VisitorHome = () => {
  const publicQuizzes = [...quizList.getAll(), ...quizList.getAll()];

  return (
    <Helmet title="Home">
      <Container className="home">
        <div className="home-search">
          <div className="home-search__input">
            <SearchIcon className="home-search__input__icon" />
            <input type="text" />
            <Button className="home-search__input__button">Search</Button>
          </div>
        </div>
        <Wrapper className="home-result-wrapper">
          <QuizList quizzes={publicQuizzes} />
        </Wrapper>
      </Container>
    </Helmet>
  );
};

export default VisitorHome;

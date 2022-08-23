import { useNavigate } from 'react-router-dom';

import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import Button from '../components/button';
import QuizItem from '../components/quiz-item';

import { BsSearch as SearchIcon } from 'react-icons/bs';

import quizList from '../assets/data/quiz-list';

const Home = () => {
  const quizzes = [
    ...quizList.getAll(),
    ...quizList.getAll(),
    ...quizList.getAll(),
    ...quizList.getAll(),
    ...quizList.getAll(),
  ];

  const navigate = useNavigate();

  return (
    <Helmet title="Home">
      <Container className="home">
        <Wrapper className="home-search">
          <div className="home-search__input">
            <SearchIcon className="home-search__input__icon" />
            <input type="text" />
            <Button className="home-search__input__button">Search</Button>
          </div>
        </Wrapper>
        <Wrapper className="home-result">
          <main className="home-quizzes">
            {quizzes.map((item, index) => (
              <div key={index} className="home-quizzes__item">
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
          </main>
        </Wrapper>
      </Container>
    </Helmet>
  );
};

export default Home;

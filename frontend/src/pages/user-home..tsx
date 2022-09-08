import { ChangeEvent, useEffect, useState } from 'react';

import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import Button from '../components/button';

import { BsSearch as SearchIcon } from 'react-icons/bs';

import quizList from '../assets/data/quiz-list';
import QuizList from '../components/quiz-list';
import Select, { Option } from '../components/select';

enum SelectOptions {
  ALL = 'all',
  CREATED = 'created',
  PUBLIC = 'public',
}

const VisitorHome = () => {
  const publicQuizzes = [...quizList.getAll()];
  const createdQuizzes = [...quizList.getAllCreated()];

  const [quizzes, setQuizzes] = useState(createdQuizzes.concat(publicQuizzes));
  const [selectValue, setSelectValue] = useState<string>(SelectOptions.ALL);

  const updateQuizzes = () => {
    switch (selectValue) {
      case SelectOptions.ALL:
        setQuizzes(createdQuizzes.concat(publicQuizzes));
        break;
      case SelectOptions.CREATED:
        setQuizzes(createdQuizzes);
        break;
      case SelectOptions.PUBLIC:
        setQuizzes(publicQuizzes);
        break;
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  useEffect(() => {
    updateQuizzes();
  }, [selectValue]);

  return (
    <Helmet title="Home">
      <Container className="home">
        <div className="home-search-user">
          <Select value={selectValue} onChange={handleSelectChange}>
            <Option value="all">All</Option>
            <Option value="public">Public</Option>
            <Option value="created">Created</Option>
          </Select>
          <div className="home-search">
            <div className="home-search__input">
              <SearchIcon className="home-search__input__icon" />
              <input type="text" />
              <Button className="home-search__input__button">Search</Button>
            </div>
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

import { ChangeEvent, useEffect, useState } from 'react';

import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import Button from '../components/button';

import { BsSearch as SearchIcon } from 'react-icons/bs';

import QuizList from '../components/quiz-list';
import Select, { Option } from '../components/select';
import { IQuiz } from '../common/interfaces';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { quizzesActions } from '../store/quizzes';

enum SelectOptions {
  ALL = 'all',
  CREATED = 'created',
  PUBLIC = 'public',
}

interface IFilter {
  select: string;
  searchValue: string;
}

const UserHome = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const allQuizzes = useAppSelector((state) => state.quizzes.quizzes);

  // TODO: user filtering works incorrect
  const publicQuizzes = allQuizzes.filter(
    (item) => item.published && item.user?.fullName !== user?.fullName,
  );
  const createdQuizzes = allQuizzes.filter((item) => item.user?.fullName === user?.fullName);

  const [quizzes, setQuizzes] = useState(createdQuizzes.concat(publicQuizzes));

  const [filter, setFilter] = useState<IFilter>({ select: SelectOptions.ALL, searchValue: '' });

  const updateQuizzes = () => {
    let newQuizzesList: IQuiz[] | null = null;

    switch (filter.select) {
      case SelectOptions.ALL:
        newQuizzesList = createdQuizzes.concat(publicQuizzes);
        break;
      case SelectOptions.CREATED:
        newQuizzesList = createdQuizzes;
        break;
      case SelectOptions.PUBLIC:
        newQuizzesList = publicQuizzes;
        break;
    }

    if (newQuizzesList) {
      setQuizzes(
        newQuizzesList.filter((item) =>
          filter.searchValue.trim()
            ? item.title.toLowerCase().includes(filter.searchValue.toLowerCase())
            : true,
        ),
      );
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter((state) => ({ ...state, select: e.target.value }));
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter((state) => ({ ...state, searchValue: e.target.value }));
  };

  const handleSearchClick = () => {
    setQuizzes((state) =>
      state.filter((item) =>
        filter.searchValue.trim()
          ? item.title.toLowerCase().includes(filter.searchValue.toLowerCase())
          : true,
      ),
    );
  };

  useEffect(() => {
    updateQuizzes();
  }, [filter.select]);

  useEffect(() => {
    dispatch(quizzesActions.getAllUser());
  }, []);

  useEffect(() => {
    setQuizzes(allQuizzes);
  }, [allQuizzes]);

  return (
    <Helmet title="Home">
      <Container className="home">
        <div className="home-search-user">
          <Select value={filter.select} onChange={handleSelectChange}>
            <Option value="all">All</Option>
            <Option value="public">Public</Option>
            <Option value="created">Created</Option>
          </Select>
          <div className="home-search">
            <div className="home-search__input">
              <SearchIcon className="home-search__input__icon" />
              <input type="text" value={filter.searchValue} onChange={handleChangeInput} />
              <Button className="home-search__input__button" onClick={handleSearchClick}>
                Search
              </Button>
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

export default UserHome;

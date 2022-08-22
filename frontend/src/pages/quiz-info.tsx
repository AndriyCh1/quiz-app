import React from 'react';
import { useParams } from 'react-router-dom';

const QuizInfo = () => {
  const params = useParams() as { slug: string };
  return <div>Quiz Info {params.slug} </div>;
};

export default QuizInfo;

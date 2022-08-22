import React from 'react';
import { useParams } from 'react-router-dom';

const QuizStart = () => {
  const params = useParams() as { slug: string };

  return <div>Quiz Start {params.slug}</div>;
};

export default QuizStart;

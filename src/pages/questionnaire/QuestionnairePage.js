import React, { useState } from 'react';
import styled from 'styled-components';

import data from './data.json';
import QuestionnaireForm from './QuestionnaireForm';
import * as calc from '../../helpers/calc';

const Score = styled.div`
  margin-top: 20px;
`;

const { title, questions } = data;

const initialValues = {
  answers: data.questions.map(() => {
    return {
      value: 0,
    }
  }),
};

const QuestionnairePage = () => {
  const [score, setScore] = useState();

  const onSubmit = (values) => {
    console.log(values);
    const score = calc.calcScore(values.answers, questions);
    console.log('score', score);
    setScore(score);
  };

  return (
    <>
      <h1>{title}</h1>
      <QuestionnaireForm
        initialValues={initialValues}
        questions={questions}
        onSubmit={onSubmit}
      />
      {score && <Score>Your score is {score}</Score>}
    </>
  );
};

export default QuestionnairePage;

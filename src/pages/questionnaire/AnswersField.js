import React from 'react';
import { useFormikContext, getIn } from 'formik';
import styled from 'styled-components';

import { Input } from '../../components';

const ErrorContainer = styled.div`
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.error};
`;

const AnswersField = ({ type, answers, ...rest }) => {
  const {handleChange, errors } = useFormikContext();
  const { name } = rest;

  return (
    <div role="group" aria-labelledby="answer-group">
      {answers.map((item, index) => (
        <div key={`AnswersField_${index}`}>
          <label>
            <Input type={type === 'single' ? 'radio' : 'checkbox'} name={name} value={item.value} onChange={handleChange} />
            {item.label}
          </label>
        </div>
      ))}
      {errors && getIn(errors, name) && <ErrorContainer>{getIn(errors, name)}</ErrorContainer>}
    </div>
  )
};

export default AnswersField;

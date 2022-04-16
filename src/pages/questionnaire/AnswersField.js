import React from 'react';
import { useFormikContext, getIn } from 'formik';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0;
  margin: 5px 5px 0 0;
`;

const ErrorContainer = styled.div`
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.error};
`;

const Input = ({ ...rest }) => (
  <StyledInput {...rest} />
);

const AnswersField = ({ type, answers, ...rest }) => {
  const {handleChange, errors } = useFormikContext();
  const { name } = rest;

  return (
    <div role="group" aria-labelledby="answer-group">
      {answers.map((item, j) => (
        <div key={`AnswersField_${j}`}>
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

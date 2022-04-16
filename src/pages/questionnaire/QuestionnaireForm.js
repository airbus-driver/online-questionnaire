import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, FieldArray, setIn } from 'formik';

import { TextArea, Button, ProgressBar } from '../../components';

import AnswersField from './AnswersField';

const QuestionWrapper = styled.div`
  display: ${({ active }) => active ? 'block' : 'none'}
`;

const ActionsArea = styled.div`
  padding-left: 5px;
  margin-top: 20px;

  button {
    margin-right: 10px;
  }
`;

const FormControl = styled.div`
  margin-top: 20px;
  padding-left: 5px;
  display: flex;
  flex-direction: column; 
`;

const StyledTextArea = styled(TextArea)`
  width: 100%;
`;

const ProgressWrapper = styled.div`
  min-width: 400px;
`;

const QuestionnaireForm = ({ questions, initialValues, onSubmit }) => {
  const [current, setCurrent] = useState(0);

  const showNext = current < questions.length - 1;
  const showPrev = current > 0;
  const showSubmit = current === questions.length - 1;

  const checkCurrentValue = (value) => {
    if (Array.isArray(value) && !value.length) return false;
    if (!value) return false;

    return true;
  };

  const onNext = (values, setFieldError) => {
    console.log(values)

    const currentValue = values.answers[current].value;
    if (!checkCurrentValue(currentValue)) {
      setFieldError(`answers.${current}.value`, 'You must answer the question.');
      return
    }
    if (current >= questions.length - 1) return;
    setCurrent((prev) => {
      return prev + 1;
    })
  };

  const onPrev = () => {
    if (current === 0) return;
    setCurrent((prev) => {
      return prev - 1;
    })
  };

  const validate = (values) => {
    let errors = {};
    const { answers } = values;
    answers.forEach((item, index) => {
      const result = checkCurrentValue(item.value);
      if (!result) {
        errors = setIn(errors, `answers.${index}.value`, 'You must answer the question.');
      }
    });
    return errors;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      validate={validate}
    >
      {({ values, handleChange, setFieldError }) => (
        <Form noValidate>
          <ProgressWrapper>
            <ProgressBar value={(current + 1) / questions.length * 100} />
          </ProgressWrapper>

          <FieldArray name="answers">
            {() => (
              <div>
                {values.answers.map((answer, index) => (
                  <QuestionWrapper active={current === index} key={index}>
                    <h4>{`${index + 1}. ${questions[index].title}`}</h4>
                    <FormControl>
                      <AnswersField type={questions[index].type} answers={questions[index].answers} name={`answers.${index}.value`} />
                    </FormControl>
                    {questions[index].type === 'multi' &&
                      <FormControl>
                        <label htmlFor={`answers.${index}.comment`}>Comments:</label>
                        <StyledTextArea rows="6" name={`answers.${index}.comment`} onChange={handleChange} />
                      </FormControl>
                    }
                  </QuestionWrapper>
                ))}
              </div>
            )}
          </FieldArray>
          <ActionsArea>
            {showNext && <Button variant='outlined' type="button" onClick={() => onNext(values, setFieldError)}>Next</Button>}
            {showPrev && <Button variant='outlined' type="button" onClick={onPrev}>Previous</Button>}
            {showSubmit && <Button type="submit">Submit</Button>}
          </ActionsArea>
        </Form>
      )}
    </Formik>
  )
};

export default QuestionnaireForm;

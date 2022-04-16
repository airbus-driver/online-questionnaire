import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Form, FieldArray, setIn } from 'formik';

import { TextArea, Button, ProgressBar, Input } from '../../components';
import { useDebounce } from '../../hooks';

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

const Search = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchInput = styled(Input)`
  height: 20px;
  padding: 5px;
  flex: 1 1 30%;
`;

const Questions = styled.div`
  border: 1px solid;
  margin-top: 10px;
  padding: 10px;
  border-radius: 6px;
`;

const QuestionnaireForm = ({ questions, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(questions);
  const [filter, setFilter] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const initialValues = {
    answers: questions.map((item) => {
      return {
        id: item.id,
        value: 0,
      }
    }),
  };

  const checkCurrentValue = (value) => {
    if (Array.isArray(value) && !value.length) return false;
    if (!value) return false;

    return true;
  };

  const calcProgress = useCallback((answers) => {
    const answerSum = answers.reduce((acc, item) => {
      if (checkCurrentValue(item.value)) {
        return acc + 1;
      }
      return acc;
    }, 0);
    const progress = (answerSum || 0) / questions.length * 100;
    return progress;
  }, [questions.length]);

  const handleSearch = useCallback(() => {
    if (!debouncedSearchTerm) {
      setResults(questions);
    }
    if (debouncedSearchTerm && debouncedSearchTerm.length > 2) {
      const searchResults = questions
        .filter(x => x.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || x.answers.some(x => x.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase())));
      setResults(searchResults);
    }
  }, [debouncedSearchTerm, questions]);

  const handleFilterChange = (e, values) => {
    if (filter) {
      handleSearch();
    } else {
      setResults(results.filter(item => !checkCurrentValue(values.answers.find(x => x.id === item.id).value)));
    }
    setFilter(!filter);
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

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
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ values, handleChange }) => (
        <Form noValidate>
          <ProgressWrapper>
            <ProgressBar value={calcProgress(values.answers)} />
          </ProgressWrapper>

          <Search>
            <SearchInput type="text" name="search" placeholder="Search questions / answers" onChange={(e) => setSearchTerm(e.target.value)} />
            <label>
              <Input type="checkbox" name="filter" checked={filter}  onChange={(e) => handleFilterChange(e, values)} />
              Show unanswered questions
            </label>
          </Search>

          <Questions>
            <FieldArray name="answers">
              {() => (
                <div>
                  {questions.map((question, index) => {
                    return (
                      <QuestionWrapper active={results.find(x => x.id === question.id)} key={`question_${index}`}>
                        <h4>{`${index + 1}. ${question.title}`}</h4>
                        <FormControl>
                          <AnswersField type={question.type} answers={question.answers} name={`answers.${index}.value`} />
                        </FormControl>
                        {question.type === 'multi' &&
                          <FormControl>
                            <label htmlFor={`answers.${index}.comment`}>Comments:</label>
                            <StyledTextArea rows="6" name={`answers.${index}.comment`} onChange={handleChange} />
                          </FormControl>
                        }
                      </QuestionWrapper>
                    );
                  })}
                </div>
              )}
            </FieldArray>
          </Questions>
          <ActionsArea>
            <Button type="submit">Submit</Button>
          </ActionsArea>
        </Form>
      )}
    </Formik>
  )
};

export default QuestionnaireForm;

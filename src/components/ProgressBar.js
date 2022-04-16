import React from 'react';
import styled from 'styled-components';

const StyledProgressBar = styled.progress`
  &[value] {
    width: 100%;
    height: 5px;
    border-radius: 10px;

    &::-webkit-progress-bar {
      background: ${({ theme }) => theme.colors.empty};
      border-radius: 6px;
    }

    &::-webkit-progress-value {
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 6px;
    }

    &::-moz-progress-bar {
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 6px;
    }
  }
`;

const ProgressBar = ({ value }) => {
  return (
    <StyledProgressBar max="100" value={value} />
  );
};

export default ProgressBar;

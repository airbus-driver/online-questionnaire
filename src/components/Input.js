import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0;
  margin: 5px 5px 0 0;

  ${({ fullWidth}) => fullWidth === true && `
    width: 100%;
  `}
`;

const Input = ({ fullWidth, ...rest }) => (
  <StyledInput fullWidth={fullWidth} {...rest} />
);

export default Input;

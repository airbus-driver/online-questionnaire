import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  ${({ theme, variant }) => variant === 'primary' && `
    background-color: ${theme.colors.primary};
    color: white;
    border: none;
  `}

  ${({ variant }) => variant === 'outlined' && `
    background-color: transparent;
    color: inherit;
    border: 1px solid black;
  `}

  ${({ disabled }) => disabled && `
    cursor: not-allowed;
  `}
  
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 6px;
`;

const Button = ({ variant = 'primary', ...rest }) => {
  return (
    <StyledButton variant={variant} {...rest} />
  )
};

export default Button;

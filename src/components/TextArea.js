import React from 'react';

const TextArea = ({ ...rest }) => {
  return (
    <textarea rows="6" {...rest} />
  );
};

export default TextArea;

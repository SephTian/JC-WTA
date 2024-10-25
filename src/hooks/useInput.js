import { useState } from 'react';

const useInput = (inputValue = '', { isHTML = false } = {}) => {
  const [input, setInput] = useState(inputValue);

  const resetInput = () => {
    setInput(inputValue);
  };

  if (isHTML) {
    const handleHTMLInputChange = ({ target }) => {
      setInput(target.innerHTML);
    };

    return [input, handleHTMLInputChange, resetInput];
  }

  const handleInputChange = ({ target }) => {
    setInput(target.value);
  };
  return [input, handleInputChange, resetInput];
};

export { useInput };

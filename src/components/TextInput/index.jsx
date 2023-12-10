import './styles.css';
import React from 'react';
import P from 'prop-types';

export const Input = ({ onChange, value }) => {
  return (
    <input className="text-input" type="search" onChange={onChange} value={value} placeholder="Type your search" />
  );
};

Input.propTypes = {
  onChange: P.func.isRequired,
  value: P.string.isRequired,
};

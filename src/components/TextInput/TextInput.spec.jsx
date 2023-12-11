import { render, screen } from '@testing-library/react';
import React from 'react';
import { Input } from '.';
import { userEvent } from '@testing-library/user-event';

describe('<Input>', () => {
  it('should have a value os searchValue', () => {
    const fn = jest.fn();
    render(<Input onChange={fn} value="testando" />);

    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input.value).toBe('testando');
  });

  it('should call handleChange function on ech key pressed', async () => {
    const fn = jest.fn();
    render(<Input onChange={fn} value="o valor qualquer" />);
    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'o valor';
    await userEvent.type(input, value);
    expect(input.value).toBe('o valor qualquer');
    //toHaveBeenCalledTimes methodo para validar quantas vezes a função foi chamada
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match snapshoot', () => {
    const fn = jest.fn();
    const { container } = render(<Input onChange={fn} value="" />);

    expect(container).toMatchSnapshot();
  });
});

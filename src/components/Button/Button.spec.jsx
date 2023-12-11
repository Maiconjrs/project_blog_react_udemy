import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '.';

// describe é o corpo dos testes do componente
describe('<Button/>', () => {
  //it é o teste unitario de uma parte ou do componente, deve conter o texto com uma descrição do que deve ser testado
  it('should render the button whith the text  "Load More"', () => {
    const fn = jest.fn();
    // render é usado quando quero reenderizar algum componente, afim de testa-lo
    render(<Button text="Load More" onClick={fn} />);
    // expect.assertions() é usado passando para definir o numero de vezes que sera chamado um expect
    expect.assertions(1);
    // getByRole é usado para pegar a regra de um componente, muito usado por questões de acessibilidade
    const button = screen.getByRole('button', { name: /load more/i });
    // expect é usado para o teste final do componente, toBeinTheDocumet é usado para dizer que o elemento existe na tela conforme a regra.
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    //jest fn serve para mokar funçoes, caso eu quero dizer que o componente chama uma função
    const fn = jest.fn();
    render(<Button text="Load More" onClick={fn} />);
    const button = screen.getByRole('button', { name: /load more/i });
    //fireEvent serve para simular eventos
    fireEvent.click(button);
    // toHaveBeenCalled serve para dizer que uma função foi chamada
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('shold be disabled when disabled is true', () => {
    const fn = jest.fn();
    render(<Button text="Load More" disabled={true} onClick={fn} />);
    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeDisabled();
  });

  it('shold be disabled when disabled is false', () => {
    const fn = jest.fn();
    render(<Button text="Load More" disabled={false} onClick={fn} />);
    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeEnabled();
  });

  it('shold match Snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="Load More" disabled={false} onClick={fn} />);
    expect(container).toMatchSnapshot();
  });
});

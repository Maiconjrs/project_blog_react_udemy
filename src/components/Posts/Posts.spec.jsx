import React from 'react';
import { render, screen } from '@testing-library/react';
import { Posts } from '.';

const props = {
  posts: [
    {
      id: 1,
      title: 'title1',
      body: 'body1',
      cover: 'img/img1.png',
    },
    {
      id: 2,
      title: 'title2',
      body: 'body2',
      cover: 'img/img2.png',
    },
    {
      id: 3,
      title: 'title3',
      body: 'body3',
      cover: 'img/img3.png',
    },
  ],
};

describe('Posts', () => {
  it('should render Posts', () => {
    // desestruturar com debug e chamalo, serve para printar o elemento no terminal
    //    const { debug } = render(<Posts/>)
    //    debug();
    render(<Posts {...props} />);
    //getAllRole é usado para retornar todos elementos, toHavelength é usado para contar os elementos retornados
    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
    expect(screen.getByRole('img', { name: /title3/i })).toHaveAttribute('src', 'img/img3.png');
  });

  it('should match Snapshot', () => {
    const { container } = render(<Posts {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should not render posts', () => {
    render(<Posts />);
    //query é utilizado quando sabemos que o elemento não possa existir na tela
    expect(screen.queryByRole('heading', { name: /title/i })).not.toBeInTheDocument();
  });
});

import { rest } from 'msw';
import { userEvent } from '@testing-library/user-event';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Home from '.';
import React from 'react';
import { setupServer } from 'msw/node';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1',
        },
        {
          userId: 1,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img2',
        },
        {
          userId: 1,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home/>', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
  it('should render search, posts and load more', async () => {
    console.log('carregou');
    render(<Home />);

    const noMorePosts = screen.getByText('Não exitem posts relacionados ao termo:');
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInThedocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInThedocument();

    screen.debug();
  });

  it('should seaRCH FOR POSTS', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não exitem posts relacionados ao termo:');
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInThedocument();

    expect(screen.getByRole('heading', { name: 'Title1 1' })).toBeInThedocument();
    expect(screen.getByRole('heading', { name: 'Title2 2' })).toBeInThedocument();
    expect(screen.queryByRole('heading', { name: 'Title3 3' })).not.toBeInThedocument();

    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: 'Title1 1' })).toBeInThedocument();
    expect(screen.queryByRole('heading', { name: 'Title2 2' })).not.toBeInThedocument();
    expect(screen.queryByRole('heading', { name: 'Title3 3' })).not.toBeInThedocument();

    expect(screen.getByRole('heading', { name: 'Search value: title1' }));

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'Title1 1' })).toBeInThedocument();
    expect(screen.getByRole('heading', { name: 'Title2 2' })).toBeInThedocument();

    userEvent.type(search, 'blábla');
    expect(screen.getByText('Não exitem posts relacionados ao termo:')).toBeInThedocument();
  });

  it('should load more posts', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não exitem posts relacionados ao termo:');
    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i });
    userEvent.click(button);

    expect(screen.getByRole('heading', { name: 'Title3 3' })).toBeInThedocument();
    expect(button).toBeDisabled();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { DefaultLayout } from './App';

it('renders back to home button link on favorites page and after navigating home checks if button link is not in home page DOM', () => {
  const history = createMemoryHistory();
  history.push('/favorites');

  render(
    <Router history={history}>
      <DefaultLayout />
    </Router>
  );

  const linkElement = screen.getByText(/Back To Home/i, { selector: 'a' });
  expect(linkElement).toBeInTheDocument();

  const leftClick = { button: 0 };
  userEvent.click(linkElement, leftClick);
  expect(history.location.pathname).toBe('/');
  expect(linkElement).not.toBeInTheDocument();
});

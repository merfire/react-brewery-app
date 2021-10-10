import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { Home } from './Home';

describe('Home page tests', () => {
  it('renders search input with placeholder text (Enter brewery name) on home page', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const inputElement = screen.getByPlaceholderText(/Enter brewery name/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('renders search button link on home page and on click navigates to "/breweries" route', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Home />
      </Router>
    );
    const linkElement = screen.getByText(/Search/i, { selector: 'a' });
    expect(linkElement).toBeInTheDocument();

    const leftClick = { button: 0 };
    userEvent.click(linkElement, leftClick);
    expect(history.location.pathname).toBe('/breweries');
  });

  it('navigates to "/breweries" route with proper params based on search input using enter event', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Home />
      </Router>
    );
    const inputElement = screen.getByPlaceholderText(/Enter brewery name/i);
    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: 'copper' } });
    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });
    expect(history.location.pathname).toBe('/breweries');
    const searchParams = new URLSearchParams(history.location.search);
    expect(searchParams.has('by_name')).toBe(true);
    expect(searchParams.get('by_name')).toEqual('copper');
    expect(searchParams.has('page')).toBe(true);
    expect(searchParams.get('page')).toEqual('0');
    expect(searchParams.has('per_page')).toBe(true);
    expect(searchParams.get('per_page')).toEqual('10');
  });

  it('renders favorites button link on home page and on click navigates to "/favorites" route', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Home />
      </Router>
    );
    const linkElement = screen.getByText(/Favorites/i, { selector: 'a' });
    expect(linkElement).toBeInTheDocument();

    const leftClick = { button: 0 };
    userEvent.click(linkElement, leftClick);
    expect(history.location.pathname).toBe('/favorites');
  });
});

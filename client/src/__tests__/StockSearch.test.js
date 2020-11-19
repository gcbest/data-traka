/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import StockSearch from '../components/StockSearch';
import reducer from '../store/reducer';

afterEach(cleanup);

function renderWithRedux(
  component,
  { initialState, store = createStore(reducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}

describe('StockSearch', () => {
  it('renders correctly', () => {
    const { queryByTestId } = renderWithRedux(<StockSearch />);
    const searchInput = queryByTestId('stockQuery');
    expect(searchInput).toBeInTheDocument();
  });
});

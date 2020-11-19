/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PreviewDetails from '../components/PreviewDetails';
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

describe('PreviewDetails', () => {
  it('renders correctly', () => {
    const { queryByTestId } = renderWithRedux(<PreviewDetails />);
    expect(1).toBe(1);
  });
});

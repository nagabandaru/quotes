import { render, renderHook, screen, shallow, waitFor} from '@testing-library/react';
import { useEffect, useReducer } from 'react';
import { unmountComponentAtNode, mountComponent } from 'react-dom';
// import {waitForElement} from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import { getQuote } from '../services/quotes';
import { QuotePage, quotePageStateReducer } from './QuotePage';

beforeEach(() => {
  fetchMock.mockIf(/^http?:\/\/localhost:3000/, req => {
      if (req.url.endsWith("/quote/undefined")) {
        return {
          data: {
            firstName: "John",
          }
        }
      } else if (req.url.endsWith("/addons")) {
        return Promise.resolve([])
      } else {
        return {
          status: 404,
          body: "Not Found"
        }
      }
  })
});

afterEach(() => {
});
test('Test reducer returns  loadingAddons false', () => {
    const initialState = {
        loadingAddons: true
    };
    const doneLoadingAction = {type: 'doneLoadingAddons'};
    const updatedState = quotePageStateReducer(initialState, doneLoadingAction);
    expect(updatedState.loadingAddons).toEqual(false);
  });
test('renders learn react link', async () => {
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useParams: () => ({
            quoteId: 1
        })
    }));
      render(<QuotePage />);
    const nameElement = await waitFor(() => screen.getByText(/Quote not found/i));
    // const nameElement = screen.getByText(/Hey, John/i);
    expect(nameElement).toBeInTheDocument();
});

import { cleanup, render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
// Different than jest. Globals are off by default.
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  expect,
  test,
} from 'vitest';

import { App } from './App';

const server = setupServer(
  http.get('http://localhost:3001/', () =>
    HttpResponse.text('Hello from the server!')
  )
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

beforeEach(() => {
  server.resetHandlers();
});

afterEach(() => {
  cleanup(); // Different than jest. RTL cleanup doesn't happen by default.
});

afterAll(() => {
  server.close();
});

test('App renders data', async () => {
  render(<App />);
  expect(screen.getByText('Hello Vite')).toBeInTheDocument();
  expect(screen.getByTestId('date-label')).toHaveTextContent(
    format(new Date(), 'dd MMM yyyy')
  );

  const serverMessage = await screen.findByTestId('server-message');

  expect(serverMessage).toHaveTextContent('Hello from the server!');
});

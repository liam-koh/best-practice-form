import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('1 is 1', () => {
  expect(1).toBe(1);
});

test('render', async () => {
  render(<App />);
  expect(screen.getByText('o2pluss template')).toBeInTheDocument();
});

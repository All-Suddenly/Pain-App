import { render, screen } from '@testing-library/react';

import { TrackerPage } from '../TrackerPage';

test('renders TrackerPage', () => {
  render(<TrackerPage />);

  const linkElement = screen.getByText(/Hello TrackerPage!/i);

  expect(linkElement).toBeInTheDocument();
});

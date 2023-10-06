import { render, screen } from '@testing-library/react';

test('renders learn react link', () => {
  const SimpleComponent = () => <p>learn react</p>
  render(<SimpleComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

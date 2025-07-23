import { render } from '@testing-library/react';
import React from 'react';
import Home from '../pages/Home';

describe('Home component', () => {
  it('renders', () => {
    render(<Home />);
  });
});

import React from 'react';
// next's automatic jsx runtime isn't used in tests, so ensure React is in scope
globalThis.React = React;
import { render, screen } from '@testing-library/react';
import PricingTable from '../components/ui/PricingTable';
import { describe, it, expect } from 'vitest';

describe('PricingTable', () => {
  it('renders all plan names', () => {
    render(<PricingTable />);
    ['Starter', 'Growth', 'Scale', 'Enterprise'].forEach((name) => {
      expect(screen.getByText(name)).toBeTruthy();
    });
  });
});

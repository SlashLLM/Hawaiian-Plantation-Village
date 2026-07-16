import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../components/admin/StatusBadge.jsx';

describe('StatusBadge', () => {
  it('renders status text', () => {
    render(<StatusBadge value="registered" />);
    expect(screen.getByText('registered')).toBeInTheDocument();
  });
});

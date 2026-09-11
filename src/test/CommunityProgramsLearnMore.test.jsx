import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommunityProgramsPanel from '../components/admin/CommunityProgramsPanel.jsx';
import * as cmsAdminApi from '../lib/content/cmsAdminApi.js';
import * as cmsApi from '../lib/content/cmsApi.js';

vi.mock('../hooks/useAuth.js', () => ({
  useAuth: () => ({ isAdmin: true, isStaff: true, loading: false }),
}));

const EXISTING_EVENT = {
  slug: 'obon-festival',
  date: 'AUG 15',
  startDate: '2026-08-15',
  endDate: '',
  title: 'Obon Festival',
  time: '5:00 PM - 9:00 PM',
  desc: 'An evening of dance and food.',
  image: '',
};

function mockSection(items) {
  vi.spyOn(cmsAdminApi, 'fetchAllPageSections').mockResolvedValue([
    {
      id: 'sec-1',
      page_key: 'home',
      section_key: 'events',
      status: 'published',
      sort_order: 9,
      payload: { items },
    },
  ]);
}

describe('CommunityProgramsPanel — Learn more', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSection([EXISTING_EVENT]);
    vi.spyOn(cmsAdminApi, 'savePageSection').mockResolvedValue(undefined);
    vi.spyOn(cmsApi, 'fetchPublishedCustomPages').mockResolvedValue([
      { id: 'p1', slug: 'obon-festival', title: 'Obon Festival', status: 'published' },
    ]);
  });

  it('shows existing events as having no Learn more button', async () => {
    render(<CommunityProgramsPanel />);
    expect(await screen.findByText('Obon Festival')).toBeInTheDocument();
    expect(screen.getByText('Off')).toBeInTheDocument();
  });

  it('hides the target fields until the button is turned on', async () => {
    const user = userEvent.setup();
    render(<CommunityProgramsPanel />);
    await screen.findByText('Obon Festival');

    expect(screen.queryByLabelText('Links to')).not.toBeInTheDocument();

    await user.click(screen.getByRole('checkbox', { name: /learn more/i }));
    expect(screen.getByLabelText('Links to')).toBeInTheDocument();
    expect(screen.getByLabelText('Button label')).toHaveValue('Learn More');
  });

  it('saves the chosen CMS page into the event payload', async () => {
    const user = userEvent.setup();
    render(<CommunityProgramsPanel />);
    await user.click(await screen.findByRole('button', { name: 'Edit' }));

    await user.click(screen.getByRole('checkbox', { name: /learn more/i }));
    await user.selectOptions(screen.getByLabelText('Page'), 'obon-festival');
    await user.click(screen.getByRole('button', { name: /save event/i }));

    const [record] = cmsAdminApi.savePageSection.mock.calls.at(-1);
    expect(record.payload.items[0].learnMore).toMatchObject({
      enabled: true,
      kind: 'page',
      pageSlug: 'obon-festival',
      label: 'Learn More',
    });
  });

  it('refuses to save an unsafe external url', async () => {
    const user = userEvent.setup();
    render(<CommunityProgramsPanel />);
    await user.click(await screen.findByRole('button', { name: 'Edit' }));

    await user.click(screen.getByRole('checkbox', { name: /learn more/i }));
    await user.selectOptions(screen.getByLabelText('Links to'), 'external');
    await user.type(screen.getByLabelText('Article URL'), 'notaurl');
    await user.click(screen.getByRole('button', { name: /save event/i }));

    expect(await screen.findByText(/starting with http/i)).toBeInTheDocument();
    expect(cmsAdminApi.savePageSection).not.toHaveBeenCalled();
  });

  it('refuses to save an enabled button with no page chosen', async () => {
    const user = userEvent.setup();
    render(<CommunityProgramsPanel />);
    await user.click(await screen.findByRole('button', { name: 'Edit' }));

    await user.click(screen.getByRole('checkbox', { name: /learn more/i }));
    await user.click(screen.getByRole('button', { name: /save event/i }));

    expect(await screen.findByText(/choose a page for the learn more button/i)).toBeInTheDocument();
    expect(cmsAdminApi.savePageSection).not.toHaveBeenCalled();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SectionsPanel from '../components/admin/SectionsPanel.jsx';
import * as cmsAdminApi from '../lib/content/cmsAdminApi.js';

vi.mock('../hooks/useAuth.js', () => ({
  useAuth: () => ({ isAdmin: true, isStaff: true, loading: false }),
}));

describe('SectionsPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(cmsAdminApi, 'fetchAllPageSections').mockResolvedValue([
      { id: '1', page_key: 'home', section_key: 'whyVisit', status: 'published', sort_order: 2, payload: { title: 'CMS Title' } },
    ]);
  });

  it('loads and displays sections', async () => {
    render(<SectionsPanel />);
    expect(await screen.findByText('whyVisit')).toBeInTheDocument();
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
  });

  it('shows add section form and section picker', async () => {
    render(<SectionsPanel />);
    expect(await screen.findByRole('button', { name: 'Add section' })).toBeInTheDocument();
    expect(screen.getByText('Choose a section…')).toBeInTheDocument();
  });

  it('shows empty state for filtered page with no rows', async () => {
    vi.spyOn(cmsAdminApi, 'fetchAllPageSections').mockResolvedValue([]);
    render(<SectionsPanel />);
    expect(await screen.findByText('No page sections yet')).toBeInTheDocument();
  });

  it('loads existing section when selected from dropdown', async () => {
    const user = userEvent.setup();
    vi.spyOn(cmsAdminApi, 'fetchAllPageSections').mockResolvedValue([
      {
        id: '2',
        page_key: 'visit',
        section_key: 'hours',
        status: 'draft',
        sort_order: 0,
        payload: { title: 'Saved Hours Title', schedule: 'Tue–Sat 9–2' },
      },
    ]);

    render(<SectionsPanel />);
    await screen.findByText('hours');

    await user.selectOptions(screen.getByLabelText('Page'), 'visit');
    await user.selectOptions(screen.getByLabelText('Section'), 'hours');

    expect(screen.getByText('Edit section')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toHaveValue('Saved Hours Title');
    expect(screen.getByLabelText('Schedule')).toHaveValue('Tue–Sat 9–2');
  });

  it('keeps existing section options enabled with exists hint', async () => {
    const user = userEvent.setup();
    vi.spyOn(cmsAdminApi, 'fetchAllPageSections').mockResolvedValue([
      {
        id: '2',
        page_key: 'visit',
        section_key: 'hours',
        status: 'draft',
        sort_order: 0,
        payload: { title: 'Hours' },
      },
    ]);

    render(<SectionsPanel />);
    await screen.findByText('hours');

    await user.selectOptions(screen.getByLabelText('Page'), 'visit');

    const hoursOption = screen.getByRole('option', { name: 'Hours (exists)' });
    expect(hoursOption).not.toBeDisabled();
  });

  it('clears edit mode when Choose a section is selected', async () => {
    const user = userEvent.setup();
    vi.spyOn(cmsAdminApi, 'fetchAllPageSections').mockResolvedValue([
      {
        id: '2',
        page_key: 'visit',
        section_key: 'hours',
        status: 'draft',
        sort_order: 0,
        payload: { title: 'Saved Hours Title' },
      },
    ]);

    render(<SectionsPanel />);
    await screen.findByText('hours');

    await user.selectOptions(screen.getByLabelText('Page'), 'visit');
    await user.selectOptions(screen.getByLabelText('Section'), 'hours');
    expect(screen.getByText('Edit section')).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('Section'), '');
    expect(screen.getByText('New page section')).toBeInTheDocument();
    expect(screen.queryByLabelText('Title')).not.toBeInTheDocument();
  });

  it('shows guided fields for Quick Visit instead of raw JSON', async () => {
    const user = userEvent.setup();
    render(<SectionsPanel />);
    await screen.findByRole('button', { name: 'Add section' });

    const sectionSelect = screen.getByDisplayValue('Choose a section…');
    await user.selectOptions(sectionSelect, 'quickVisit');

    expect(screen.getByText('Section content')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByLabelText('Hours title')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Primary text').length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByLabelText('Payload JSON')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Advanced JSON editor' })).toBeInTheDocument();
  });

  it('toggles to advanced JSON editor', async () => {
    const user = userEvent.setup();
    render(<SectionsPanel />);
    await screen.findByRole('button', { name: 'Add section' });

    await user.selectOptions(screen.getByDisplayValue('Choose a section…'), 'quickVisit');
    await user.click(screen.getByRole('button', { name: 'Advanced JSON editor' }));

    expect(screen.getByText('Payload JSON')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Use guided fields' })).toBeInTheDocument();
    const jsonArea = document.querySelector('textarea.admin-form-textarea');
    expect(jsonArea).toBeTruthy();
    expect(jsonArea.value).toContain('HOURS OF OPERATION');
  });

  it('saves guided field edits into the payload', async () => {
    const user = userEvent.setup();
    const saveSpy = vi.spyOn(cmsAdminApi, 'savePageSection').mockResolvedValue({});
    vi.spyOn(cmsAdminApi, 'fetchAllPageSections').mockResolvedValue([]);

    render(<SectionsPanel />);
    await screen.findByText('Choose a section…');

    await user.selectOptions(screen.getByDisplayValue('Choose a section…'), 'quickVisit');
    const hoursTitle = screen.getByLabelText('Hours title');
    await user.clear(hoursTitle);
    await user.type(hoursTitle, 'OPEN HOURS');

    await user.click(screen.getByRole('button', { name: 'Save section' }));

    expect(saveSpy).toHaveBeenCalled();
    const [payload] = saveSpy.mock.calls[0];
    expect(payload.section_key).toBe('quickVisit');
    expect(payload.payload.hours.title).toBe('OPEN HOURS');
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import PageBuilder from '../components/admin/PageBuilder.jsx';
import * as cmsAdminApi from '../lib/content/cmsAdminApi.js';
import * as cmsApi from '../lib/content/cmsApi.js';

vi.mock('../hooks/useAuth.js', () => ({
  useAuth: () => ({ isAdmin: true, isStaff: true, loading: false }),
}));

function renderBuilder(props = {}) {
  return render(
    <MemoryRouter>
      <PageBuilder onDone={() => {}} {...props} />
    </MemoryRouter>,
  );
}

async function addBlock(user, label) {
  await user.selectOptions(screen.getByLabelText('Block type'), label);
  await user.click(screen.getByRole('button', { name: /add block/i }));
}

describe('PageBuilder', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(cmsAdminApi, 'saveCustomPage').mockResolvedValue({ id: 'p1' });
    vi.spyOn(cmsApi, 'fetchPublishedCustomPages').mockResolvedValue([]);
  });

  it('starts empty and derives the web address from the title', async () => {
    const user = userEvent.setup();
    renderBuilder();
    expect(screen.getByText(/no blocks yet/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText('Page title'), 'Obon Festival');
    expect(screen.getByLabelText('Web address')).toHaveValue('/events/obon-festival');
  });

  it('pre-fills from a seed handed over by the events panel', () => {
    renderBuilder({ seed: { title: 'Lantern Floating' } });
    expect(screen.getByLabelText('Page title')).toHaveValue('Lantern Floating');
  });

  it('adds a block and shows it in the live preview', async () => {
    const user = userEvent.setup();
    renderBuilder();

    await addBlock(user, 'richText');
    expect(screen.getByText('1. Text section')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Heading'), 'What to expect');
    const preview = screen.getByTestId('page-preview');
    expect(within(preview).getByText('What to expect')).toBeInTheDocument();
  });

  it('reorders blocks with the move buttons', async () => {
    const user = userEvent.setup();
    renderBuilder();

    await addBlock(user, 'richText');
    await addBlock(user, 'quote');
    expect(screen.getByText('1. Text section')).toBeInTheDocument();
    expect(screen.getByText('2. Pull quote')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /move pull quote up/i }));
    expect(screen.getByText('1. Pull quote')).toBeInTheDocument();
    expect(screen.getByText('2. Text section')).toBeInTheDocument();
  });

  it('removes a block after confirming', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderBuilder();

    await addBlock(user, 'quote');
    await user.click(screen.getByRole('button', { name: /remove pull quote/i }));
    expect(screen.getByText(/no blocks yet/i)).toBeInTheDocument();
  });

  it('saves the page with its blocks and a derived slug', async () => {
    const user = userEvent.setup();
    renderBuilder();

    await user.type(screen.getByLabelText('Page title'), 'Obon Festival');
    await addBlock(user, 'richText');
    await user.click(screen.getByRole('button', { name: /^save$/i }));

    const [record, editingId] = cmsAdminApi.saveCustomPage.mock.calls.at(-1);
    expect(editingId).toBeNull();
    expect(record).toMatchObject({ slug: 'obon-festival', title: 'Obon Festival', status: 'draft' });
    expect(record.blocks).toHaveLength(1);
    expect(record.blocks[0].type).toBe('richText');
  });

  it('publishes straight from the builder', async () => {
    const user = userEvent.setup();
    renderBuilder();

    await user.type(screen.getByLabelText('Page title'), 'Obon Festival');
    await user.click(screen.getByRole('button', { name: /save & publish/i }));

    expect(cmsAdminApi.saveCustomPage.mock.calls.at(-1)[0].status).toBe('published');
  });

  it('refuses to save without a title', async () => {
    const user = userEvent.setup();
    renderBuilder();

    await user.click(screen.getByRole('button', { name: /^save$/i }));
    expect(await screen.findByText(/give the page a title/i)).toBeInTheDocument();
    expect(cmsAdminApi.saveCustomPage).not.toHaveBeenCalled();
  });

  it('keeps the slug fixed when editing an existing page', async () => {
    const user = userEvent.setup();
    renderBuilder({
      page: { id: 'p1', slug: 'obon-festival', title: 'Obon Festival', status: 'published', seo: {}, blocks: [] },
    });

    await user.clear(screen.getByLabelText('Page title'));
    await user.type(screen.getByLabelText('Page title'), 'Obon Festival 2027');
    await user.click(screen.getByRole('button', { name: /^save$/i }));

    const [record, editingId] = cmsAdminApi.saveCustomPage.mock.calls.at(-1);
    expect(editingId).toBe('p1');
    expect(record.slug).toBe('obon-festival');
    expect(record.title).toBe('Obon Festival 2027');
  });

  it('explains a duplicate web address in plain language', async () => {
    const user = userEvent.setup();
    cmsAdminApi.saveCustomPage.mockRejectedValue(
      new Error('duplicate key value violates unique constraint "custom_pages_slug_key"'),
    );
    renderBuilder();

    await user.type(screen.getByLabelText('Page title'), 'Obon Festival');
    await user.click(screen.getByRole('button', { name: /^save$/i }));

    expect(await screen.findByText(/already uses that web address/i)).toBeInTheDocument();
  });
});

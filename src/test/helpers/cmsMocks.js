import { vi } from 'vitest';

export function createSupabaseChain(result = { data: [], error: null }) {
  const chain = {
    select: vi.fn(() => chain),
    insert: vi.fn(() => chain),
    update: vi.fn(() => chain),
    upsert: vi.fn(() => chain),
    eq: vi.fn(() => chain),
    order: vi.fn(() => chain),
    maybeSingle: vi.fn(() => Promise.resolve(result)),
    single: vi.fn(() => Promise.resolve(result)),
    then: (resolve) => Promise.resolve(result).then(resolve),
  };
  return chain;
}

export function mockSupabase(responses = {}) {
  const defaultChain = createSupabaseChain();
  const from = vi.fn((table) => responses[table] ?? defaultChain);
  vi.doMock('../../lib/supabase.js', () => ({
    supabase: { from },
    isSupabaseConfigured: true,
  }));
  return { from };
}

export function mockAuth({ isAdmin = true, isStaff = true, loading = false } = {}) {
  vi.doMock('../../hooks/useAuth.js', () => ({
    useAuth: () => ({ isAdmin, isStaff, loading, role: isAdmin ? 'admin' : 'staff' }),
  }));
}

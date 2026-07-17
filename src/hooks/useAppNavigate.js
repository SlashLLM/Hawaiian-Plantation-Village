import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { pathFromPageId } from '../lib/navigation.js';

export function useAppNavigate() {
  const navigate = useNavigate();

  const setActivePage = useCallback((pageId, params = {}) => {
    const path = pathFromPageId(pageId, params);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  return setActivePage;
}

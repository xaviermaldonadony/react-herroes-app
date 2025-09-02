import type { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { renderHook, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { usePaginationHero } from './usePaginationHero';
import { getHeroesByPageAction } from '../actions/get-heroes-by-page.action';

vi.mock('../actions/get-heroes-by-page.action', () => ({
  getHeroesByPageAction: vi.fn(),
}));

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const tanStackCustomProvider = () => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}> {children}</QueryClientProvider>
  );
};

describe('usePaginationHero', () => {
  beforeEach(() => {
    // Provide a default mock value to prevent the undefined error
    mockGetHeroesByPageAction.mockResolvedValue({
      total: 20,
      pages: 4,
      heroes: [],
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  test('Should return the initial state isLoading', () => {
    const { result } = renderHook(() => usePaginationHero(1, 6), {
      wrapper: tanStackCustomProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);
    expect(result.current.data).toBeUndefined();
  });

  test('should return success state with data when API call succeeds', async () => {
    const { result } = renderHook(() => usePaginationHero(1, 6), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.status).toBe('success');
    expect(mockGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, 'all');
  });

  test('should call getHeroesByPageActions with arguments', async () => {
    const { result } = renderHook(() => usePaginationHero(2, 16, 'heroesABC'), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.status).toBe('success');
    expect(mockGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(2, 16, 'heroesABC');
  });
});

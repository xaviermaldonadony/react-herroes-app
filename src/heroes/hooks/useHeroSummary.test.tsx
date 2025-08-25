import type { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { describe, expect, test, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useHeroSummary } from './useHeroSummary';
import { getSummaryAcion } from '../actions/get-summary-actions';
import type { SummaryInformationResponse } from '../types/summary-information.response';

vi.mock('../actions/get-summary-actions', () => ({
  getSummaryAcion: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSummaryAcion);

const tanStackCustomProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}> {children}</QueryClientProvider>
  );
};

describe('useHeroSummary', () => {
  // Use a beforeEach to reset the mock's behavior before each test
  beforeEach(() => {
    // Provide a default mock value to prevent the undefined error
    mockGetSummaryAction.mockResolvedValue({
      totalHeroes: 0,
      strongestHero: {},
      smartestHero: {},
      heroCount: 0,
      villainCount: 0,
    } as SummaryInformationResponse);
  });

  test('Should return the initial state isLoading', () => {
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);
    expect(result.current.data).toBeUndefined();
  });

  test('Data hould return success sate when API call succeds', async () => {
    // this only works when action not mocked
    // const expectedData = {
    //   totalHeroes: 25,
    //   strongestHero: {
    //     id: '1',
    //     name: 'Clark Kent',
    //     slug: 'clark-kent',
    //     alias: 'Superman',
    //     powers: expect.any(Array),
    //     description:
    //       'The Last Son of Krypton, protector of Earth and a symbol of hope for all humanity.',
    //     strength: 10,
    //     intelligence: 8,
    //     speed: 9,
    //     durability: 10,
    //     team: 'Justice League',
    //     image: '1.jpeg',
    //     firstAppearance: '1938',
    //     status: 'Active',
    //     category: 'Hero',
    //     universe: 'DC',
    //   },
    //   smartestHero: {
    //     id: '2',
    //     name: 'Bruce Wayne',
    //     slug: 'bruce-wayne',
    //     alias: 'Batman',
    //     powers: expect.any(Array),
    //     description:
    //       'The Dark Knight of Gotham City, who uses fear as a weapon against crime and corruption.',
    //     strength: 6,
    //     intelligence: 10,
    //     speed: 6,
    //     durability: 7,
    //     team: 'Justice League',
    //     image: '2.jpeg',
    //     firstAppearance: '1939',
    //     status: 'Active',
    //     category: 'Hero',
    //     universe: 'DC',
    //   },
    //   heroCount: 18,
    //   villainCount: 7,
    // };
    // expect(result.current.data).toStrictEqual(expectedData);

    const mockSummaryData = {
      totalHeroes: 25,
      strongestHero: {
        id: '1',
        name: 'Clark Kent',
      },
      smartestHero: {
        id: '2',
        name: 'Batman',
      },
      heroCount: 18,
      villainCount: 7,
    } as SummaryInformationResponse;

    mockGetSummaryAction.mockResolvedValue(mockSummaryData);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isError).toBe(false);
    expect(mockGetSummaryAction).toHaveBeenCalled();
  });

  test('Should return error state when API call fails', async () => {
    const mockError = new Error('Failed to fetch summary');
    mockGetSummaryAction.mockRejectedValue(mockError);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error?.message).toBe('Failed to fetch summary');
  });
});

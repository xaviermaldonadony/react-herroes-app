import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { HomePage } from './HomePage';
import { MemoryRouter } from 'react-router';
import { usePaginationHero } from '@/heroes/hooks/usePaginationHero';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach } from 'node:test';
import { FavoriteHeroeProvider } from '@/heroes/context/FavoriteHeroe.context';

vi.mock('@/heroes/hooks/usePaginationHero');

const mockUsePaginationdHero = vi.mocked(usePaginationHero);

mockUsePaginationdHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
} as unknown as ReturnType<typeof usePaginationHero>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroeProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroeProvider>
    </MemoryRouter>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Should render HomePage with default values', () => {
    const { container } = renderHomePage();
    expect(container).toMatchSnapshot();
  });

  test('Should call usePaginationHero with default values', () => {
    renderHomePage();
    expect(mockUsePaginationdHero).toHaveBeenCalledWith(1, 6, 'all');
  });

  test('Should call usePaginationHero with custom query params', () => {
    renderHomePage(['/?page=2&limit=10&category=villains']);
    const lastCall = mockUsePaginationdHero.mock.lastCall;

    // Assert that the last call's arguments match the custom query params
    expect(lastCall).toEqual([2, 10, 'villains']);
  });

  test('Should call usePaginationHero with default page and same limit on tab clicked', () => {
    renderHomePage(['/?tab=favorites&page=2&limit=10']);
    const [, , , villainsTab] = screen.getAllByRole('tab');

    fireEvent.click(villainsTab);
    const lastCall = mockUsePaginationdHero.mock.lastCall;
    expect(lastCall).toEqual([1, 10, 'villain']);
  });
});

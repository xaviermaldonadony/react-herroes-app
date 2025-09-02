import { FavoriteHeroeProvider } from '@/heroes/context/FavoriteHeroe.context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import SearchPage from './SearchPage';
import { searchHeroesAction } from '@/heroes/actions/search-heros.actions';
import type { Hero } from '@/heroes/types/hero.interface';

vi.mock('@/heroes/components/HeroGrid', () => ({
  HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
    <div data-testid='hero-grid'>
      {heroes.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>
  ),
}));

vi.mock('@/components/custom/CustomJumbotron', () => ({
  CustomJumbotron: () => <div data-testid='custom-jumbotron'></div>,
}));

vi.mock('@/heroes/actions/search-heros.actions');

vi.mock('./ui/SearchControls', () => ({
  SearchControls: () => <div data-testid='search-controls'></div>,
}));

const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroeProvider>
        <QueryClientProvider client={queryClient}>
          <SearchPage />
        </QueryClientProvider>
      </FavoriteHeroeProvider>
    </MemoryRouter>
  );
};

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('Should render SearchPage with default values', () => {
    const { container } = renderSearchPage();

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: undefined,
      strength: undefined,
    });
    expect(container).toMatchSnapshot();
  });

  test('Should call earch action with name parameter', () => {
    const { container } = renderSearchPage(['/search?name=superman']);

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: 'superman',
      strength: undefined,
    });

    expect(container).toMatchSnapshot();
  });

  test('Should call earch action with strength parameter', () => {
    const { container } = renderSearchPage([
      '/search?name=superman&strength=6',
    ]);

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: 'superman',
      strength: '6',
    });

    expect(container).toMatchSnapshot();
  });

  test('Should render hero grid with search results', async () => {
    const mockHeroes = [
      { id: '1', name: 'Clark Kent' } as unknown as Hero,
      { id: '2', name: 'Bruce Wayne' } as unknown as Hero,
    ];

    mockSearchHeroesAction.mockResolvedValue(mockHeroes);

    renderSearchPage();

    await waitFor(() => {
      expect(screen.getByText('Clark Kent')).toBeDefined();
      expect(screen.getByText('Bruce Wayne')).toBeDefined();
    });
  });
});

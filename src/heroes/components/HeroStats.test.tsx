import { describe, expect, test, vi } from 'vitest';
import { HeroStats } from './HeroStats';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useHeroSummary } from '../hooks/useHeroSummary';
import type { SummaryInformationResponse } from '../types/summary-information.response';
import { FavoriteHeroeProvider } from '../context/FavoriteHeroe.context';

vi.mock('../hooks/useHeroSummary');
const mockUseHeroSummary = vi.mocked(useHeroSummary);

const mockHero = {
  id: '1',
  name: 'Clark Kent',
  slug: 'clark-kent',
  alias: 'Superman',
  powers: [
    'Super strength',
    'Flight',
    'Heat vision',
    'X-ray vision',
    'Invulnerability',
    'Super speed',
  ],
  description:
    'The Last Son of Krypton, protector of Earth and a symbol of hope for all humanity.',
  strength: 10,
  intelligence: 8,
  speed: 9,
  durability: 10,
  team: 'Justice League',
  image: '1.jpeg',
  firstAppearance: '1938',
  status: 'Active',
  category: 'Hero',
  universe: 'DC',
};

const mockSummaryData: SummaryInformationResponse = {
  totalHeroes: 25,
  strongestHero: {
    id: '1',
    name: 'Clark Kent',
    slug: 'clark-kent',
    alias: 'Superman',
    powers: [
      'Super strength',
      'Flight',
      'Heat vision',
      'X-ray vision',
      'Invulnerability',
      'Super speed',
    ],
    description:
      'The Last Son of Krypton, protector of Earth and a symbol of hope for all humanity.',
    strength: 10,
    intelligence: 8,
    speed: 9,
    durability: 10,
    team: 'Justice League',
    image: '1.jpeg',
    firstAppearance: '1938',
    status: 'Active',
    category: 'Hero',
    universe: 'DC',
  },
  smartestHero: {
    id: '2',
    name: 'Bruce Wayne',
    slug: 'bruce-wayne',
    alias: 'Batman',
    powers: [
      'Martial arts',
      'Detective skills',
      'Advanced technology',
      'Stealth',
      'Tactical genius',
    ],
    description:
      'The Dark Knight of Gotham City, who uses fear as a weapon against crime and corruption.',
    strength: 6,
    intelligence: 10,
    speed: 6,
    durability: 7,
    team: 'Justice League',
    image: '2.jpeg',
    firstAppearance: '1939',
    status: 'Active',
    category: 'Hero',
    universe: 'DC',
  },
  heroCount: 18,
  villainCount: 7,
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderHeroStats = (mockData?: Partial<SummaryInformationResponse>) => {
  mockUseHeroSummary.mockReturnValue({
    data: mockData ?? undefined,
  } as unknown as ReturnType<typeof useHeroSummary>);

  return render(
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroeProvider>
        <HeroStats />
      </FavoriteHeroeProvider>
    </QueryClientProvider>
  );
};

describe('HeroStats', () => {
  test('should render component with default values', () => {
    const { container } = renderHeroStats();

    expect(screen.getByText('Loading...')).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render HeroStats with mock data', () => {
    const { container } = renderHeroStats(mockSummaryData);

    expect(container).toMatchSnapshot();
    expect(screen.getByText('Total Characters')).toBeDefined();
    expect(screen.getByText('Favorite')).toBeDefined();
    expect(screen.getByText('Strongest')).toBeDefined();
  });

  test('should change the percentage of favorites when hero is added to favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([mockHero]));
    renderHeroStats(mockSummaryData);

    const favoritePercentageElement = screen.getByTestId('favorite-percentage');
    const favoriteCountElement = screen.getByTestId('favorite-count');
    expect(favoritePercentageElement.innerHTML).toContain('4.00%');
    expect(favoriteCountElement.innerHTML).toContain('1');
  });
});

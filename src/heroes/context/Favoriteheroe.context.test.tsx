import { use } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';

import {
  FavoriteHeroContext,
  FavoriteHeroeProvider,
} from './FavoriteHeroe.context';
import type { Hero } from '../types/hero.interface';

const mockHero = {
  id: '1',
  name: 'Batman',
} as Hero;

const TestComponent = () => {
  const { favoriteCount, favorites, isFavorite, toggleFavorite } =
    use(FavoriteHeroContext);

  // create a component that consumes the context
  return (
    <div>
      <div data-testid='favorite-count'>{favoriteCount}</div>
      <div data-testid='favorite-list'>
        {favorites.map((hero) => (
          <div key={hero.id} data-testid={`hero-${hero.id}`}>
            {hero.name}
          </div>
        ))}
      </div>
      <button
        data-testid='toggle-favorite'
        onClick={() => toggleFavorite(mockHero)}
      >
        Toggle Favorite
      </button>
      // T or F doesnt render so toString it to renderize it
      <div data-testid='is-favorite'>{isFavorite(mockHero).toString()}</div>
    </div>
  );
};

const renderContextTest = () => {
  return render(
    <FavoriteHeroeProvider>
      <TestComponent />
    </FavoriteHeroeProvider>
  );
};

describe('FavoriteHeroContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should initialize with default values', () => {
    renderContextTest();

    expect(screen.getByTestId('favorite-count').textContent).toBe('0');
    expect(screen.getByTestId('favorite-list').children.length).toBe(0);
  });

  test('should add hero to favorites when toggleFavorite is called', () => {
    renderContextTest();
    const button = screen.getByTestId('toggle-favorite');

    fireEvent.click(button);

    expect(screen.getByTestId('favorite-count').textContent).toBe('1');
    expect(screen.getByTestId('is-favorite').textContent).toBe('true');
    expect(screen.getByTestId('hero-1').textContent).toBe('Batman');
    expect(localStorage.getItem('favorites')).toBe(
      '[{"id":"1","name":"Batman"}]'
    );
  });

  test('should remove hero to favorites when toggleFavorite is called', () => {
    localStorage.setItem('favorites', JSON.stringify([mockHero]));
    renderContextTest();
    const button = screen.getByTestId('toggle-favorite');

    expect(screen.getByTestId('favorite-count').textContent).toBe('1');
    expect(screen.getByTestId('is-favorite').textContent).toBe('true');
    expect(screen.getByTestId('hero-1').textContent).toBe('Batman');

    fireEvent.click(button);

    expect(screen.getByTestId('favorite-count').textContent).toBe('0');
    expect(screen.getByTestId('is-favorite').textContent).toBe('false');
    expect(screen.queryByTestId('hero-1')).toBeNull();
  });
});

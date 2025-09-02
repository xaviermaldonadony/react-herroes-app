import { describe, expect, test, vi } from 'vitest';
import { appRouter } from './app.router';
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from 'react-router';
import { render, screen } from '@testing-library/react';

vi.mock('@/heroes/layout/HeroesLayout', () => ({
  HeroesLayout: () => (
    <div data-testid='heroes-layout'>
      <Outlet />
    </div>
  ),
}));

vi.mock('@/heroes/pages/home/HomePage', () => ({
  HomePage: () => <div data-testid='home-page'></div>,
}));

vi.mock('@/heroes/pages/hero/HeroPage', () => ({
  HeroPage: () => {
    const { idSlug = '' } = useParams();

    return <div data-testid='hero-page'>HeroPage - {idSlug}</div>;
  },
}));

vi.mock('@/heroes/pages/search/SearchPage', () => ({
  default: () => <div data-testid='search-page'></div>,
}));

describe('appRouter', () => {
  test('should be configured as expected', () => {
    expect(appRouter.routes).toMatchSnapshot;
  });

  test('should render home page at root path', () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('home-page')).toBeDefined();
  });

  test('should render hero page at /heroes/:idSlug path', () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/heroes/superman'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('hero-page').innerHTML).toContain('superman');
  });

  // lazy loaded so it needs to be asyn
  test('Should render search page at /search path', async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/search'],
    });

    render(<RouterProvider router={router} />);
    expect(await screen.findByTestId('search-page')).toBeDefined();
  });

  test('Should redirect to home page for unknow routes', () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/some-page'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('home-page')).toBeDefined();
  });
});

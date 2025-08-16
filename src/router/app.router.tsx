import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import { AdminLayout } from '@/admin/layout/AdminLayout';
import { HeroesLayout } from '@/heroes/layout/HeroesLayout';
import { HeroPage } from '@/heroes/pages/hero/HeroPage';
import { HomePage } from '@/heroes/pages/home/HomePage';

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
const AdminPage = lazy(() => import('@/heroes/pages/search/SearchPage'));

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/heroes/1',
        element: <HeroPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);

import { lazy } from 'react';
import { createHashRouter, createBrowserRouter, Navigate } from 'react-router';

import { AdminLayout } from '@/admin/layout/AdminLayout';
import { HeroesLayout } from '@/heroes/layout/HeroesLayout';
import { HeroPage } from '@/heroes/pages/hero/HeroPage';
import { HomePage } from '@/heroes/pages/home/HomePage';
import { AdminPage } from '@/admin/pages/AdminPage';

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
  {
    path: '/',
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/heroes/:idSlug',
        element: <HeroPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '*',
        element: <Navigate to='/' />,
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

import { useQuery } from '@tanstack/react-query';
import { getHeroesByPageAction } from '../actions/get-heroes-by-page.action';

export const usePaginationHero = (
  page: number,
  limit: number,
  category = 'all'
) => {
  return useQuery({
    queryKey: ['heroes', { page, limit, category }],
    queryFn: () => getHeroesByPageAction(+page, +limit, category),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

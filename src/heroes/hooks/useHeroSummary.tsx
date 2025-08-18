import { useQuery } from '@tanstack/react-query';
import { getSummaryAcion } from '../actions/get-summary-actions';

export const useHeroSummary = () => {
  return useQuery({
    queryKey: ['summary-information'],
    queryFn: getSummaryAcion,
    staleTime: 1000 * 60 * 5, // 5 mins
  });
};

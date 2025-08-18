import { heroApi } from '../api/hero.api';
import type { HeroesResponse } from '../types/get-heroes.response';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async (
  page: number,
  limit: number = 6,
  category: string = 'all'
): Promise<HeroesResponse> => {
  page = isNaN(page) ? 1 : page;
  limit = isNaN(limit) ? 6 : limit;
  console.log({ category });

  const { data } = await heroApi.get<HeroesResponse>('/', {
    params: {
      limit,
      offset: (page - 1) * limit,
      category,
    },
  });

  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));

  return {
    ...data,
    heroes,
  };
};

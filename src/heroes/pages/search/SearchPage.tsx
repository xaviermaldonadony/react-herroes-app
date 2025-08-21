import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { searchHeroesAction } from '@/heroes/actions/search-heros.actions';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;

  const { data: heroes = [] } = useQuery({
    queryKey: ['searchHeroes', { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    retry: 100 * 60 * 5,
  });

  return (
    <>
      <CustomJumbotron
        title={'Search for Super Heroe'}
        description='
          Discover, explore, and manage your favorite superheroes and villains'
      />
      <CustomBreadcrumbs
        currentPage='Search Heros'
        // breadcrumbs={[
        //   { label: 'Home', to: '/' },
        //   { label: 'Home2', to: '/' },
        //   { label: 'Home3', to: '/' },
        // ]}
      />
      {/* Stats Dashboard */}
      <HeroStats />
      {/* Filter and Search */}
      <SearchControls />

      <HeroGrid heroes={heroes} />
    </>
  );
};

export default SearchPage;

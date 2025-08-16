import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
        title={'Search for Super Heroe'}
        description='
          Discover, explore, and manage your favorite superheroes and villains'
      />
      <CustomBreadcrumbs
        currentPage='Search for hereos'
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Home2', to: '/' },
          { label: 'Home3', to: '/' },
        ]}
      />
      {/* Stats Dashboard */}
      <HeroStats />
      {/* Filter and Search */}
      <SearchControls />
    </>
  );
};

export default SearchPage;

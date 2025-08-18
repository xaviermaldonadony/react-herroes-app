import { useMemo, use } from 'react';
import { useSearchParams } from 'react-router';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { useHeroSummary } from '@/heroes/hooks/useHeroSummary';
import { usePaginationHero } from '@/heroes/hooks/usePaginationHero';
import { FavoriteHeroContext } from '@/heroes/context/FavoriteHeroe.context';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  const { data: heroesResponse } = usePaginationHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();

  console.log(heroesResponse);
  return (
    <>
      <>
        <CustomBreadcrumbs currentPage='Super Heroes' breadcrumbs={[]} />
        {/* Header */}
        <CustomJumbotron
          title='Super Heroes Universe'
          description='
          Discover, explore, and manage your favorite superheroes and villains'
        />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        {/* To do  */}
        <Tabs value={selectedTab} className='mb-8'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger
              value='all'
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'all');
                  prev.set('category', 'all');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              All Characters {summary?.totalHeroes}
            </TabsTrigger>
            <TabsTrigger
              value='favorites'
              className='flex items-center gap-2'
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'favorites');
                  return prev;
                })
              }
            >
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value='heroes'
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'heroes');
                  prev.set('category', 'hero');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              Heroes {summary?.heroCount}
            </TabsTrigger>
            <TabsTrigger
              value='villains'
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'villains');
                  prev.set('category', 'villain');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              Villains {summary?.villainCount}
            </TabsTrigger>
          </TabsList>

          <TabsContent value='all'>
            {/* Character Grid */}
            {/* Show all characters */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value='favorites'>
            {/* TODO Show all favorites */}
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value='heroes'>
            {/* TODO Show all Heroes*/}
            <h1>Heroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value='villains'>
            {/* TODO Show all Villains*/}
            <h1>Villains</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>
        {/* Pagination */}
        {selectedTab !== 'favorites' && (
          <CustomPagination totalPages={heroesResponse?.pages ?? 0} />
        )}
      </>
    </>
  );
};

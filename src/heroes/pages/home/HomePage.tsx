import { useState } from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';

export const HomePage = () => {
  const [activetab, setActivetab] = useState<
    'heroes' | 'villains' | 'favorites' | 'all'
  >('all');
  return (
    <>
      <>
        <CustomBreadcrumbs currentPage='Super Heroes' breadcrumbs={[]} />
        {/* Header */}
        <CustomJumbotron
          title={'Super Heroe Universe'}
          description='
          Discover, explore, and manage your favorite superheroes and villains'
        />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        {/* To do  */}
        <Tabs value={activetab} className='mb-8'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='all' onClick={() => setActivetab('all')}>
              All Characters (16)
            </TabsTrigger>
            <TabsTrigger
              value='favorites'
              className='flex items-center gap-2'
              onClick={() => setActivetab('favorites')}
            >
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value='heroes' onClick={() => setActivetab('heroes')}>
              Heroes (12)
            </TabsTrigger>
            <TabsTrigger
              value='villains'
              onClick={() => setActivetab('villains')}
            >
              Villains (2)
            </TabsTrigger>
          </TabsList>
          <TabsContent value='all'>
            {/* Character Grid */}
            {/* Show all characters */}
            <HeroGrid />
          </TabsContent>
          <TabsContent value='favorites'>
            {/* TODO Show all favorites */}
            <h1>Favorites</h1>
            <HeroGrid />
          </TabsContent>
          <TabsContent value='heroes'>
            {/* TODO Show all Heroes*/}
            <h1>Heroes</h1>
            <HeroGrid />
          </TabsContent>
          <TabsContent value='villains'>
            {/* TODO Show all Villains*/}
            <h1>Villains</h1>
            <HeroGrid />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={8} />
      </>
    </>
  );
};

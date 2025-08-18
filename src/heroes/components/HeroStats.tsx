import { use } from 'react';
import { Badge } from '@/components/ui/badge';

import { Users, Heart, Zap, Trophy } from 'lucide-react';
import { HeroStatCard } from './HeroStatCard';
import { useHeroSummary } from '../hooks/useHeroSummary';
import { FavoriteHeroContext } from '../context/FavoriteHeroe.context';

export const HeroStats = () => {
  const { data: summary } = useHeroSummary();
  const { favoriteCount } = use(FavoriteHeroContext);

  if (!summary) {
    return <div>Loading...</div>;
  }

  const percetnageFavorite = (
    (favoriteCount / summary.totalHeroes) *
    100
  ).toFixed(2);

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
      <HeroStatCard
        title={'Total Characters'}
        icon={<Users className='h-4 w-4 text-muted-foreground' />}
      >
        <div className='text-2xl font-bold'>{summary?.totalHeroes}</div>
        <div className='flex gap-1 mt-2'>
          <Badge variant='secondary' className='text-xs'>
            {summary?.heroCount} Heroes
          </Badge>
          <Badge variant='destructive' className='text-xs'>
            {summary?.villainCount} Villains
          </Badge>
        </div>
      </HeroStatCard>

      <HeroStatCard
        title={'Favorite'}
        icon={<Heart className='h-4 w-4 text-muted-foreground' />}
      >
        {/* TODO */}
        <div className='text-2xl font-bold text-red-600'>{favoriteCount}</div>
        <p className='text-xs text-muted-foreground'>{percetnageFavorite}%</p>
      </HeroStatCard>

      <HeroStatCard
        title='Strongest'
        icon={<Zap className='h-4 w-4 text-muted-foreground' />}
      >
        <div className='text-lg font-bold'>{summary?.strongestHero.alias}</div>
        <p className='text-xs text-muted-foreground'>
          Strength:{summary?.strongestHero.strength}/10
        </p>
      </HeroStatCard>

      <HeroStatCard
        title={'Smartest'}
        icon={<Trophy className='h-4 w-4 text-muted-foreground' />}
      >
        <div className='text-lg font-bold'>{summary?.smartestHero.alias}</div>
        <p className='text-xs text-muted-foreground'>
          Intelligence: {summary?.smartestHero.intelligence}/10
        </p>
      </HeroStatCard>
    </div>
  );
};

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getHeroAction } from '@/heroes/actions/get-hero.action';
import { useQuery } from '@tanstack/react-query';
import { Shield, Zap, Brain, Gauge, Users, Star, Award } from 'lucide-react';
import { Navigate, useParams } from 'react-router';

export const HeroPage = () => {
  const { idSlug = '' } = useParams();

  const { data: superheroData, isError } = useQuery({
    queryKey: ['heroes', idSlug],
    queryFn: () => getHeroAction(idSlug),
    retry: false,
  });

  if (isError) {
    return <Navigate to='/' />;
  }

  if (!superheroData) {
    return <h3>Loading...</h3>;
  }

  const totalPower =
    superheroData.strength +
    superheroData.intelligence +
    superheroData.speed +
    superheroData.durability;
  const averagePower = Math.round((totalPower / 4) * 10);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-gray-500';
      case 'retired':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'hero':
        return 'bg-blue-500';
      case 'villain':
        return 'bg-red-500';
      case 'antihero':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header Banner */}
      <div className='bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white'>
        <div className='max-w-7xl mx-auto px-6 py-12'>
          <div className='flex flex-col md:flex-row items-center gap-8'>
            <div className='relative'>
              <img
                src={superheroData.image || '/placeholder.svg'}
                alt={superheroData.alias}
                width={200}
                height={200}
                className='rounded-full border-4 border-white/20 shadow-2xl'
              />
              <div className='absolute -top-2 -right-2'>
                <div className='bg-yellow-400 text-black rounded-full p-2'>
                  <Star className='w-6 h-6' />
                </div>
              </div>
            </div>

            <div className='flex-1 text-center md:text-left'>
              <div className='flex flex-wrap gap-2 justify-center md:justify-start mb-4'>
                <Badge
                  className={`${getCategoryColor(
                    superheroData.category
                  )} text-white`}
                >
                  {superheroData.category}
                </Badge>
                <Badge
                  className={`${getStatusColor(
                    superheroData.status
                  )} text-white`}
                >
                  {superheroData.status}
                </Badge>
                <Badge
                  variant='secondary'
                  className='bg-white/20 text-white border-white/30'
                >
                  {superheroData.universe}
                </Badge>
              </div>

              <h1 className='text-4xl md:text-6xl font-bold mb-2'>
                {superheroData.alias}
              </h1>
              <p className='text-xl text-blue-200 mb-4'>{superheroData.name}</p>
              <p className='text-lg text-gray-300 max-w-2xl'>
                {superheroData.description}
              </p>
            </div>

            <div className='text-center'>
              <div className='bg-white/10 rounded-lg p-6 backdrop-blur-sm'>
                <div className='text-3xl font-bold text-yellow-400'>
                  {averagePower}%
                </div>
                <div className='text-sm text-gray-300'>Strength</div>
                <div className='flex justify-center mt-2'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(averagePower / 20)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <Tabs defaultValue='stats' className='w-full'>
          <TabsList className='grid w-full grid-cols-4 mb-8'>
            <TabsTrigger value='stats' className='flex items-center gap-2'>
              <Gauge className='w-4 h-4' />
              Stats
            </TabsTrigger>
            <TabsTrigger value='powers' className='flex items-center gap-2'>
              <Zap className='w-4 h-4' />
              Powers
            </TabsTrigger>
            <TabsTrigger value='team' className='flex items-center gap-2'>
              <Users className='w-4 h-4' />
              Team
            </TabsTrigger>
            <TabsTrigger value='info' className='flex items-center gap-2'>
              <Award className='w-4 h-4' />
              Information
            </TabsTrigger>
          </TabsList>

          <TabsContent value='stats' className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {/* Strength */}
              <Card className='text-center'>
                <CardContent className='pt-6'>
                  <div className='flex justify-center mb-4'>
                    <div className='bg-red-100 p-3 rounded-full'>
                      <Zap className='w-8 h-8 text-red-600' />
                    </div>
                  </div>
                  <h3 className='font-semibold text-lg mb-2'>Strength</h3>
                  <div className='text-3xl font-bold text-red-600 mb-2'>
                    {superheroData.strength}
                  </div>
                  <Progress
                    value={superheroData.strength * 10}
                    className='h-2'
                  />
                </CardContent>
              </Card>

              {/* Intelligence */}
              <Card className='text-center'>
                <CardContent className='pt-6'>
                  <div className='flex justify-center mb-4'>
                    <div className='bg-purple-100 p-3 rounded-full'>
                      <Brain className='w-8 h-8 text-purple-600' />
                    </div>
                  </div>
                  <h3 className='font-semibold text-lg mb-2'>Intelligence</h3>
                  <div className='text-3xl font-bold text-purple-600 mb-2'>
                    {superheroData.intelligence}
                  </div>
                  <Progress
                    value={superheroData.intelligence * 10}
                    className='h-2'
                  />
                </CardContent>
              </Card>

              {/* Speed */}
              <Card className='text-center'>
                <CardContent className='pt-6'>
                  <div className='flex justify-center mb-4'>
                    <div className='bg-yellow-100 p-3 rounded-full'>
                      <Gauge className='w-8 h-8 text-yellow-600' />
                    </div>
                  </div>
                  <h3 className='font-semibold text-lg mb-2'>Speed</h3>
                  <div className='text-3xl font-bold text-yellow-600 mb-2'>
                    {superheroData.speed}
                  </div>
                  <Progress value={superheroData.speed * 10} className='h-2' />
                </CardContent>
              </Card>

              {/* Durability */}
              <Card className='text-center'>
                <CardContent className='pt-6'>
                  <div className='flex justify-center mb-4'>
                    <div className='bg-green-100 p-3 rounded-full'>
                      <Shield className='w-8 h-8 text-green-600' />
                    </div>
                  </div>
                  <h3 className='font-semibold text-lg mb-2'>Endurance</h3>
                  <div className='text-3xl font-bold text-green-600 mb-2'>
                    {superheroData.durability}
                  </div>
                  <Progress
                    value={superheroData.durability * 10}
                    className='h-2'
                  />
                </CardContent>
              </Card>
            </div>

            {/* Power Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>List of Powers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center gap-4'>
                    <div className='w-24 text-sm font-medium'>Strength</div>
                    <div className='flex-1'>
                      <Progress
                        value={superheroData.strength * 10}
                        className='h-4'
                      />
                    </div>
                    <div className='w-12 text-right font-bold'>
                      {superheroData.strength}/10
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='w-24 text-sm font-medium'>Intelligence</div>
                    <div className='flex-1'>
                      <Progress
                        value={superheroData.intelligence * 10}
                        className='h-4'
                      />
                    </div>
                    <div className='w-12 text-right font-bold'>
                      {superheroData.intelligence}/10
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='w-24 text-sm font-medium'>Speed</div>
                    <div className='flex-1'>
                      <Progress
                        value={superheroData.speed * 10}
                        className='h-4'
                      />
                    </div>
                    <div className='w-12 text-right font-bold'>
                      {superheroData.speed}/10
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='w-24 text-sm font-medium'>Endurance</div>
                    <div className='flex-1'>
                      <Progress
                        value={superheroData.durability * 10}
                        className='h-4'
                      />
                    </div>
                    <div className='w-12 text-right font-bold'>
                      {superheroData.durability}/10
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='powers'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Zap className='w-6 h-6 text-yellow-500' />
                  Superpoderes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {superheroData.powers.map((power, index) => (
                    <div
                      key={index}
                      className='bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='bg-blue-500 p-2 rounded-full'>
                          <Zap className='w-4 h-4 text-white' />
                        </div>
                        <span className='font-medium text-blue-900'>
                          {power}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='team'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Users className='w-6 h-6 text-green-500' />
                  Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-center py-8'>
                  <div className='bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center'>
                    <Users className='w-12 h-12 text-green-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-green-700 mb-2'>
                    {superheroData.team}
                  </h3>
                  <p className='text-gray-600'>Strongest Team Member</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='info'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-gray-600'>Real Name:</span>
                    <span className='font-semibold'>{superheroData.name}</span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-gray-600'>Alias:</span>
                    <span className='font-semibold'>{superheroData.alias}</span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-gray-600'>Category:</span>
                    <Badge
                      className={`${getCategoryColor(
                        superheroData.category
                      )} text-white`}
                    >
                      {superheroData.category}
                    </Badge>
                  </div>
                  <div className='flex justify-between items-center py-2'>
                    <span className='text-gray-600'>Status:</span>
                    <Badge
                      className={`${getStatusColor(
                        superheroData.status
                      )} text-white`}
                    >
                      {superheroData.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Universe Details</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-gray-600'>Universe:</span>
                    <span className='font-semibold'>
                      {superheroData.universe}
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-gray-600'>First Appereance:</span>
                    <span className='font-semibold'>
                      {superheroData.firstAppearance}
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-2'>
                    <span className='text-gray-600'>Years Active:</span>
                    <span className='font-semibold'>
                      {new Date().getFullYear() -
                        Number.parseInt(superheroData.firstAppearance)}{' '}
                      years
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

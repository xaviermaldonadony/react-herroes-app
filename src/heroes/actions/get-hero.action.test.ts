import { describe, expect, test } from 'vitest';
import { getHeroAction } from './get-hero.action';

const BASE_URL = import.meta.env.VITE_API_URL;

describe('getHeroAction', () => {
  test('should fetch hero data and return with complete image url', async () => {
    const result = await getHeroAction('clark-kent');

    const resultImageUrl = `${BASE_URL}/images/${result.id}.jpeg`;
    const resultObj = {
      id: '1',
      name: 'Clark Kent',
      slug: 'clark-kent',
      alias: 'Superman',
      powers: [
        'Super strength',
        'Flight',
        'Heat vision',
        'X-ray vision',
        'Invulnerability',
        'Super speed',
      ],
      description:
        'The Last Son of Krypton, protector of Earth and a symbol of hope for all humanity.',
      strength: 10,
      intelligence: 8,
      speed: 9,
      durability: 10,
      team: 'Justice League',
      image: 'http://localhost:3001/images/1.jpeg',
      firstAppearance: '1938',
      status: 'Active',
      category: 'Hero',
      universe: 'DC',
    };

    expect(result).toStrictEqual(resultObj);
    expect(result.image).toBe(resultImageUrl);
  });

  test('should throw an error if here is not found', async () => {
    const idSlug = 'batman-2';

    const result = await getHeroAction(idSlug).catch((error) => {
      expect(error).toBeDefined();
      expect(error.message).toBe('Request failed with status code 404');
    });

    expect(result).toBeUndefined();
  });
});

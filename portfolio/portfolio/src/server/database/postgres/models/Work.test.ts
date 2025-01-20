import { describe, it, vi } from 'vitest';
vi.mock('$env/static/private', () => ({
  PRIVATE_PG_DATABASE_URL: 'postgres://postgres:example@localhost:5432/portfolio_test'
}));
import { work } from './Work';
import type { Work } from '$lib/models/Work';

// All tests within this suite will be run in parallel
describe.concurrent('Potgres - Work', () => {
  it('Should insert a new work to database', async ({ expect }) => {
    const data: Work = {
      title: 'Test Title',
      description: 'Test description',
      link: 'https://somelink.test',
      image: 'https://mystorageimage.com/someimage.png'
    };
    const inserted = await work.insert(data);
    expect(inserted.title).toEqual(data.title);
    expect(inserted.description).toEqual(data.description);
    expect(inserted.link).toEqual(data.link);
    expect(inserted.image).toEqual(data.image);
  });
});

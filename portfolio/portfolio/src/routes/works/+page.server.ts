import { WorkSchema } from '$components/works/WorkSchema';
import { work } from '$server/database/postgres/models/Work';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const works = await fetch('/api/works').then((resp) => resp.json());
  return { works };
};

export const actions: Actions = {
  create: async ({ request }) => {
    try {
      const formData = Object.fromEntries(await request.formData());
      const result = WorkSchema.parse(formData);
      const inserted = await work.insert(result);
      return inserted;
    } catch (err: any) {
      throw error(400, 'Invalid data provided');
    }
  },
  update: async ({ request }) => {
    try {
      const formData = Object.fromEntries(await request.formData());
      const result = WorkSchema.parse(formData);
      const updated = await work.update(result);
      return updated;
    } catch (err: any) {
      throw error(400, 'Invalid data provided');
    }
  }
};

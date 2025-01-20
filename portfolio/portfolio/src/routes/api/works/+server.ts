import { work } from '$server/database/postgres/models/Work';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.formData();
  const title = body.get('title')?.toString();
  if (!title) {
    throw error(400, 'title must be provided.');
  }
  const workObject = {
    title,
    description: body.get('description')?.toString() || null,
    link: body.get('link')?.toString() || null,
    image: body.get('image')?.toString() || null,
    createdDate: new Date()
  };
  const result = await work.insert(workObject);

  return json(result);
};

export const GET: RequestHandler = async () => {
  const works = await work.find();
  return json(works);
};

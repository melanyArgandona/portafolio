import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { socialNetwork } from '$server/database/mongo/models/SocialNetwork';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.formData();
  const type = body.get('type')?.toString();
  const link = body.get('link')?.toString();
  if (!type) {
    throw error(400, 'type must be provided.');
  }
  if (!link) {
    throw error(400, 'link must be provided.');
  }
  const socialNetworkObject = {
    type,
    link
  };
  const result = await socialNetwork.insert(socialNetworkObject);
  return json(result);
};

export const GET: RequestHandler = async () => {
  const results = await socialNetwork.find();
  return json(results);
};

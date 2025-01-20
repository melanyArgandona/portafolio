import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { skill } from '$server/database/postgres/models/Skill';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.formData();
  const area = body.get('area')?.toString();
  const subArea = body.get('subArea')?.toString();
  const skillParam = body.get('skill')?.toString();
  const level = Number(body.get('level')?.toString());
  if (!area) {
    throw error(400, 'area must be provided.');
  }
  if (!subArea) {
    throw error(400, 'subArea must be provided.');
  }
  if (!skillParam) {
    throw error(400, 'skill must be provided.');
  }
  if (!level) {
    throw error(400, 'level must be provided.');
  }
  const skillObject = {
    area,
    subArea,
    skill: skillParam,
    level,
    createdDate: new Date()
  };
  const skillResult = await skill.insert(skillObject);
  return json(skillResult);
};

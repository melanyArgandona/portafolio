import type { Skill } from '$lib/models/Skill';
import { getConnection } from '../PgClient';

class SkillClass {
  async insert({ area, subArea, skill, level, createdDate = new Date() }: Skill) {
    const query = `INSERT INTO "Skill"(area, "subArea", skill, level, "createdDate")
			values($1, $2, $3, $4, $5) RETURNING *`;
    const values = [area, subArea, skill, level, createdDate];
    const connection = await getConnection();
    const response = await connection.query(query, values);
    const [skillInserted] = <Array<Skill>>response.rows;
    return skillInserted;
  }
}

export const skill = new SkillClass();

import type { Work } from '$lib/models/Work';
import { getConnection } from '../PgClient';

class WorkClass {
  async insert({ title, description, link, image, createdDate = new Date() }: Work) {
    const query = `insert into "Work"(title, description, link, image, "createdDate")
			values($1, $2, $3, $4, $5) RETURNING *`;
    const values = [title, description, link, image, createdDate];
    const client = await getConnection();
    const result = await client.query(query, values);
    const [work] = <Array<Work>>result.rows;
    return work;
  }

  async update({ id, title, description, link, image }: Work) {
    const query = `UPDATE "Work" SET title=$1, description=$2, link=$3, image=$4 WHERE id=$5`;
    const values = [title, description, link, image, id];
    const client = await getConnection();
    const result = await client.query(query, values);
    const [work] = <Array<Work>>result.rows;
    return work;
  }

  async find() {
    const query = 'SELECT * FROM "Work" ORDER BY "createdDate"';
    const client = await getConnection();
    const results = await client.query(query);
    return <Array<Work>>results.rows;
  }
}

export const work = new WorkClass();

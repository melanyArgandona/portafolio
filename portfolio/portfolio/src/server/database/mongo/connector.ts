import mongoose from 'mongoose';
import { PRIVATE_MONGO_DATABASE_URL } from '$env/static/private';

async function main() {
  mongoose.connect(PRIVATE_MONGO_DATABASE_URL);
}

main()
  .then(() => console.info('Connected to mongo'))
  .catch((err) => console.error(err));

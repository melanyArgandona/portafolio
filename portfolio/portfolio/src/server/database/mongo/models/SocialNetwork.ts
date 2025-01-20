import { error } from '@sveltejs/kit';
import { SocialNetworkModel } from './SocialNetwork.schema';
import type { SocialNetwork } from '$lib/models/SocialNetwork';

class SocialNetworkClass {
  async insert({ type, link }: SocialNetwork) {
    try {
      const document = new SocialNetworkModel({ type, link });
      return await document.save();
    } catch (err: any) {
      throw error(400, err.message);
    }
  }

  async find() {
    const documents = await SocialNetworkModel.find({});
    return Array.from(documents);
  }
}

export const socialNetwork = new SocialNetworkClass();

import { SocialNetworksMap } from '$lib/utils/socialNetworks';
import mongoose from 'mongoose';

export const socialNetworkSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.keys(SocialNetworksMap)
  },
  link: {
    type: String,
    validate: {
      validator: function (value: string) {
        return /^((http|https):\/\/)/.test(value);
      },
      message: (props: { value: string }) => `${props.value} is not a valid link!`
    }
  }
});

export const SocialNetworkModel = mongoose.model('SocialNetwork', socialNetworkSchema);

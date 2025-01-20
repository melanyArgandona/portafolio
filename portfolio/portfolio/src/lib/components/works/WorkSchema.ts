import { z } from 'zod';

export const WorkSchema = z.object({
  id: z.optional(z.coerce.number().or(z.undefined())),
  title: z.string().nonempty({ message: 'Title is required' }).trim(),
  description: z.string().nonempty({ message: 'Description is required' }).trim(),
  link: z.string().url({ message: 'Link must be a valid URL' }),
  image: z.string().nonempty({ message: 'Image link is required' }).url()
});

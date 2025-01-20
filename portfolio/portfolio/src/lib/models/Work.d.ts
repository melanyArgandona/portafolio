export type Work = {
  id?: number;
  title: string;
  description: string | null;
  link: string | null;
  image: string | null;
  createdDate?: Date;
};

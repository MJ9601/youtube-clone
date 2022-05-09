export type Video = {
  _id: string;
  owner: string;
  published: boolean;
  videoId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  extension: string;
  description: string;
  title: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  iat: number;
  exp: number;
} | null;

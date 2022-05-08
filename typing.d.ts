export type Video = {
  _id: string;
  owner: string;
  published: boolean;
  videoId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  extension: string;
  description: string;
  title: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
} | null;

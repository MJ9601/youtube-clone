import axios from "axios";

export type UserInfo = {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBaseUrl = `${baseUrl}/api/users`;
const authBaseUrl = `${baseUrl}/api/auth`;
const videoBaseUrl = `${baseUrl}/api/videos`;

export const registerUserFunc = (payload: UserInfo) =>
  axios.post(userBaseUrl, payload).then((res) => res.data);

export const getUserFunc = () =>
  axios.get(userBaseUrl).then((res) => res.data());

export const loginUserFunc = (payload: { email: string; password: string }) =>
  axios.post(authBaseUrl, payload).then((res) => res.data());

export const getAllVideosFunc = () =>
  axios.get(videoBaseUrl).then((res) => res.data());

export const getVideoFunc = (videoId: string) =>
  axios.get(`${videoBaseUrl}/${videoId}`).then((res) => res.data());

// export const createVideoFunc = ()

export const updateVideoInfoFunc = (
  videoId: string,
  payload: { title: string; description: string; published: boolean }
) =>
  axios.patch(`${videoBaseUrl}/${videoId}`, payload).then((res) => res.data());

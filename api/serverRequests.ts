import axios from "axios";
import { User, Video } from "../typing";

const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBaseUrl = `${baseUrl}/api/users`;
const authBaseUrl = `${baseUrl}/api/auth`;
const videoBaseUrl = `${baseUrl}/api/videos`;

export const registerUserFunc = (payload: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => axios.post(userBaseUrl, payload).then((res) => res.data);

export const loginUserFunc = (payload: { email: string; password: string }) =>
  axios
    .post(authBaseUrl, payload, { withCredentials: true })
    .then((res) => res.data);

export const getUserFunc = (): Promise<User> =>
  axios
    .get(userBaseUrl, { withCredentials: true })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });

export const getAllVideosFunc = async (): Promise<Video[]> =>
  await (await fetch(videoBaseUrl)).json();

export const getVideoFunc = (videoId: string) =>
  axios
    .get(`${videoBaseUrl}/${videoId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
// export const createVideoFunc = ()

export const updateVideoInfoFunc = (
  videoId: string,
  payload: { title: string; description: string; published: boolean }
) => axios.patch(`${videoBaseUrl}/${videoId}`, payload).then((res) => res.data);

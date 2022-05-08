import axios from "axios";
import { User, Video } from "../typing";

const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBaseUrl = `${baseUrl}/api/users`;
const authBaseUrl = `${baseUrl}/api/auth`;
const videoBaseUrl = `${baseUrl}/api/videos`;

// signup a new user
export const registerUserFunc = (payload: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => axios.post(userBaseUrl, payload).then((res) => res.data);

// login function
export const loginUserFunc = (payload: { email: string; password: string }) =>
  axios
    .post(authBaseUrl, payload, { withCredentials: true })
    .then((res) => res.data);

// get user in serverSide rendering
export const getUserFunc = ({ req }: { req: any }): Promise<User> =>
  axios
    .get(userBaseUrl, {
      withCredentials: true,
      headers: { Cookie: req.headers.cookie },
    })
    .then((res) => res.data)
    .catch((err) => null);

// get all videos in serverSide rendering
export const getAllVideosFunc = async (): Promise<Video[]> =>
  await (await fetch(videoBaseUrl)).json();

export const getVideoFunc = (videoId: string) =>
  axios
    .get(`${videoBaseUrl}/${videoId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
// export const createVideoFunc = ()

export const updateVideoInfoFunc = async (
  videoId: string,
  payload: { title: string; description: string; published: boolean }
) =>
  await (
    await axios.patch(`${videoBaseUrl}/${videoId}`, payload, {
      withCredentials: true,
    })
  ).data;

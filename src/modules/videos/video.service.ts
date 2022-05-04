import { Video, VideoModel } from "./video.model";

export const createVideoFile = async ({ owner }: { owner: string }) =>
  VideoModel.create({ owner });

export const findVideoById = async (videoId: Video["videoId"]) =>
  VideoModel.findOne({ videoId });

export const findAllVideos = async () =>
  VideoModel.find({ published: true }).lean();

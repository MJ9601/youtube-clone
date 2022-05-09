import busboy from "busboy";
import fs from "fs";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Video } from "./video.model";
import { createVideoFile, findAllVideos, findVideoById } from "./video.service";
import { UpdateVideoBody, UpdateVideoParams } from "./video.schema";

type GetPathProps = {
  videoId: Video["videoId"];
  extension: Video["extension"];
};

const VIDEO_MIME_TYPES = ["video/mp4"];
const DEFAULT_CHUNK_SIZE = 1000000; /* 1Mb */

// setting path for saving video files
const getPath = ({ videoId, extension }: GetPathProps) =>
  `${process.cwd()}/videos/${videoId}.${extension}`;

export const uploadVideoHandler = async (req: Request, res: Response) => {
  const bb = busboy({ headers: req.headers });

  // extrect logged in user from cookie using requiringUser middleware func
  const user = res.locals.user;

  // creating video file using createVideoFile func from video.service file
  const video = await createVideoFile({ owner: user._id });

  bb.on("file", async (_, file, info) => {
    // filter the correct type of video file
    if (!VIDEO_MIME_TYPES.includes(info.mimeType))
      return res.status(StatusCodes.BAD_REQUEST).send("Invalid video type!");

    // extrecting and asigning extension to video file and setting path using getPath func
    const extension = info.mimeType.split("/")[1];
    const path = getPath({ videoId: video.videoId, extension });
    video.extension = extension;

    await video.save();

    // creating a write stream for saveing file part by part
    const stream = fs.createWriteStream(path);

    // pipping the stream to file
    file.pipe(stream);
  });

  // after finishing saving file with writeStream; the headers for sending to client is going to set
  bb.on("close", () => {
    res.writeHead(StatusCodes.CREATED, {
      connection: "close",
      "Content-Type": "application/json",
    });

    // file info is written in application/json and they are stringify for sending to client
    res.write(JSON.stringify(video));
    res.end();
  });

  // busboy will pipe to req for sending to client
  return req.pipe(bb);
};

export const updateVideoHandler = async (
  req: Request<UpdateVideoParams, {}, UpdateVideoBody>,
  res: Response
) => {
  const { videoId } = req.params;
  const { title, description, published } = req.body;

  const { _id: userId } = res.locals.user;

  // checking for video existing;
  const video = await findVideoById(videoId);

  if (!video) return res.status(StatusCodes.NOT_FOUND).send("video not found!");

  // checking for rightful owner of video
  if (String(video.owner) !== String(userId))
    return res.status(StatusCodes.UNAUTHORIZED).send("unauthorized!");

  // setting up new parameter that added by video owner
  video.title = title;
  video.description = description;
  video.published = published;

  // save video to the data base
  await video.save();

  // send successful response to client
  return res.status(StatusCodes.OK).send(video);
};

export const streamVideoHandler = async (
  req: Request<UpdateVideoParams, {}, {}>,
  res: Response
) => {
  // reading videoId from req.params
  const { videoId } = req.params;
  // determining of video file existing in database
  const videoFile = await findVideoById(videoId);
  if (!videoFile)
    return res.status(StatusCodes.NOT_FOUND).send("video does not exist!");

  // get path of video file
  const filePath = getPath({
    videoId: videoFile.videoId,
    extension: videoFile.extension,
  });

  // determining of size of video
  const fileSizeInBytes = fs.statSync(filePath).size;

  // checking for range to determine which chunk of file should load for streaming
  const range = req.headers.range;
  if (!range)
    return res.status(StatusCodes.BAD_REQUEST).send("range is required!");

  // setting of start of chunk
  const startOfChunk = Number(range.replace(/\D/g, ""));

  // finding end of chunk
  const endOfChuck = Math.min(
    startOfChunk + DEFAULT_CHUNK_SIZE,
    fileSizeInBytes - 1
  );

  // determining size of chunk that should load for streaming
  const chunkSizeInBytes = endOfChuck - startOfChunk + 1;

  // setting of headers
  const headers = {
    "Content-Range": `bytes ${startOfChunk}-${endOfChuck}/${fileSizeInBytes}`,
    "Accept-Range": "bytes",
    "Content-length": chunkSizeInBytes,
    "Content-Type": `video/${videoFile.extension}`,
    "Cross-Origin-Resource-Policy": "cross-origin",
  };

  // writing header for response
  res.writeHead(StatusCodes.PARTIAL_CONTENT, headers);

  // creating read stream for loading data and sending it to client
  const videoStream = fs.createReadStream(filePath, {
    start: startOfChunk,
    end: endOfChuck,
  });

  // pipe the video stream
  videoStream.pipe(res);
};

export const findVideosHandler = async (_: Request, res: Response) =>
  res.status(StatusCodes.OK).send(await findAllVideos());

export const findVideoInfo = async (
  req: Request<UpdateVideoParams, {}, {}>,
  res: Response
) => res.status(StatusCodes.OK).send(await findVideoById(req.params.videoId));

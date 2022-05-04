import express from "express";
import requiringUser from "../../middleware/requiringUser";
import {
  findVideosHandler,
  streamVideoHandler,
  updateVideoHandler,
  uploadVideoHandler,
} from "./video.controller";

const router = express.Router();

router.post("/", requiringUser, uploadVideoHandler);

router.patch("/:videoId", requiringUser, updateVideoHandler);

router.get("/:videoId",  streamVideoHandler);
router.get("/", findVideosHandler);
export default router;

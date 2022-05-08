import React, { ReactElement } from "react";
import PageLayout from "../../layout/PageLayout";

const Video = () => {
  return <div>Video</div>;
};

Video.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;

export default Video;

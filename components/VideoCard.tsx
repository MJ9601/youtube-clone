import { Text, Card, Center, Group, Stack, Title, Avatar } from "@mantine/core";
import { PlayerPlay } from "tabler-icons-react";
import { Video } from "../typing";

const VideoCard = ({ videoInfo }: { videoInfo: Video }) => {
  return (
    <Card
      shadow="md"
      p="md"
      component="a"
      href={`/videos/${videoInfo.videoId}`}
      target="_blank"
    >
      <Card.Section>
        <Center
          style={{ width: "300px", backgroundColor: "#333", height: "200px" }}
        >
          <PlayerPlay size={66} color="#eee" />
        </Center>
      </Card.Section>
      <Group position="left" py="md" align="flex-start">
        <Avatar radius="xl" color="cyan">
          M
        </Avatar>
        <Stack spacing="xs">
          <Title order={3}>{videoInfo.title}</Title>
          <Text size="md">{videoInfo.description}</Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default VideoCard;

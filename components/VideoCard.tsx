import { Text, Card, Center, Group, Stack, Title, Avatar } from "@mantine/core";
import { PlayerPlay } from "tabler-icons-react";

const VideoCard = () => {
  return (
    <Card shadow="md" p="md" component="a" href={`/videos/id`} target="_blank">
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
          <Title order={3}>video title</Title>
          <Text size="md">video description</Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default VideoCard;

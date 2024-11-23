import { Card, CardBody } from "@chakra-ui/react";

export const Home: React.FC = () => {
  return (
    <div
      className="centered"
      style={{ backgroundSize: "min(65vmax, 600px) auto" }}
    >
      <Card.Root backgroundColor="var(--bg-color)" color="var(--logo-color)">
        <Card.Header textAlign="center">
          Here's a video. Get your stretch on!
        </Card.Header>
        <CardBody width="min(600px, 90vw)">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=MUsmvini5-5eZn_7"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </CardBody>
      </Card.Root>
    </div>
  );
};

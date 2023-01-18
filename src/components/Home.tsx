import { Grid, Card, Text, Col } from "@nextui-org/react";
import Articles from "./Articles";
import { Fade } from "react-awesome-reveal";

export default function Home() {
  return (
    <>
      <Fade duration={300}>
        <Articles />
      </Fade>
      <Grid.Container gap={3} justify="center" id="landing">
        <Grid xs={6}>
          <Card>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                  What to watch
                </Text>
                <Text h4 color="white">
                  Stream the Acme event
                </Text>
              </Col>
            </Card.Header>
            <Card.Image src="https://nextui.org/images/card-example-4.jpeg" objectFit="cover" width="100%" height={340} alt="Card image background" />
          </Card>
        </Grid>

        <Grid xs={6}>
          <Card css={{ w: "100%" }}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                  Plant a tree
                </Text>
                <Text h4 color="white">
                  Contribute to the planet
                </Text>
              </Col>
            </Card.Header>
            <Card.Image src="https://nextui.org/images/card-example-3.jpeg" width="100%" height={340} objectFit="cover" alt="Card image background" />
          </Card>
        </Grid>

        <Grid xs={6}>
          <Card css={{ bg: "$black", w: "100%" }}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                  Supercharged
                </Text>
                <Text h4 color="white">
                  Creates beauty like a beast
                </Text>
              </Col>
            </Card.Header>
            <Card.Image src="https://nextui.org/images/card-example-2.jpeg" width="100%" height={340} objectFit="cover" alt="Card image background" />
          </Card>
        </Grid>

        <Grid xs={3}>
          <Card css={{ w: "100%", h: "400px" }}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                  New
                </Text>
                <Text h3 color="black">
                  Acme camera
                </Text>
              </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              <Card.Image src="https://nextui.org/images/card-example-6.jpeg" width="100%" height="100%" objectFit="cover" alt="Card example background" />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={3}>
          <Card css={{ w: "100%", h: "400px" }}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
                  Your day your way
                </Text>
                <Text h3 color="white">
                  Your checklist for better sleep
                </Text>
              </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              <Card.Image src="https://nextui.org/images/card-example-5.jpeg" objectFit="cover" width="100%" height="100%" alt="Relaxing app background" />
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
}

import { Grid, Button, Card, Row, Text } from "@nextui-org/react";
import { Zoom } from "react-awesome-reveal";

export default function Shop() {
  return (
    <Zoom duration={750} cascade={true}>
      <Text h1>Tickets and Passes</Text>
      <Grid.Container gap={2}>
        <Grid sm={12} md={5}>
          <Card css={{ mw: "350px" }}>
            <Card.Header>
              <Text css={{ margin: "auto" }}>One Day Ticket</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text css={{ margin: "auto" }}>
                You can use this ticket for 24 hours
              </Text>
              <Text css={{ margin: "auto" }}>900 Ft</Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="center">
                <Button shadow size="md" auto color="gradient" id="submit">
                  Add to Cart
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </Zoom>
  );
}

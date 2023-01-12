import React, { useState } from "react";
import { Grid, Button, Container, Card, Row, Text } from "@nextui-org/react";

export default function Shop() {
 
  return (
    <Container >
      <Text h1>Tickets and Passes</Text>
      <Grid.Container gap={2}>
        <Grid sm={12} md={5}>
          <Card css={{ mw: "350px" }}>
            <Card.Header>
              <Text css={{margin: 'auto'}} >One Day Ticket</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text css={{margin: 'auto'}}>You can use this ticket for 24 hours</Text>
              <Text css={{margin: 'auto'}}>900Ft</Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="center">
                <Button shadow size="md" auto color="gradient" rounded id="submit">
                  Add to Cart
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  );
}
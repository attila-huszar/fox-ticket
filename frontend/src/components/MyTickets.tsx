import { Grid, Button, Container, Text } from '@nextui-org/react';

export default function MyTickets() {
  return (
    <Container>
      <h1 style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
        My Tickets
      </h1>
      <Button.Group
        color="gradient"
        ghost
        css={{ width: '100%', justifyContent: 'center', marginBottom: '40px' }}
      >
        <Button
          className="shopTabButton"
          shadow
          size="md"
          color="gradient"
          css={{ button: focus, outline: 'none', width: '100px', zIndex: '0' }}
          id="showAllButton"
          autoFocus
        >
          All
        </Button>
        <Button
          className="shopTabButton"
          shadow
          size="md"
          color="gradient"
          id="ticketsTabButton"
          css={{ width: '100px', zIndex: '0' }}
        >
          Active
        </Button>
        <Button
          shadow
          size="md"
          color="gradient"
          id="passesTabButton"
          className="shopTabButton"
          css={{ width: '100px', zIndex: '0' }}
        >
          Not active
        </Button>
        <Button
          className="shopTabButton"
          shadow
          size="md"
          color="gradient"
          id="ticketsTabButton"
          css={{ width: '100px', zIndex: '0' }}
        >
          Expired
        </Button>
      </Button.Group>
      <Grid.Container style={{ display:'grid', height: '300px', padding:"3%"}}>
        <h2 style={{ textAlign:'center', color: 'var(--nextui-colors-myTicketsSmallHeading)'}}>
          You haven't purchased a ticket/pass yet!
        </h2>
      </Grid.Container>
    </Container>
  );
}

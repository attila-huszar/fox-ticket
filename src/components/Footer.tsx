import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return <footer>{`Copyright © Fox Ticket ${year}`}</footer>;
}

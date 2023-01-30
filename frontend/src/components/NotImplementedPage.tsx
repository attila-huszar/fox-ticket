import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { TbArrowBackUp } from 'react-icons/tb';
import logo from '../static/logo.png';
import { Zoom } from 'react-awesome-reveal';

export default function NotImplementedPage() {
  const navigate = useNavigate();

  return (
    <Zoom duration={500} triggerOnce>
      <h1 style={{ padding: '90px', fontSize: '2rem', textAlign: 'center' }}>
        This page is not implemented yet
      </h1>
      <img
        src={logo}
        style={{ margin: '0 auto 100px', maxWidth: '150px', maxHeight: 'auto' }}
        alt="logo"
      />
      <Button
        style={{ margin: 'auto' }}
        shadow
        size="lg"
        icon={<TbArrowBackUp />}
        auto
        color="gradient"
        onPress={() => navigate(-1)}
      >
        Back
      </Button>
    </Zoom>
  );
}

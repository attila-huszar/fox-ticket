import Articles from './Articles';
import { Fade, Slide } from 'react-awesome-reveal';
import '../styles/Home.css';
import m1 from '../assets/m1a.png';
import Features from './Features';
import CtaSection from './CtaSection';
import AsFeaturedIn from './AsFeaturedIn';

export default function Home() {
  const date = new Date();
  const localDate = date.toLocaleDateString();
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const day = weekday[date.getDay()];

  return (
    <>
      <Fade
        className="title"
        duration={750}
        triggerOnce
        style={{ zIndex: '1' }}
      >
        <h2>
          News
          <p style={{ fontSize: '16' }}>
            <em>
              Budapest, {localDate}, {day}
            </em>
          </p>
        </h2>
      </Fade>
      <Slide className="background" direction="down" duration={500} triggerOnce>
        <div>
          <img
            className="m1"
            src={m1}
            alt="m1 metro"
            style={{ objectFit: 'cover', width: '100vw', height: '450px' }}
          ></img>
        </div>
      </Slide>
      <Fade duration={1000} triggerOnce>
        <Articles />
        <AsFeaturedIn />
        <Features />
        <CtaSection />
      </Fade>
    </>
  );
}

import Articles from './Articles'
import Features from './Features'
import CtaSection from './CtaSection'
import m1 from '@assets/images/m1a.png'
import '@styles/Home.css'

export default function Home() {
  const date = new Date()
  const localDate = date.toLocaleDateString()
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const day = weekday[date.getDay()]

  return (
    <>
      <h2>
        News
        <p style={{ fontSize: '16' }}>
          <em>
            Budapest, {localDate}, {day}
          </em>
        </p>
      </h2>

      <div>
        <img
          className="m1"
          src={m1}
          alt="m1 metro"
          style={{
            objectFit: 'cover',
            width: '100vw',
            height: '450px',
          }}></img>
      </div>

      <Articles />
      <Features />
      <CtaSection />
    </>
  )
}

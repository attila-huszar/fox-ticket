import { Articles } from '../components/Articles'
import { Features } from '../components/Features'
import { CtaSection } from '../components/CtaSection'
import m1 from '@assets/images/m1a.png'

export function Home() {
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
      <p className="text-4xl font-bold">News</p>
      <p>
        Budapest, {localDate}, {day}
      </p>

      <div>
        <img src={m1} alt="m1 metro"></img>
      </div>

      <Articles />
      <Features />
      <CtaSection />
    </>
  )
}

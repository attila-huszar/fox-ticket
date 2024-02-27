import { Image } from '@nextui-org/react'
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
    <main className="px-10 pb-52">
      <p className="text-4xl font-bold">News</p>
      <p>
        Budapest, {localDate}, {day}
      </p>
      <Image src={m1} alt="m1 metro" />
      <Articles />
      <Features />
      <CtaSection />
    </main>
  )
}

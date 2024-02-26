import { TbLeaf } from 'react-icons/tb'
import { BiSupport } from 'react-icons/bi'
import { MdOutlineSavings, MdMobileFriendly } from 'react-icons/md'

export function Features() {
  return (
    <div>
      <div>
        <MdMobileFriendly />
        <p>Always with you!</p>
        <p>
          Because we are on your phone, you can&apos;t leave your ticket/pass at
          home.
        </p>
      </div>
      <div>
        <TbLeaf />
        <p>No waste</p>
        <p>
          Buy tickets, passes from the app <br />
          Save the world!
        </p>
      </div>
      <div>
        <MdOutlineSavings />
        <p>No extra fees</p>
        <p>
          Buy your ticket, pass from your bed <br />
          with no hidden fees.
        </p>
      </div>
      <div>
        <BiSupport />
        <p>24/7 support</p>
        <p>
          Is there any problem with your ticket/pass? <br />
          Get in touch with us!
        </p>
      </div>
    </div>
  )
}

import logo from '@assets/images/logo.png'
import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandTwitter,
  TbBrandTiktok,
} from 'react-icons/tb'

export function Footer() {
  return (
    <footer className="absolute bottom-0 flex w-full justify-between">
      <div>
        <div className="size-8">
          <img src={logo} alt="logo" />
        </div>
        <ul>
          <li>
            <a href="">
              <TbBrandFacebook />
            </a>
          </li>
          <li>
            <a href="">
              <TbBrandInstagram />
            </a>
          </li>
          <li>
            <a href="">
              <TbBrandTwitter />
            </a>
          </li>
          <li>
            <a href="">
              <TbBrandTiktok />
            </a>
          </li>
        </ul>
        <p className="copyright">
          Copyright © {new Date().getFullYear()} FoxTicket.
        </p>
      </div>
      <div>
        <p> Contact us</p>
        <address>
          <p>
            1062 Budapest, <br />
            Andrassy Street 66.
            <br /> 3rd Floor
          </p>
          <p>0630 123 4567</p>
          <p>hello@foxticket.com</p>
        </address>
      </div>
      <div>
        <p>Account</p>
        <ul>
          <li>
            <a href="">Create account</a>
          </li>
          <li>
            <a href="">Sign in</a>
          </li>
          <li>
            <a href="">iOS app</a>
          </li>
          <li>
            <a href="">Android app</a>
          </li>
        </ul>
      </div>
      <div>
        <p>Company</p>
        <ul>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">For Business</a>
          </li>
          <li>
            <a href="">Sales Partners</a>
          </li>
          <li>
            <a href="">Careers</a>
          </li>
        </ul>
      </div>
      <div>
        <p>Resources</p>
        <ul>
          <li>
            <a href="">FAQ</a>
          </li>
          <li>
            <a href="">Travel Information</a>
          </li>
          <li>
            <a href="">Help Center</a>
          </li>
          <li>
            <a href="">Privacy & terms</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

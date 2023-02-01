import logo from '../static/logo.png';
import { TbBrandFacebook, TbBrandInstagram, TbBrandTwitter, TbBrandTiktok} from "react-icons/tb"
import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
      <>
      <footer className="footer">
        <div className="containerGridForFooter">
          <div className="logoColumn">
          <a href="/"><img src={logo} alt="logo" style={{ width: '100px', height: 'auto' }} className="footerLogo" /></a>
          <ul className="socialLinks">
            <li><a href="" className="footerLink"><TbBrandFacebook  className='socialIcon'/></a></li>
            <li><a href="" className="footerLink"><TbBrandInstagram className='socialIcon'  /></a></li>
            <li><a href="" className="footerLink"><TbBrandTwitter className='socialIcon' /></a></li>
            <li><a href="" className="footerLink"><TbBrandTiktok className='socialIcon'/></a></li>
          </ul>
            <p className='copyright'>Copyright ©  {year} by Virides Caelestes. <br/>All rights reserved.</p>
          </div>
          <div className="addressColumn">
            <p className='footerHeader'> Contact us</p>
            <address className='contacts'>
              <p>1062 Budapest, <br/>Andrassy Street 66.<br/> 3rd Floor
              </p>
              <p>0630 123 4567</p>
              <p>hello@foxticket.com</p>
            </address>  
            </div>
          <nav className="navCol">
            <p className='footerHeader'>Account</p>
            <ul className="footerNav">
              <li><a className="footerLink" href="">Create account</a></li>
              <li><a className="footerLink" href="">Sign in</a></li>
              <li><a className="footerLink" href="">iOS app</a></li>
              <li><a className="footerLink" href="">Android app</a></li>
            </ul>
            </nav>
            <nav className="navCol">
            <p className='footerHeader'>Company</p>
            <ul className="footerNav">
              <li><a className="footerLink" href="">About Virides Caelestes</a></li>
              <li><a className="footerLink" href="">For Business</a></li>
              <li><a className="footerLink" href="">Sales Partners</a></li>
              <li><a className="footerLink" href="">Careers</a></li>
            </ul>
            </nav>
            <nav className="navCol">
            <p className='footerHeader'>Resources</p>
            <ul className="footerNav">
              <li><a className="footerLink" href="">FAQ</a></li>
              <li><a className="footerLink" href="">Travel Informations</a></li>
              <li><a className="footerLink" href="">Help Center</a></li>
              <li><a className="footerLink" href="">Privacy & terms</a></li>
            </ul>
            </nav>
        </div>
      </footer>
    </>
  )
}

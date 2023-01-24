import { Link } from 'react-router-dom';
import logo from '../static/logo.png';
import '../styles/Footer.css';
import Home from './Home';

export default function Footer() {
  const year = new Date().getFullYear();

  // return <footer>{`Copyright © Fox Ticket ${year}`}</footer>;

  return (
    <button>Hello</button>
    <footer className="footer">
      <div className="containerGridForFooter">
        <div className="logoColumn">
          <img src={logo} alt="logo" style={{ width: '100px', height: 'auto' }} className="footerLogo" />
          <p className='copyright'>{`Copyright ©  ${year} by Virides Caelestes. All rights reserved.`}</p>
          </div>
        <div className="addressColumn">
          <p className='footerHeading'> Contact us</p>
          <address className='contacts'> 
            <p>1062 Budapest, Andrassy Street   66. 3rd Floor
            </p>
            <p>0630 123 4567</p>
            <p>hello@foxticket.com</p>
            <p>
            
            </p>
            </address>  </div>
        <div className="navCol">Nav 1</div>
        <div className="navCol">Nav 2</div>
        <div className="navCol">Nav 3</div>
      </div>
    </footer>
  )
}

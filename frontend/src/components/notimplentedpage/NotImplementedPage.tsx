import { useNavigate } from 'react-router-dom';
import "./NotImplementedPage.scss"

export default function NotImplementedPage() {

  const navigate = useNavigate();

  const routeChange = () => {
    const path = "/";
    navigate(path);
  }

  return (
    <div className="NotImplementedPage">
      <div className='notImplemented-body'>
        <h1>This page is not implemented yet!</h1>
        <button type='submit' onClick={routeChange} id='goHomeButton' className="button">Go Home</button>
      </div>
    </div>
  );
}

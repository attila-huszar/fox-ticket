import { useNavigate } from 'react-router-dom';

export default function NotImplementedPage() {

  const navigate = useNavigate();

  const routeChange = () => {
    const path = "/";
    navigate(path);
  }

  return (
        <div className="NotImplementedPage">
          <header className="notImplemented-header">
            <h1>This page is not implented yet!</h1>
              <button type='submit' onClick={routeChange} id='goHomeButton'>Go Home</button>
          </header>
        </div>
  );
}

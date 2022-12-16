import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from './landing/Landing';
import NotImplementedPage from './notimplentedpage/NotImplementedPage';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<NotImplementedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

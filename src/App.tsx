import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TitanAIPage from './pages/TitanAIPage';
import MediaAdmin from './pages/MediaAdmin';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<TitanAIPage />} />
        <Route path="/admin/media" element={<MediaAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

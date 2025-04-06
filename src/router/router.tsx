import Page from '@/pages/Page';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />
      </Routes>
    </Router>
  );
}

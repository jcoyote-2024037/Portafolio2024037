import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import CinematicIntro from './components/CinematicIntro/CinematicIntro';

const HomePage = lazy(() => import('./pages/HomePage'));
const StackPage = lazy(() => import('./pages/StackPage'));
const TrayectoriaPage = lazy(() => import('./pages/TrayectoriaPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const StatsPage = lazy(() => import('./pages/StatsPage'));

function PageFallback() {
  return (
    <div className="section-base flex items-center justify-center" style={{ minHeight: '60vh' }}>
      <div className="loading-symbol" style={{ width: '32px', height: '32px' }}>
        <span style={{ fontSize: '12px' }}>P</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CinematicIntro>
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="stack" element={<StackPage />} />
              <Route path="trayectoria" element={<TrayectoriaPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="stats" element={<StatsPage />} />
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CinematicIntro>
  );
}

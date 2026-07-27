import { lazy, Suspense, Component } from 'react';
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

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="section-base flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
          <p className="body-text text-text-secondary mb-4">Algo salio mal. Intenta de nuevo.</p>
          <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
            className="glass rounded-sm border border-gold/20 hover:border-gold/40 text-gold/70 hover:text-gold transition-all duration-300 caption"
            style={{ padding: '0.75rem 2rem' }}>
            Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <CinematicIntro>
      <BrowserRouter>
        <ErrorBoundary>
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
        </ErrorBoundary>
      </BrowserRouter>
    </CinematicIntro>
  );
}

import { BrowserRouter, Route, Routes } from 'react-router'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { FavoritesProvider } from './context/FavoritesContext'
import { ToastProvider } from './context/ToastContext'
import ContactPage from './pages/ContactPage'
import DetailPage from './pages/DetailPage'
import ExplorePage from './pages/ExplorePage'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <ToastProvider>
      {/* Los favoritos viven por encima de las rutas para persistir al navegar */}
      <FavoritesProvider>
        <BrowserRouter>
          <div className="flex min-h-screen flex-col bg-space">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explorar" element={<ExplorePage />} />
                <Route path="/explorar/:id" element={<DetailPage />} />
                <Route path="/favoritos" element={<FavoritesPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </ToastProvider>
  )
}

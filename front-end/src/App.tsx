import { BrowserRouter, NavLink, Routes, Route } from 'react-router'
import { Homepage } from './components/Homepage'
import { CustomersList } from './components/CustomersList'
import { CarsList } from './components/CarsList'

function App() {
  return (
    <BrowserRouter>
      <header className="bg-dark text-white py-3">
        <div className="container">
          <h1 className="h4 mb-0">Karangos &bull; boutique de carros antigos</h1>
        </div>
      </header>

      <nav className="bg-light border-bottom py-2">
        <div className="container">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>
                Início
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/customers" className="nav-link">
                Clientes
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/cars" className="nav-link">
                Veículos
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/customers" element={<CustomersList />} />

          <Route path="/cars" element={<CarsList />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
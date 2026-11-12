import { BrowserRouter, NavLink, Routes, Route } from "react-router";
import { CustomersList } from "./components/CustomersList";

function App() {
  return (
    <BrowserRouter>
      <header className="bg-dark text-white py-3">
        <div className="container">
          <h1 className="h4 mb-0">
            Karangos &bull; boutique de carros antigos
          </h1>
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
          </ul>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2 className="h5 mb-3">Início</h2>
                <p>Selecione uma opção no menu de navegação.</p>
              </>
            }
          />

          <Route
            path="/customers"
            element={
              <>
                <h2 className="h5 mb-3">Clientes</h2>
                <div className="text-secondary">
                  <CustomersList />
                </div>
              </>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

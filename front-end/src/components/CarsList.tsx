
import { Link } from "react-router";

export function CarsList() {
  return (
    <>
      <h2 className="h2 mb-3">Listagem de Veículos</h2>

      <p className="text-secondary">
        A listagem de veículos aparecerá aqui.
      </p>

      <div className="text-end mb-3">
        <Link to="/cars/new" className="btn btn-outline-primary">
          Novo veículo
        </Link>
      </div>
    </>
  );
}

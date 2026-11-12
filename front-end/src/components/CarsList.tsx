import { useState, useEffect } from "react";
import { Link } from "react-router";

type Car = {
  id: number;
  brand: string;
  model: string;
  color: string;
  year_manufacture: number;
  imported: boolean;
  plates: string;
  selling_date: string | null;
  selling_price: number | string | null;
  customer_id: number | null;
};

export function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    const apiHost = import.meta.env.VITE_API_BASE;

    try {
      const response = await fetch(`${apiHost}/cars`);

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const data: Car[] = await response.json();

      setCars(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function formatPrice(price: number | string | null) {
    if (price === null || price === "") {
      return "Não vendido";
    }

    const value = Number(price);

    if (!Number.isFinite(value)) {
      return "—";
    }

    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatDate(date: string | null) {
    if (!date) {
      return "—";
    }

    const [year, month, day] = date.slice(0, 10).split("-");
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <h2 className="h2 mb-3">Listagem de Veículos</h2>

      <p className="text-secondary">Total de veículos: {cars.length}</p>

      <div className="text-end mb-3">
        <Link to="/cars/new" className="btn btn-outline-primary">
          Novo veículo
        </Link>
      </div>

      {loading && <p className="text-secondary">Carregando veículos...</p>}

      {error && (
        <div className="alert alert-danger">
          Erro ao carregar veículos: {error}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Cor</th>
              <th scope="col">Ano</th>
              <th scope="col">Importado</th>
              <th scope="col">Placa</th>
              <th scope="col">Data da venda</th>
              <th scope="col">Preço de venda</th>
              <th scope="col">Cliente</th>
              <th scope="col" className="text-end">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.color}</td>
                <td>{car.year_manufacture}</td>
                <td>{car.imported ? "Sim" : "Não"}</td>
                <td>{car.plates}</td>
                <td>{formatDate(car.selling_date)}</td>
                <td>{formatPrice(car.selling_price)}</td>
                <td>
                  {car.customer_id !== null
                    ? `Cliente #${car.customer_id}`
                    : "Não vendido"}
                </td>
                <td className="text-end">
                  <Link
                    to={`/cars/${car.id}`}
                    className="btn btn-outline-primary"
                    aria-label={`Editar veículo ${car.brand} ${car.model}`}
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}

            {!loading && !error && cars.length === 0 && (
              <tr>
                <td colSpan={11} className="text-center text-secondary">
                  Nenhum veículo cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

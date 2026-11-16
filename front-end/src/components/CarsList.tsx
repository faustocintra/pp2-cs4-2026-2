import { useState, useEffect } from "react";
import type { Car } from "../types/Car";
import { Link } from "react-router";

export function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);

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
      if (error instanceof Error) {
        window.alert("ERRO: " + error.message);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 className="h2 mb-3">Listagem de veículos</h2>

      <p className="text-secondary">Total de veículos: {cars.length}</p>

      <div className="text-end mb-3">
        <Link to={`/cars/new`} className="btn btn-outline-primary">
          Novo veículo
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr className="text-center">
              <th scope="col">Código</th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Cor</th>
              <th scope="col">Placa</th>
              <th scope="col">Preço de venda</th>
              <th scope="col">Comprador</th>
              <th scope="col" className="text-center">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car) => (
              <tr className="text-center" key={car.id}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.color}</td>
                <td>{car.plates}</td>
                <td>{car.selling_price}</td>
                <td>{car.customer_id}</td>
                <td className="text-end">
                  <Link
                    to={`/cars/${car.id}`}
                    className="btn btn-outline-primary"
                    aria-label={`Editar veículo ${car.id}`}
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}

            {cars.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-secondary">
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

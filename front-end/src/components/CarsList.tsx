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
      <h2 className="h2 mb-3">Listagem de Veículos</h2>

      <p className="text-secondary">Total de veículos: {cars.length}</p>

      <div className="text-end mb-3">
        <Link to="/cars/new" className="btn btn-outline-primary">
          Novo veículo
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Cor</th>
              <th scope="col">Ano</th>
              <th scope="col">Placas</th>
              <th scope="col">Importado</th>
              <th scope="col">Data da venda</th>
              <th scope="col">Preço de venda</th>
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
                <td>{car.plates}</td>
                <td>{car.imported ? "Sim" : "Não"}</td>
                <td>
                  {car.selling_date
                    ? new Date(car.selling_date).toLocaleDateString("pt-BR", {
                        timeZone: "UTC",
                      })
                    : "—"}
                </td>
                <td>
                 {car.selling_price != null
                    ? Number(car.selling_price).toLocaleString("pt-BR", {
                      style: "currency",
                       currency: "BRL",
                      })
                     : "—"}
                  </td>
                <td className="text-end">
                  <Link
                    to={`/cars/${car.id}`}
                    className="btn btn-outline-primary"
                    aria-label={`Editar veículo ${car.model}`}
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}

            {cars.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center text-secondary">
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
import type { Car } from "../types/Car";
import { useState, useEffect } from "react";
import { Link } from "react-router";

const API_URL = `${import.meta.env.VITE_API_BASE}/cars`;

export function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);

  async function fetchData() {
    try {
      const response = await fetch(API_URL);

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

  // Executa a busca quando o componente é carregado.
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
              <th>Código</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Ano</th>
              <th>Cor</th>
              <th>Placa</th>
              <th>Importado</th>
              <th>Proprietário</th>
              <th className="text-end">Ações</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year_manufacture}</td>
                <td>{car.color}</td>
                <td>{car.plates}</td>
                <td>{car.imported ? "Sim" : "Não"}</td>
                <td>{car.customer?.name ?? "Sem proprietário"}</td>

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

            {cars.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-secondary">
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

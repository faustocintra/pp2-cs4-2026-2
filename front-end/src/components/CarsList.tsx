import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { Car } from "../types/Car"

export function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);

  async function fetchData() {
    const apiHost = import.meta.env.VITE_API_BASE;

    try {
      const response = await fetch(`${apiHost}/cars`);

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`)
      }

      const data: Car[] = await response.json();

      setCars(data);
    } catch (error){
      if(error instanceof Error){
        window.alert("ERRO: " + error.message)
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

 return (
   <>
     <h2 className="h2 mb-3">Listagem de Veículos</h2>

    <p className="text-secondary">Total de carros: {cars.length}</p>


     <div className="text-end mb-3">
        <Link to={`/cars/new`} className="btn btn-outline-primary">
          Novo carro
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
              <th scope="col">Importado</th>
              <th scope="col">Placa</th>
              <th scope="col">Data de Venda</th>
              <th scope="col">Preço</th>
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
                <td>{car.selling_date}</td>
                <td>{car.selling_price}</td>
                <td className="text-end">
                  <Link
                    to={`/cars/${car.id}`}
                    className="btn btn-outline-primary"
                    aria-label={`Editar cliente ${car.plates}`}
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}

            {cars.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-secondary">
                  Nenhum carro cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
   </>
 )
}

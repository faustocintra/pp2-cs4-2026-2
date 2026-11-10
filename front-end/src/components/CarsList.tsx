import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Car } from '../types/Car'

export function CarsList() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCars() {
      try {
        const apiBase = import.meta.env.VITE_API_BASE ?? '/api'
        const response = await fetch(`${apiBase}/cars`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`A API respondeu com status ${response.status}.`)
        }

        const data: unknown = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('A resposta da API não contém uma lista de veículos.')
        }

        setCars(data as Car[])
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : 'Não foi possível carregar os veículos.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void fetchCars()

    return () => controller.abort()
  }, [])

  return (
    <>
      <h2 className="h2 mb-3">Listagem de Veículos</h2>

      <p className="text-secondary">Total de veículos: {cars.length}</p>

      <div className="text-end mb-3">
        <Link to={`/cars/new`} className="btn btn-outline-primary">
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
              <th scope="col">Data da Venda</th>
              <th scope="col">Preço de Venda</th>
              <th scope="col">Cliente</th>
              <th scope="col" className="text-end">Ações</th>
            </tr>
          </thead>

          <tbody>
            {cars.map(car => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.color}</td>
                <td>{car.year_manufacture}</td>
                <td>{car.plates}</td>
                <td>{car.imported ? 'Sim' : 'Não'}</td>
                <td>
                  {car.selling_date
                    ? new Date(car.selling_date).toLocaleDateString('pt-BR')
                    : '—'}
                </td>
                <td>
                  {car.selling_price != null
                    ? car.selling_price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })
                    : '—'}
                </td>
                <td>{car.customer_id ?? '—'}</td>
                <td className="text-end">
                  <Link
                    to={`/cars/${car.id}`}
                    className="btn btn-sm btn-outline-secondary"
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

      {loading && <p role="status">Carregando veículos...</p>}
      {error && (
        <p className="text-danger" role="alert">
          Erro ao carregar veículos: {error}
        </p>
      )}
    </>
  )
}
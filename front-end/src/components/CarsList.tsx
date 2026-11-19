import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import type { Car } from '../types/Car'

const API_BASE = import.meta.env.VITE_API_BASE

function formatDate(dateString: string | null) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

function formatPrice(price: string | number | null) {
  if (price === null || price === undefined || price === '') return '—'
  return Number(price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function CarsList() {
  const [cars, setCars] = useState<Car[]>([])

  async function fetchData() {
    try {
      const response = await fetch(`${API_BASE}/cars`)
      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`)
      }
      const data: Car[] = await response.json()
      setCars(data)
    } catch (error) {
      if (error instanceof Error) {
        window.alert('ERRO: ' + error.message)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h2 className="h2 mb-3">Listagem de Veículos</h2>
      <p className="text-secondary">
        Total de veículos: {cars.length}
      </p>

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
              <th scope="col">Importado</th>
              <th scope="col">Placas</th>
              <th scope="col">Data venda</th>
              <th scope="col">Preço venda</th>
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
                <td>{car.imported ? 'Sim' : 'Não'}</td>
                <td>{car.plates}</td>
                <td>{formatDate(car.selling_date)}</td>
                <td>{formatPrice(car.selling_price)}</td>
                <td>{car.customer?.name ?? (car.customer_id ? `#${car.customer_id}` : 'Disponível')}</td>
                <td className="text-end text-nowrap">
                  <Link
                    to={`/cars/${car.id}`}
                    className="btn btn-outline-primary btn-sm me-2"
                    aria-label={`Editar veículo ${car.brand} ${car.model}`}
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}

            {cars.length === 0 && (
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
  )
}
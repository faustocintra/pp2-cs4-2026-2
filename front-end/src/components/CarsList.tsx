import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Car } from '../types/Cars'
import type { Customer } from '../types/Customers'

const API_BASE = import.meta.env.VITE_API_BASE

// Formata a data no padrão brasileiro (dd/mm/aaaa), sem
// deslocamento de fuso horário
function formatDate(value: string | null) {
  if (!value) return '—'
  const [year, month, day] = value.slice(0, 10).split('-')
  return `${day}/${month}/${year}`
}

// Formata o preço como moeda brasileira (R$)
function formatPrice(value: string | number | null) {
  if (value === null || value === '') return '—'
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function CarsList() {
  const [cars, setCars] = useState<Car[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      try {
        // Busca os veículos e os clientes ao mesmo tempo. Os clientes
        // são usados para mostrar o nome do comprador de cada veículo.
        const [carsResponse, customersResponse] = await Promise.all([
          fetch(`${API_BASE}/cars`, { signal: controller.signal }),
          fetch(`${API_BASE}/customers`, { signal: controller.signal }),
        ])

        if (!carsResponse.ok || !customersResponse.ok) {
          throw new Error('Failed to fetch')
        }

        const carsData: Car[] = await carsResponse.json()
        const customersData: Customer[] = await customersResponse.json()

        setCars(carsData)
        setCustomers(customersData)
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        const message = error instanceof Error ? error.message : String(error)
        window.alert(`ERRO: ${message}`)
      }
    }

    void fetchData()

    return () => controller.abort()
  }, [])

  // Retorna o nome do cliente comprador a partir do seu id
  function getCustomerName(customerId: number | null) {
    if (customerId === null) return '—'
    const customer = customers.find(c => c.id === customerId)
    return customer ? customer.name : `Cliente ${customerId}`
  }

  return (
    <>
      <h2 className="h2 mb-3">Listagem de Veículos</h2>

      <p className="text-secondary">
        Total de veículos: {cars.length}
      </p>

      <div className="text-end mb-3">
        <Link
          to={`/cars/new`}
          className="btn btn-outline-primary"
        >
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
              <th scope="col">Comprador</th>
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
                <td>{formatDate(car.selling_date)}</td>
                <td>{formatPrice(car.selling_price)}</td>
                <td>{getCustomerName(car.customer_id)}</td>
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

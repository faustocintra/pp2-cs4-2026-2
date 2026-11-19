
import { useState, useEffect } from 'react'
import type { Car } from '../types/Car'
import type { Customer } from '../types/Customer'
import { Link } from 'react-router'

export function CarsList() {
  const [cars, setCars] = useState<Car[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])

  async function fetchData() {
    const apiHost = import.meta.env.VITE_API_BASE

    try {
      // Busca os veículos e os clientes
      const [carsResponse, customersResponse] = await Promise.all([
        fetch(`${apiHost}/cars`),
        fetch(`${apiHost}/customers`)
      ])

      if (!carsResponse.ok) {
        throw new Error(`Erro HTTP ${carsResponse.status} ao buscar veículos`)
      }

      if (!customersResponse.ok) {
        throw new Error(`Erro HTTP ${customersResponse.status} ao buscar clientes`)
      }

      const carsData: Car[] = await carsResponse.json()
      const customersData: Customer[] = await customersResponse.json()

      setCars(carsData)
      setCustomers(customersData)
    }
    catch (error) {
      if (error instanceof Error) {
        window.alert('ERRO: ' + error.message)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Localiza o nome do cliente que comprou o veículo
  function getCustomerName(customerId: number | null) {
    if (customerId == null) {
      return 'Não vendido'
    }

    const customer = customers.find(
      customer => customer.id === customerId
    )

    return customer?.name ?? 'Cliente não encontrado'
  }

  // Formata o preço em reais
  function formatPrice(price: number | null) {
    if (price == null) return '-'

    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  // Formata a data da venda
  function formatDate(date: string | null) {
    if (!date) return '-'

    return date.slice(0, 10).split('-').reverse().join('/')
  }

  return (
    <>
      <h2 className="h2 mb-3">
        Listagem de Veículos
      </h2>

      <p className="text-secondary">
        Total de veículos: {cars.length}
      </p>

      <div className="text-end mb-3">
        <Link
          to="/cars/new"
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
              <th scope="col">Placa</th>
              <th scope="col">Importado</th>
              <th scope="col">Data da venda</th>
              <th scope="col">Preço de venda</th>
              <th scope="col">Comprador</th>
              <th scope="col" className="text-end">
                Ações
              </th>
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

                {/* Veículo importado */}
                <td>{car.imported ? 'Sim' : 'Não'}</td>

                {/* Data da venda */}
                <td>{formatDate(car.selling_date)}</td>

                {/* Preço de venda */}
                <td>{formatPrice(car.selling_price)}</td>

                {/* Cliente comprador */}
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
                <td
                  colSpan={11}
                  className="text-center text-secondary"
                >
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

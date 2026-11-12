import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import type { Car } from '../types/Car'
import type { Customer } from '../types/Customer'

export function CarsList() {

  const [cars, setCars] = useState<Car[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])

  async function fetchData() {
    const apiHost = import.meta.env.VITE_API_BASE

    try {
      // Busca veículos e clientes ao mesmo tempo. Os clientes são
      // necessários para exibir o nome do comprador na tabela.
      const [carsResponse, customersResponse] = await Promise.all([
        fetch(`${apiHost}/cars`),
        fetch(`${apiHost}/customers`),
      ])

      if (!carsResponse.ok) {
        throw new Error(`Erro HTTP ${carsResponse.status}`)
      }
      if (!customersResponse.ok) {
        throw new Error(`Erro HTTP ${customersResponse.status}`)
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

  useEffect(() => { fetchData() }, [])

  // Retorna o nome do comprador a partir do customer_id
  function getCustomerName(customerId: number | null) {
    if (customerId === null) return '—'
    const customer = customers.find(c => c.id === customerId)
    return customer ? customer.name : '—'
  }

  // Converte "2026-11-12T00:00:00.000Z" em "12/11/2026" sem
  // sofrer deslocamento de fuso horário
  function formatDate(date: string | null) {
    if (!date) return '—'
    const [year, month, day] = date.slice(0, 10).split('-')
    return `${day}/${month}/${year}`
  }

  function formatPrice(price: number | null) {
    if (price === null || price === undefined) return '—'
    return Number(price).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

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
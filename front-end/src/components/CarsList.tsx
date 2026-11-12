
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

type Car = {
  id: number
  brand: string
  model: string
  color: string
  year_manufacture: number
  imported: boolean
  plates: string
  selling_date: string | null
  selling_price: string | number | null
  customer_id: number | null
}

const API_BASE = import.meta.env.VITE_API_BASE

export function CarsList() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${API_BASE}/cars`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status}`)
        }

        const data: Car[] = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Resposta inválida da API.')
        }

        setCars(data)
      } catch (err) {
        if (controller.signal.aborted) return

        const message =
          err instanceof Error
            ? err.message
            : 'Erro desconhecido.'

        setError(message)
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [])

  function formatPrice(value: string | number | null) {
    if (value === null) return '—'

    const price = Number(value)

    if (!Number.isFinite(price)) return '—'

    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  function formatDate(value: string | null) {
    if (!value) return '—'

    const date = value.slice(0, 10)
    const [year, month, day] = date.split('-')

    if (!year || !month || !day) return '—'

    return `${day}/${month}/${year}`
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

      {loading && (
        <p role="status">
          Carregando veículos...
        </p>
      )}

      {error && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          Não foi possível carregar os veículos.
          {' '}
          {error}
        </div>
      )}

      {!loading && !error && (
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
                <th scope="col">Data da venda</th>
                <th scope="col">Preço de venda</th>
                <th scope="col">Cliente</th>
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
                  <td>
                    {car.imported ? 'Sim' : 'Não'}
                  </td>
                  <td>{car.plates}</td>
                  <td>
                    {formatDate(car.selling_date)}
                  </td>
                  <td>
                    {formatPrice(car.selling_price)}
                  </td>
                  <td>
                    {car.customer_id ?? '—'}
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
      )}
    </>
  )
}

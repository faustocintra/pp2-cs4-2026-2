import { useState, useEffect } from 'react'
import type { Customer } from '../types/Customer'
import { Link } from 'react-router'

export function CustomersList() {

  const [customers, setCustomers] = useState<Customer[]>([])

  // Busca os clientes no back-end
  async function fetchData() {
    const apiHost = import.meta.env.VITE_API_BASE

    try {
      const response = await fetch(`${apiHost}/customers`)

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`)
      }

      const data: Customer[] = await response.json()

      setCustomers(data)
    }
    catch (error) {
      if (error instanceof Error) {
        window.alert('ERRO: ' + error.message)
      }
    }
  }

  // Executa fetchData() uma vez, quando o componente é carregado
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h2 className="h2 mb-3">Listagem de Clientes</h2>

      <p className="text-secondary">
        Total de clientes: {customers.length}
      </p>

      <div className="text-end mb-3">
        <Link
          to="/customers/new"
          className="btn btn-outline-primary"
        >
          Novo cliente
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nome</th>
              <th scope="col">CPF</th>
              <th scope="col">E-mail</th>
              <th scope="col">Telefone</th>
              <th scope="col">Município</th>
              <th scope="col">UF</th>
              <th scope="col" className="text-end">Ações</th>
            </tr>
          </thead>

          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.ident_document}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.municipality}</td>
                <td>{customer.state}</td>
                <td className="text-end">
                  <Link
                    to={`/customers/${customer.id}`}
                    className="btn btn-outline-primary"
                    aria-label={`Editar cliente ${customer.name}`}
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}

            {customers.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-secondary">
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
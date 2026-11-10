import { useEffect, useState } from 'react'
import type { Customer } from '../types/Customer'
import { Link } from 'react-router'

export function CustomersList() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCustomers() {
      try {
        const apiBase = import.meta.env.VITE_API_BASE ?? '/api'
        const response = await fetch(`${apiBase}/customers`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`A API respondeu com status ${response.status}.`)
        }

        const data: unknown = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('A resposta da API não contém uma lista de clientes.')
        }

        setCustomers(data as Customer[])
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : 'Não foi possível carregar os clientes.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void fetchCustomers()

    return () => controller.abort()
  }, [])

  return (
    <>
    <h2 className="h2 mb-3">Listagem de Clientes</h2>
    
      <p className="text-secondary">Total de clientes: {customers.length}

      </p>
    <div className="text-end mb-3">
       <Link
         to={`/customers/new`}
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
                
              </tr>
            ))}

            {!loading && !error && customers.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-secondary">
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {loading && <p role="status">Carregando clientes...</p>}
      {error && (
        <p className="text-danger" role="alert">
          Erro ao carregar clientes: {error}
        </p>
      )}
    </>
  )
}

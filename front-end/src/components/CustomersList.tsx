import { useEffect, useState } from 'react'
import type { Customer } from '../types/Customers'

export function CustomersList() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8899/customers', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to fetch')
        }

        const data: Customer[] = await response.json()
        setCustomers(data)
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

  return (
    <>
      <p className="text-secondary">
        Total de clientes: {customers.length}
      </p>

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
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
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

            {customers.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-secondary">
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

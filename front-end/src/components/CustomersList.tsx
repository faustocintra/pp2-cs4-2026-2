import { useState, useEffect } from 'react'
import type { Customer } from '../types/Customer'

type CustomerListProps = {
  list?: Customer[]
}

export function CustomersList() {

  const [customers, setCustomers] = useState<Customer[]>([])

  // Esta função está marcada com `async` porque, dentro dela,
  // há uma ou mais instruções assíncronas, isto é, que podem
  // ser executadas fora da ordem esperada, devido, por exemplo,
  // à espera da resposta de um servidor remoto.
  async function fetchData() {
    // Obtém o endereço do servidor de back-end a partir
    // da variável de ambiente VITE_API_BASE configurada
    // no arquivo .env.local
    const apiHost = import.meta.env.VITE_API_BASE

    try {
      // Aqui, é onde acontece a chamada ao back-end. A palavra-chave
      // `await` na frente de fetch() indica que esta é uma instrução
      // assíncrona, e `await` garante que a execução do código não
      // prosseguirá enquanto uma resposta do servidor remoto (ou um
      // erro) for recebido.
      // Para usar `await` em uma função, é necessário marcá-la como
      // `async` na declaração. Essas duas palavras-chave (`async` e
      // `await` SEMPRE andam juntas. 
      const response = await fetch(`${apiHost}/customers`)

      // Aqui já tivemos uma resposta do servidor, e verificamos se ela
      // não contém erro
      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`)
      }

      // Mais uma instrução assíncrona (`await`), desta vez para extrair
      // os dados em formato JSON a partir da resposta recebida
      const data: Customer[] = await response.json()

      // Se tudo ocorreu bem até aqui, atualizamos a variável de estado
      // `customers` com os dados recebidos, usando a função `set`
      // correspondente
      setCustomers(data)

    }
    // Se algo der errado dentro do bloco `try` (como, por exemplo, falta
    // de conectividade com o servidor de back-end), o bloco `catch` é
    // executado
    catch (error) {
      if (error instanceof Error) {
        window.alert('ERRO: ' + error.message)
      }
    }
  }

  // Hook useEffect()
  // UM DETALHE EXTREMAMENTE IMPORTANTE é o vetor vazio ([]) no
  // segundo parâmetro. Ele é chamado VETOR DE DEPENDÊNCIAS. O vetor
  // vazio, neste caso, indica que o useEffect() deverá ser
  // executado apenas uma vez, quando o componente estiver sendo
  // carregado na tela, para chamar fetchData().
  useEffect(() => {
    fetchData()
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
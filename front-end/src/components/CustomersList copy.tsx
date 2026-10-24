import { useState, useEffect } from 'react'
import type { Customer } from '../types/Customer'

export function CustomersList() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

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
        // Se não conseguir obter o endereço do servidor de 
        // back-end, gera um erro
        if (!apiHost) {
          throw new Error('A variável VITE_API_BASE não foi configurada.')
        }

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
          throw new Error(
            `Não foi possível carregar os clientes. HTTP ${response.status}`
          )
        }

        // Mais uma instrução assíncrona (`await`), desta vez para extrair
        // os dados em formato JSON a partir da resposta recebida
        const data: Customer[] = await response.json()

        // Se tudo ocorreu bem até aqui, atualizamos a variável de estado
        // `customers` com os dados recebidos.
        // Note que, para atualizar `customers`, não é usado o operador de 
        // atribuição (`customers = data`), e sim a função setCustomers, que
        // é fornecida pelo `useState()` ao criar a variável de estado.
        // Usar a função própria para atualizar a variável de estado garante
        // que o React seja avisado ("reaja") da mudança e providencie a
        // atualização da interface
        if (!ignore) {
          setCustomers(data)
        }
        // Se algo der errado dentro do bloco `try` (como, por exemplo, falta
        // de conectividade com o servidor de back-end), o bloco `catch` é
        // executado
      }
      catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error
              ? error.message
              : 'Ocorreu um erro desconhecido.'
          )
        }
      }
      // O bloco `finally` sempre é executado, tanto em caso de sucesso quanto
      // em caso de erro
      finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    // Chamada 
    fetchData()

    return () => {
      ignore = true
    }
  }, [])

  if (loading) {
    return (
      <p className="text-secondary" role="status">
        Carregando clientes...
      </p>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }

  // Mantenha aqui o return com a tabela.
}
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'


const API_URL = `${import.meta.env.VITE_API_BASE}/customers`


// Inputs controlados recebem strings, inclusive os campos opcionais.
const formDefaults = {
 name: '',
 ident_document: '',
 birth_date: '',
 street_name: '',
 house_number: '',
 complements: '',
 district: '',
 municipality: '',
 state: '',
 phone: '',
 email: '',
}


// Lista de Unidades da Federação para construir uma lista de escolha
const states = [
 { value: 'AC', label: 'Acre' },
 { value: 'AL', label: 'Alagoas' },
 { value: 'AP', label: 'Amapá' },
 { value: 'AM', label: 'Amazonas' },
 { value: 'BA', label: 'Bahia' },
 { value: 'CE', label: 'Ceará' },
 { value: 'DF', label: 'Distrito Federal' },
 { value: 'ES', label: 'Espírito Santo' },
 { value: 'GO', label: 'Goiás' },
 { value: 'MA', label: 'Maranhão' },
 { value: 'MT', label: 'Mato Grosso' },
 { value: 'MS', label: 'Mato Grosso do Sul' },
 { value: 'MG', label: 'Minas Gerais' },
 { value: 'PA', label: 'Pará' },
 { value: 'PB', label: 'Paraíba' },
 { value: 'PR', label: 'Paraná' },
 { value: 'PE', label: 'Pernambuco' },
 { value: 'PI', label: 'Piauí' },
 { value: 'RJ', label: 'Rio de Janeiro' },
 { value: 'RN', label: 'Rio Grande do Norte' },
 { value: 'RS', label: 'Rio Grande do Sul' },
 { value: 'RO', label: 'Rondônia' },
 { value: 'RR', label: 'Roraima' },
 { value: 'SC', label: 'Santa Catarina' },
 { value: 'SP', label: 'São Paulo' },
 { value: 'SE', label: 'Sergipe' },
 { value: 'TO', label: 'Tocantins' },
]


// Função para interpretar e dar mensagens de erro mais
// inteligíveis aos erros de fetch()
async function getErrorMessage(response) {
 const error = await response.json().catch(() => null)
 return error?.message || `A requisição falhou (HTTP ${response.status}).`
}


export function CustomersForm() {
 const { id } = useParams()
 const navigate = useNavigate()
 const isNew = id === 'new'


 const [customer, setCustomer] = useState({ ...formDefaults })
 const [loading, setLoading] = useState(true)
 const [loadFailed, setLoadFailed] = useState(false)
 const [formModified, setFormModified] = useState(false)


 // Quando o formulário estiver sendo usado para alterar os dados de
 // um usuário já existente, loadData() será chamado para buscar esses
 // dados no back-end para que os campos já apareçam preenchidos
 async function loadData(active) {
   setLoading(true)
   setLoadFailed(false)
   setFormModified(false)
   setCustomer({ ...formDefaults })


   try {
     // Se entrou no loadData() por engano quando era para cadastrar
     // um novo cliente, sai da função sem fazer nada
     if (isNew) return


     const response = await fetch(`${API_URL}/${id}`)


     if (!response.ok) {
       throw new Error(await getErrorMessage(response))
     }


     const result = await response.json()


     if (active) {
       // Copia dos dados buscados apenas os campos que fazem parte do formulário.
       setCustomer({
         name: result.name ?? '',
         ident_document: result.ident_document ?? '',
         birth_date: result.birth_date?.slice(0, 10) ?? '',
         street_name: result.street_name ?? '',
         house_number: result.house_number ?? '',
         complements: result.complements ?? '',
         district: result.district ?? '',
         municipality: result.municipality ?? '',
         state: result.state ?? '',
         phone: result.phone ?? '',
         email: result.email ?? '',
       })
     }
   }
   catch (error) {
     if (active) {
       setLoadFailed(true)
       window.alert(`Não foi possível carregar o cliente. ${error.message}`)
     }
   }
   finally {
     if (active) setLoading(false)
   }
 }


 // Este useEffect() será executado sempre que o parâmetro da rota mudar.
 // Uma mundança de rota causa alterações nas variáveis `id` e `isNew`,
 // que são justamente aquelas monitoradas no VETOR DE DEPENDÊNCIAS.
 useEffect(() => {
   // Evita atualizar o formulário enquanto uma requisição anterior
   // ainda estiver sendo processada
   let active = true


   loadData(active)


   return () => {
     active = false
   }
 }, [id, isNew]) // <~ VETOR DE DEPENDÊNCIAS


 // Toda vez que o valor de um campo for alterado, esta função será chamada
 // para preencher o campo correspondente da variável de estado `customer`
 function handleFieldChange(event) {
   const { name, value } = event.target


   setCustomer(previous => ({ ...previous, [name]: value }))
   setFormModified(true)
 }


 async function handleFormSubmit(event) {
   event.preventDefault()


   if (loading || loadFailed) return


   setLoading(true)


   try {


     // Aqui, ajustamos o formato do conteúdo de alguns campos para gravação
     // no banco de dados
     const payload = {
       ...customer,
       // Prisma DateTime: data ISO, preservando o dia informado.
       birth_date: customer.birth_date
         ? `${customer.birth_date}T00:00:00.000Z`
         : null,
       complements: customer.complements || null
     }


     // Determinamos o método HTTP com o qual a requisição será enviada
     // ao back-end:
     // Novo cliente (criação) ~> POST
     // Cliente existente (atualização) ~> PUT
     const method = isNew ? 'POST' : 'PUT'


     // A URI invocada também muda de acordo com a situação:
     // Novo cliente: http://localhost:8888/customers
     // Cliente existente: http://localhost:8888/customers/X, onde X é o id do cliente
     const uri = isNew ? API_URL : `${API_URL}/${id}`


     // Fazendo a requisição ao back-end
     const response = await fetch(uri, {
       method,
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(payload)
     })


     if (!response.ok) {
       throw new Error(await getErrorMessage(response))
     }


     // Não depende de um corpo JSON na resposta de sucesso.
     setFormModified(false)
     window.alert('Cliente salvo com sucesso.')
     navigate('/customers') // Retorna à página do formulário
   }
   catch (error) {
     window.alert(`Não foi possível salvar o cliente. ${error.message}`)
   }
   finally {
     setLoading(false)
   }
 }


 function handleBackButtonClick() {
   if (formModified && !window.confirm(
     'Há informações não salvas. Deseja realmente sair?'
   )) {
     return
   }


   navigate('/customers')
 }


 return (
   <section className="container py-4">
     <h1 className="mb-4">
       {isNew ? 'Cadastrar novo cliente' : `Editar cliente ${id}`}
     </h1>


     {loading && (
       <p role="status">Aguarde, processando...</p>
     )}


     {loadFailed && (
       <div className="alert alert-danger" role="alert">
         Não foi possível carregar os dados. Volte à listagem e tente novamente.
       </div>
     )}


     <form onSubmit={handleFormSubmit}>
       <fieldset disabled={loading || loadFailed}>
         <legend className="visually-hidden">Dados do cliente</legend>


         <div className="row g-3">
           <div className="col-12 col-md-12">
             <label htmlFor="name" className="form-label">
               Nome completo
             </label>
             <input
               id="name"
               name="name"
               type="text"
               className="form-control"
               required
               autoFocus
               value={customer.name}
               onChange={handleFieldChange}
             />
           </div>


           <div className="col-12 col-md-6">
             <label htmlFor="ident_document" className="form-label">
               CPF
             </label>
             <input
               id="ident_document"
               name="ident_document"
               type="text"
               className="form-control"
               required
               value={customer.ident_document}
               onChange={handleFieldChange}
             />
           </div>


           <div className="col-12 col-md-6">
             <label htmlFor="birth_date" className="form-label">
               Data de nascimento
             </label>
             <input
               id="birth_date"
               name="birth_date"
               type="date"
               className="form-control"
               value={customer.birth_date}
               onChange={handleFieldChange}
             />
           </div>


           <div className="col-12 col-md-9">
             <label htmlFor="street_name" className="form-label">
               Logradouro
             </label>
             <input
               id="street_name"
               name="street_name"
               type="text"
               className="form-control"
               required
               value={customer.street_name}
               onChange={handleFieldChange}
             />
           </div>


           <div className="col-12 col-md-3">
             <label htmlFor="house_number" className="form-label">
               Número
             </label>
             <input
               id="house_number"
               name="house_number"
               type="text"
               className="form-control"
               required
               value={customer.house_number}
               onChange={handleFieldChange}
             />
           </div>


           <div className="col-12 col-md-6">
             <label htmlFor="complements" className="form-label">
               Complemento
             </label>
             <input
               id="complements"
               name="complements"
               type="text"
               className="form-control"
               value={customer.complements}
               onChange={handleFieldChange}
             />
           </div>


           <div className="col-12 col-md-6">
             <label htmlFor="district" className="form-label">
               Bairro
             </label>
             <input
               id="district"
               name="district"
               type="text"
               className="form-control"
               required
               value={customer.district}
               onChange={handleFieldChange}
             />
           </div>


           <div className="col-12 col-md-8">
             <label htmlFor="municipality" className="form-label">
               Município
             </label>
             <input
               id="municipality"
               name="municipality"
               type="text"
               className="form-control"
               required
               value={customer.municipality}
               onChange={handleFieldChange}
             />
           </div>


           <div className="col-12 col-md-4">
             <label htmlFor="state" className="form-label">
               UF
             </label>
             <select
               id="state"
               name="state"
               className="form-select"
               required
               value={customer.state}
               onChange={handleFieldChange}
             >
               <option value="">Selecione...</option>
               {states.map(state => (
                 <option key={state.value} value={state.value}>
                   {state.label}
                 </option>
               ))}
             </select>
           </div>


           <div className="col-12 col-md-6">
             <label htmlFor="phone" className="form-label">
               Telefone/celular
             </label>
             <input
               id="phone"
               name="phone"
               type="tel"
               className="form-control"
               required
               value={customer.phone}
               onChange={handleFieldChange}
             />
           </div>


           <div className="col-12 col-md-6">
             <label htmlFor="email" className="form-label">
               E-mail
             </label>
             <input
               id="email"
               name="email"
               type="email"
               className="form-control"
               required
               value={customer.email}
               onChange={handleFieldChange}
             />
           </div>


         </div>


         <button type="submit" className="btn btn-primary mt-4">
           Salvar
         </button>
       </fieldset>


       <button
         type="button"
         className="btn btn-outline-secondary mt-3"
         disabled={loading}
         onClick={handleBackButtonClick}
       >
         Voltar
       </button>
     </form>
   </section>
 )
}

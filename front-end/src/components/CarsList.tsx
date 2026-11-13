import { useState, useEffect } from 'react'
import type { Car } from '../types/Car'
import { Link } from 'react-router'


// Formata a data de venda (ISO) no padrão brasileiro (dd/mm/aaaa).
// Usamos apenas os 10 primeiros caracteres para evitar que o fuso
// horário desloque a data em um dia.
function formatDate(date: string | null) {
 if (!date) return ''
 const [year, month, day] = date.slice(0, 10).split('-')
 return `${day}/${month}/${year}`
}


// Formata o preço de venda como moeda brasileira (R$)
function formatPrice(price: string | number | null) {
 if (price === null || price === '') return ''
 return Number(price).toLocaleString('pt-BR', {
   style: 'currency',
   currency: 'BRL'
 })
}


export function CarsList() {

 const [cars, setCars] = useState<Car[]>([])

 // Busca a lista de veículos no back-end, da mesma forma
 // que é feito na listagem de clientes
 async function fetchData() {
   const apiHost = import.meta.env.VITE_API_BASE

   try {
     const response = await fetch(`${apiHost}/cars`)

     if (!response.ok) {
       throw new Error(`Erro HTTP ${response.status}`)
     }

     const data: Car[] = await response.json()

     setCars(data)
   }
   catch (error) {
     if (error instanceof Error) {
       window.alert('ERRO: ' + error.message)
     }
   }
 }

 // Vetor de dependências vazio: executa apenas uma vez,
 // quando o componente é carregado na tela
 useEffect(() => {
   fetchData()
 }, [])


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
             <th scope="col">Importado</th>
             <th scope="col">Placas</th>
             <th scope="col">Data da venda</th>
             <th scope="col">Preço de venda</th>
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
               <td>{car.imported ? 'Sim' : 'Não'}</td>
               <td>{car.plates}</td>
               <td>{formatDate(car.selling_date)}</td>
               <td>{formatPrice(car.selling_price)}</td>
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
               <td colSpan={10} className="text-center text-secondary">
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

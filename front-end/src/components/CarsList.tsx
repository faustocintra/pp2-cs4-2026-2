import { useState, useEffect  } from 'react'
import type { Cars } from '../types/Cars'
import { formatMoney } from '../utils/money'
import { Link } from 'react-router'



export function CarsList() {
 const [cars, setCars] = useState<Cars[]>([])

 async function fetchData() {
   const apiHost = import.meta.env.VITE_API_BASE


   try {

     const response = await fetch(`${apiHost}/cars`)


     if (!response.ok) {
       throw new Error(`Erro HTTP ${response.status}`)
     }


     const data: Cars[] = await response.json()


     setCars(data)


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
         Novo Veículo
       </Link>
     </div>



     <div className="table-responsive">
       <table className="table table-striped table-hover align-middle">
         <thead className="table-dark">
           <tr>
             <th scope="col">Código</th>
             <th scope="col">Modelo</th>
             <th scope="col">Cor</th>
             <th scope="col">Marca</th>
             <th scope="col">Placa</th>
             <th scope="col">Ano de fabricação</th>
             <th scope="col">Importado</th>
             <th scope="col">Data de venda</th>
             <th scope="col">Preço de venda</th>
             <th scope="col">Cliente comprador</th>
             <th scope="col" className="text-end">Ações</th>
           </tr>
         </thead>


         <tbody>
           {cars.map(cars => (
             <tr key={cars.id}>
               <td>{cars.id}</td>
               <td>{cars.model}</td>
               <td>{cars.color}</td>
               <td>{cars.brand}</td>
               <td>{cars.plates}</td>
               <td>{cars.year_manufacture}</td>
               <td>{cars.imported ? "Sim" : "Não"} </td>
               <td>{cars.selling_date ? cars.selling_date : "Não vendido"}</td>
               <td>{cars.selling_price ? formatMoney(cars.selling_price) : "Não vendido"}</td>
               <td>{cars.customer_id ? "A" : "Não vendido"}</td>
               <td className="text-end">
                 <Link
                   to={`/cars/${cars.id}`}
                   className="btn btn-outline-primary"
                   aria-label={`Editar veículo ${cars.brand}`}
                 >
                   Editar
                 </Link>
               </td>

             </tr>
           ))}


           {cars.length === 0 && (
             <tr>
               <td colSpan={8} className="text-center text-secondary">
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

